// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { productLineConfig, ProductLineKey } from '../config/productLines';
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Node } from 'unist';

interface MdxJsxAttribute {
  name: string;
  value: string | string[];
}

interface MdxJsxFlowElement extends Node {
  type: 'mdxJsxFlowElement';
  name: string;
  attributes?: MdxJsxAttribute[];
  children?: Node[];
}

interface PluginOptions {
  productLine: ProductLineKey;
}

/**
 * Remark plugin that substitutes product names and conditional content at build time.
 * 
 * This plugin:
 * 1. Replaces <ProductName product="identities" /> with the actual product name
 * 2. Shows/hides <ProductLineContent> blocks based on product line and features
 */
const productLinePlugin: Plugin<[PluginOptions]> = (options) => {
  const { productLine } = options;
  const config = productLineConfig[productLine];

  if (!config) {
    throw new Error(`Unknown product line: ${productLine}`);
  }

  return (tree) => {
    visit(tree, (node: Node) => {
      const mdxNode = node as MdxJsxFlowElement;

      // Replace <ProductName product="identities" /> with actual name
      if (mdxNode.type === 'mdxJsxFlowElement' && mdxNode.name === 'ProductName') {
        const productAttr = mdxNode.attributes?.find(attr => attr.name === 'product');
        if (productAttr) {
          const productKey = productAttr.value as keyof typeof config.products;
          const productName = config.products[productKey];
          
          if (!productName) {
            console.warn(`Unknown product key: ${productKey} in product line: ${productLine}`);
            return;
          }
          
          // Replace component with plain text
          (node as any).type = 'text';
          (node as any).value = productName;
          delete (mdxNode as any).name;
          delete (mdxNode as any).attributes;
          delete (mdxNode as any).children;
        }
      }

      // Handle <ProductLineContent lines={['network']} features={['console']}> conditional blocks
      if (mdxNode.type === 'mdxJsxFlowElement' && mdxNode.name === 'ProductLineContent') {
        const linesAttr = mdxNode.attributes?.find(attr => attr.name === 'lines');
        const featuresAttr = mdxNode.attributes?.find(attr => attr.name === 'features');
        
        let shouldShow = true;

        // Check if this content should show for this product line
        if (linesAttr && linesAttr.value) {
          const allowedLines = Array.isArray(linesAttr.value) 
            ? linesAttr.value 
            : [linesAttr.value];
          shouldShow = allowedLines.includes(productLine);
        }

        // Check if this content should show based on features
        if (shouldShow && featuresAttr && featuresAttr.value) {
          const requiredFeatures = Array.isArray(featuresAttr.value)
            ? featuresAttr.value
            : [featuresAttr.value];
          const hasFeature = requiredFeatures.some(f => config.features.includes(f));
          shouldShow = shouldShow && hasFeature;
        }

        if (shouldShow) {
          // Keep the children but remove the wrapper
          if (mdxNode.children) {
            (node as any).type = 'paragraph';
            delete (mdxNode as any).name;
            delete (mdxNode as any).attributes;
          }
        } else {
          // Remove this entire block from the output
          (node as any).type = 'text';
          (node as any).value = '';
          delete (mdxNode as any).name;
          delete (mdxNode as any).attributes;
          delete (mdxNode as any).children;
        }
      }
    });
  };
};

export default productLinePlugin;

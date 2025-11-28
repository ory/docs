// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import Layout from "@theme/Layout"
import { ProductSelectorStepper } from "./_assets/product-selector-stepper"

function ProductSelectorPage() {
  return (
    <Layout
      title="Product Selector"
      description="Find the right Ory products for your use case by answering a few simple questions."
    >
      <div className="container margin-vert--lg">
        <ProductSelectorStepper />
      </div>
    </Layout>
  )
}

export default ProductSelectorPage


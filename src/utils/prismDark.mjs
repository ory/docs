/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { themes } from "prism-react-renderer"

export default {
  plain: {
    color: "#D4D4D4",
    backgroundColor: "#212121",
  },
  styles: [
    ...themes.vsDark.styles,
    {
      types: ["title"],
      style: {
        color: "#569CD6",
        fontWeight: "bold",
      },
    },
    {
      types: ["property", "parameter"],
      style: {
        color: "#9CDCFE",
      },
    },
    {
      types: ["script"],
      style: {
        color: "#D4D4D4",
      },
    },
    {
      types: ["boolean", "arrow", "atrule", "tag"],
      style: {
        color: "#569CD6",
      },
    },
    {
      types: ["number", "color", "unit"],
      style: {
        color: "#B5CEA8",
      },
    },
    {
      types: ["font-matter"],
      style: {
        color: "#CE9178",
      },
    },
    {
      types: ["keyword", "rule"],
      style: {
        color: "#C586C0",
      },
    },
    {
      types: ["regex"],
      style: {
        color: "#D16969",
      },
    },
    {
      types: ["maybe-class-name"],
      style: {
        color: "#4EC9B0",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "#4FC1FF",
      },
    },
    {
      languages: ["keto-tuples", "keto-natural"],
      types: ["namespace"],
      style: {
        color: "#47B098",
        fontWeight: "bold",
      },
    },
    {
      languages: ["keto-tuples", "keto-natural"],
      types: ["id", "placeholder-subject", "placeholder-object"],
      style: {
        color: "#DDA0DD",
      },
    },
    {
      languages: ["keto-tuples", "keto-natural"],
      types: ["permit", "placeholder-relation"],
      style: {
        color: "#ee8800",
      },
    },
    {
      languages: ["keto-tuples", "keto-natural"],
      types: ["keyword"],
      style: {
        color: "#858585",
      },
    },
    {
      languages: ["keto-tuples", "keto-natural"],
      types: ["subjectRelation"],
      style: {
        color: "#ee8800",
      },
    },
    {
      languages: ["keto-tuples", "keto-natural"],
      types: ["delimiter"],
      style: {
        color: "#888888",
      },
    },
  ],
}

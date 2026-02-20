// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

/**
 * Prism language for Keto relation tuples
 *
 * Format: Object#permit@Subject
 *
 * Examples:
 * - Document:X#owner@User:Bob
 * - Group:group1#members@Group:group2
 * - Document:Xyz#viewers@Group:Eng#members
 */

export default (prism) => {
  // Reusable regex fragments
  const namespace = "[A-Za-z][a-zA-Z0-9_-]*"
  const id = "[^@#:\\n]+"
  const relation = "(?:#[a-z][a-zA-Z0-9_-]*)"

  // Shared inside: Namespace:Id
  const nsDelimId = {
    namespace: new RegExp(`${namespace}(?=:)`),
    delimiter: /:/,
    id: new RegExp(id),
  }

  // Shared inside: subject with relation (Namespace:Id#relation)
  const subjectRelInside = {
    ...nsDelimId,
    id: /[^@#:\n]+(?=#)/,
    keyword: /#/,
    subjectRelation: /[a-z][a-zA-Z0-9_-]*$/,
  }

  prism.languages["keto-tuples"] = {
    comment: /\/\/.*(\n|$)/,
    // Tuple: Ns:Id#permit, optionally followed by @Ns:Id(#relation)?
    tuple: {
      pattern: new RegExp(
        `(?<![@a-zA-Z0-9_-])${namespace}:${id}#[a-z][a-zA-Z0-9_-]*(?:@${namespace}:${id}${relation}?)?`,
      ),
      inside: {
        object: {
          pattern: new RegExp(`^${namespace}:${id}`),
          inside: nsDelimId,
        },
        "subject-with-relation": {
          pattern: new RegExp(`${namespace}:${id}#[a-z][a-zA-Z0-9_-]*$`),
          alias: "subject",
          inside: subjectRelInside,
        },
        "subject-simple": {
          pattern: new RegExp(`${namespace}:${id}$`),
          alias: "subject",
          inside: nsDelimId,
        },
        permit: /[a-z][a-zA-Z0-9_-]+(?=@|$)/,
        keyword: /[#@]/,
      },
    },
    // Standalone subject with relation: @Namespace:Id#relation
    "subject-standalone-with-relation": {
      pattern: new RegExp(`@${namespace}:${id}${relation}`),
      alias: "subject",
      inside: {
        ...subjectRelInside,
        keyword: /[@#]/,
      },
    },
    // Standalone subject simple: @Namespace:Id
    "subject-standalone-simple": {
      pattern: new RegExp(`@${namespace}:${id}`),
      alias: "subject",
      inside: {
        keyword: /@/,
        ...nsDelimId,
      },
    },
    // Standalone object: Namespace:Id
    "object-standalone": {
      pattern: new RegExp(`${namespace}:${id}`),
      alias: "object",
      inside: nsDelimId,
    },
  }
}

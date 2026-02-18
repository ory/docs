// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

/**
 * Prism language for English-ish relationship sentences
 *
 * Declarative sentences:
 * - User:Bob is owner of Document:X
 * - Group:group2 is in members of Group:group1
 * - members of Group:Eng are viewers of Document:Xyz
 * - viewers of Group:Eng are in readers of Document:Xyz
 * - User:Bob is allowed to read Document:X
 * - members of Group:Eng is allowed to read Document:X
 *
 * Question sentences:
 * - is User:Bob allowed to view on Document:X
 * - is User:Alice in viewers of Document:X
 * - are members of Group:XYZ allowed to view on Document:X
 */

export default (prism) => {
  prism.languages["keto-natural"] = {
    comment: /\/\/.*(\n|$)/,
    // Placeholder-based declarative sentences (match first, more specific)
    "natural-placeholder": {
      pattern:
        /(?=.*<(?:Subject|relation|Object)>)(?:(?:[a-z][a-zA-Z0-9_-]* (?:of|in) )?[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+|<Subject>) (?:is|are)(?: in)? (?:[a-z][a-zA-Z0-9_-]*|<relation>) (?:of|on) (?:[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+|<Object>)/,
      alias: "natural",
      inside: {
        // Placeholder <Subject>
        "placeholder-subject": {
          pattern: /<Subject>/,
          alias: "subject",
        },
        // Placeholder <Object>
        "placeholder-object": {
          pattern: /<Object>/,
          alias: "object",
        },
        // Placeholder <relation>
        "placeholder-relation": {
          pattern: /<relation>/,
        },
        // Subject: can be "relation of Namespace:Id" or "relation in Namespace:Id" or just "Namespace:Id"  (at start)
        subject: {
          pattern:
            /^(?:[a-z][a-zA-Z0-9_-]* (?:of|in) )?[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+/,
          inside: {
            subjectRelation: /^[a-z][a-zA-Z0-9_-]*(?= (?:of|in))/,
            keyword: /\b(?:of|in)\b/,
            namespace: /[A-Za-z][a-zA-Z0-9_-]*(?=:)/,
            delimiter: /:/,
            id: /[^@#:\s]+$/,
          },
        },
        // Object: always "Namespace:Id" (at end) - match before permit
        object: {
          pattern: /[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+$/,
          inside: {
            namespace: /^[A-Za-z][a-zA-Z0-9_-]*/,
            delimiter: /:/,
            id: /[^@#:\s]+$/,
          },
        },
        // Regular relation word (not placeholder)
        subjectRelation: /[a-z][a-zA-Z0-9_-]*(?= (?:of|on))/,
        // Keywords - match last
        keyword: /\b(?:is|are|in|of|on)\b/,
      },
    },
    // Declarative relationship sentences
    natural: {
      pattern:
        /(?:[a-z][a-zA-Z0-9_-]* (?:of|in) )?[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+ (?:(?:is|are)(?: in)? [a-z][a-zA-Z0-9_-]* (?:of|on)|(?:is|are) allowed to [a-z][a-zA-Z0-9_-]*) [A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+/,
      inside: {
        // Subject: can be "relation of Namespace:Id" or "relation in Namespace:Id" or just "Namespace:Id"  (at start)
        subject: {
          pattern:
            /^(?:[a-z][a-zA-Z0-9_-]* (?:of|in) )?[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+/,
          inside: {
            subjectRelation: /^[a-z][a-zA-Z0-9_-]*(?= (?:of|in))/,
            keyword: /\b(?:of|in)\b/,
            namespace: /[A-Za-z][a-zA-Z0-9_-]*(?=:)/,
            delimiter: /:/,
            id: /[^@#:\s]+$/,
          },
        },
        // Object: always "Namespace:Id" (at end)
        object: {
          pattern: /[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+$/,
          inside: {
            namespace: /^[A-Za-z][a-zA-Z0-9_-]*/,
            delimiter: /:/,
            id: /[^@#:\s]+$/,
          },
        },
        // Keywords - match before permit so permit only matches the remaining word
        keyword: /\b(?:is|are|allowed to|in|of|on)\b/,
        // Permit (the action/role) - matches any remaining lowercase word
        permit: /[a-z][a-zA-Z0-9_-]*/,
      },
    },
    // Permission question sentences
    "natural-check": {
      pattern:
        /(?:is|are) (?:[a-z][a-zA-Z0-9_-]* (?:of|in) )?[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+ (?:allowed to|in) [a-z][a-zA-Z0-9_-]* (?:of|on) [A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+/,
      inside: {
        // Subject (comes after is/are)
        subject: {
          pattern:
            /(?<=(?:is|are) )(?:[a-z][a-zA-Z0-9_-]* (?:of|in) )?[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+/,
          inside: {
            subjectRelation: /^[a-z][a-zA-Z0-9_-]*(?= (?:of|in))/,
            keyword: /\b(?:of|in)\b/,
            namespace: /[A-Za-z][a-zA-Z0-9_-]*(?=:)/,
            delimiter: /:/,
            id: /[^@#:\s]+$/,
          },
        },
        // Object (at end) - match before permit
        object: {
          pattern: /[A-Za-z][a-zA-Z0-9_-]*:[^@#:\s]+$/,
          inside: {
            namespace: /^[A-Za-z][a-zA-Z0-9_-]*/,
            delimiter: /:/,
            id: /[^@#:\s]+$/,
          },
        },
        // Permit - match before keywords
        permit: /[a-z][a-zA-Z0-9_-]*(?= (?:of|on))/,
        // Keywords (including the starting is/are) - match last
        keyword: /\b(?:is|are|allowed to|in|of|on)\b/,
      },
    },
  }
}

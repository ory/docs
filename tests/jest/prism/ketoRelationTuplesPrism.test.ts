// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import Prism from "prismjs"
import type { Token } from "prismjs"
import ketoRelationTuplesPrism from "../../../src/theme/ketoRelationTuplesPrism"

describe("ketoRelationTuplesPrism", () => {
  beforeAll(() => {
    ketoRelationTuplesPrism(Prism)
  })

  const testCases = [
    {
      name: "simple: Document:X#owner@User:Bob",
      input: "Document:X#owner@User:Bob",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "Document" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "X" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "owner" },
            { type: "keyword", content: "@" },
            {
              type: "subject",
              content: [
                { type: "namespace", content: "User" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "Bob" },
              ],
            },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "simple lowercase: document:x#owner@user:bob",
      input: "document:x#owner@user:bob",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "document" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "x" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "owner" },
            { type: "keyword", content: "@" },
            {
              type: "subject",
              content: [
                { type: "namespace", content: "user" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "bob" },
              ],
            },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "simple: Group:group1#members@Group:group2",
      input: "Group:group1#members@Group:group2",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "Group" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "group1" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "members" },
            { type: "keyword", content: "@" },
            {
              type: "subject",
              content: [
                { type: "namespace", content: "Group" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "group2" },
              ],
            },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "subject with relation: Document:Xyz#viewers@Group:Eng#members",
      input: "Document:Xyz#viewers@Group:Eng#members",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "Document" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "Xyz" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "viewers" },
            { type: "keyword", content: "@" },
            {
              type: "subject",
              content: [
                { type: "namespace", content: "Group" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "Eng" },
                { type: "keyword", content: "#" },
                { type: "subjectRelation", content: "members" },
              ],
            },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "subject with relation: Document:Xyz#readers@Group:Eng#viewers",
      input: "Document:Xyz#readers@Group:Eng#viewers",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "Document" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "Xyz" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "readers" },
            { type: "keyword", content: "@" },
            {
              type: "subject",
              content: [
                { type: "namespace", content: "Group" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "Eng" },
                { type: "keyword", content: "#" },
                { type: "subjectRelation", content: "viewers" },
              ],
            },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "with special characters: File:doc-1_v2#read@User:alice_123",
      input: "File:doc-1_v2#read@User:alice_123",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "File" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "doc-1_v2" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "read" },
            { type: "keyword", content: "@" },
            {
              type: "subject",
              content: [
                { type: "namespace", content: "User" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "alice_123" },
              ],
            },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "partial: Document:X#owner (no subject)",
      input: "Document:X#owner",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "Document" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "X" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "owner" },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "partial: Group:group1#members (no subject)",
      input: "Group:group1#members",
      expected: [
        {
          type: "tuple",
          content: [
            {
              type: "object",
              content: [
                { type: "namespace", content: "Group" },
                { type: "delimiter", content: ":" },
                { type: "id", content: "group1" },
              ],
            },
            { type: "keyword", content: "#" },
            { type: "permit", content: "members" },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "standalone object: Document:X",
      input: "Document:X",
      expected: [
        {
          type: "object",
          content: [
            { type: "namespace", content: "Document" },
            { type: "delimiter", content: ":" },
            { type: "id", content: "X" },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "standalone subject: @User:Bob",
      input: "@User:Bob",
      expected: [
        {
          type: "subject",
          content: [
            { type: "keyword", content: "@" },
            { type: "namespace", content: "User" },
            { type: "delimiter", content: ":" },
            { type: "id", content: "Bob" },
          ],
        },
      ] as Array<string | Token>,
    },
    {
      name: "standalone subject with relation: @Group:Eng#members",
      input: "@Group:Eng#members",
      expected: [
        {
          type: "subject",
          content: [
            { type: "keyword", content: "@" },
            { type: "namespace", content: "Group" },
            { type: "delimiter", content: ":" },
            { type: "id", content: "Eng" },
            { type: "keyword", content: "#" },
            { type: "subjectRelation", content: "members" },
          ],
        },
      ] as Array<string | Token>,
    },
  ]

  // Helper to extract only type and content from tokens
  function simplifyToken(token: string | Token): any {
    if (typeof token === "string") {
      return token
    }
    // Use alias if available, otherwise use type
    const type = token.alias || token.type
    return {
      type,
      content: Array.isArray(token.content)
        ? token.content.map(simplifyToken)
        : token.content,
    }
  }

  describe.each(testCases)("tuple: $name", ({ input, expected }) => {
    it(`should tokenize: "${input}"`, () => {
      const tokens = Prism.tokenize(input, Prism.languages["keto-tuples"])
      const simplified = tokens.map(simplifyToken)
      expect(simplified).toEqual(expected)
    })
  })
})

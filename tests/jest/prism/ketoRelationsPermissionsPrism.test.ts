// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import Prism from "prismjs"
import ketoRelationsPermissionsPrism from "../../../src/theme/ketoRelationsPermissionsPrism"

describe("ketoRelationsPermissionsPrism", () => {
  beforeAll(() => {
    ketoRelationsPermissionsPrism(Prism)
  })

  const declarativeTestCases = [
    {
      name: "lowercase simple: user:bob is owner of document:x",
      input: "user:bob is owner of document:x",
    },
    {
      name: "simple: User:Bob is owner of Document:X",
      input: "User:Bob is owner of Document:X",
    },
    {
      name: "simple with 'on': User:Bob is owner on Document:X",
      input: "User:Bob is owner on Document:X",
    },
    {
      name: "with 'is in': Group:group2 is in members of Group:group1",
      input: "Group:group2 is in members of Group:group1",
    },
    {
      name: "relation as subject: members of Group:Eng are viewers of Document:Xyz",
      input: "members of Group:Eng are viewers of Document:Xyz",
    },
    {
      name: "relation as subject with 'are in': viewers of Group:Eng are in readers of Document:Xyz",
      input: "viewers of Group:Eng are in readers of Document:Xyz",
    },
    {
      name: "relation as subject with 'in': members in Group:Eng are viewers of Document:Xyz",
      input: "members in Group:Eng are viewers of Document:Xyz",
    },
    {
      name: "allowed to simple: User:Bob is allowed to read Document:X",
      input: "User:Bob is allowed to read Document:X",
    },
    {
      name: "allowed to with subject relation: members of Group:Eng is allowed to read Document:X",
      input: "members of Group:Eng is allowed to read Document:X",
    },
  ]

  const questionTestCases = [
    {
      name: "simple question: is User:Bob allowed to view on Document:X",
      input: "is User:Bob allowed to view on Document:X",
    },
    {
      name: "question with 'in': is User:Alice in viewers of Document:X",
      input: "is User:Alice in viewers of Document:X",
    },
    {
      name: "question with relation subject: are members of Group:XYZ allowed to view on Document:X",
      input: "are members of Group:XYZ allowed to view on Document:X",
    },
  ]

  describe.each(declarativeTestCases)("declarative: $name", ({ input }) => {
    it(`should tokenize: "${input}"`, () => {
      const tokens = Prism.tokenize(input, Prism.languages["keto-natural"])
      expect(tokens).toMatchSnapshot()
    })
  })

  describe.each(questionTestCases)("question: $name", ({ input }) => {
    it(`should tokenize: "${input}"`, () => {
      const tokens = Prism.tokenize(input, Prism.languages["keto-natural"])
      expect(tokens).toMatchSnapshot()
    })
  })
})

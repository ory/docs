// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { ProductKey } from "../types/solutionDesignTypes"

export interface StepQuestion {
  id: string
  question: string
  options: { value: "yes" | "no"; label: string; addProducts?: ProductKey[] }[]
}

export const SOLUTION_DESIGN_STEPS: StepQuestion[] = [
  {
    id: "identity",
    question:
      "Do you need to support user sign-up, login, account recovery, and profile management?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["kratos"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "ui",
    question:
      "Do you want a prebuilt or customizable login and account UI, instead of building the UI entirely yourself?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["elements"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "oauth",
    question:
      "Do you need users to sign in once and use multiple applications, or let third-party apps access your APIs on the user's behalf?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["hydra"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "sso",
    question:
      "Do you need Enterprise Single Sign-On (SSO), so business customers can sign in with IdPs like Okta, Azure AD, or Google Workspace?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["polis"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "scim",
    question:
      "Do you need automated user and group provisioning from enterprise directories (SCIM directory sync)?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["polis"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "permissions",
    question:
      "Do you need fine-grained permissions inside your application? For example, 'can this user edit this document?'",
    options: [
      { value: "yes", label: "Yes", addProducts: ["keto"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "gateway",
    question:
      "Do you want a centralized gateway that enforces authentication and authorization before requests reach your APIs?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["oathkeeper"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
]

export const SOLUTION_DESIGN_PRODUCT_LABELS: Record<
  ProductKey,
  { label: string; description: string; to: string }
> = {
  kratos: {
    label: "Ory Kratos",
    description: "Identity management and authentication",
    to: "/network/kratos/intro",
  },
  hydra: {
    label: "Ory Hydra",
    description: "SSO & delegated, scope-based authorization (OAuth2/OIDC)",
    to: "/network/hydra",
  },
  polis: {
    label: "Ory Polis",
    description: "Enterprise SSO & SCIM",
    to: "/network/polis",
  },
  keto: {
    label: "Ory Keto",
    description: "Fine-grained permissions",
    to: "/network/keto",
  },
  oathkeeper: {
    label: "Ory Oathkeeper",
    description: "Proxy-based enforcement gateway",
    to: "/network/oathkeeper",
  },
  elements: {
    label: "Ory Elements",
    description: "Pre-built, customizable UI components for self-service flows",
    to: "/elements",
  },
}

export const SOLUTION_DESIGN_RESULTS_ORDER: ProductKey[] = [
  "kratos",
  "hydra",
  "polis",
  "keto",
  "oathkeeper",
  "elements",
]

export const SOLUTION_DESIGN_STORAGE_KEY = "ory.solutionDesignStepper"

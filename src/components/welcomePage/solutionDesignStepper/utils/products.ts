// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { ProductKey } from "../types/solutionDesignTypes"
import type { StepQuestion } from "../consts"

export function computeSelectedProductsFromAnswers(
  answers: Record<string, "yes" | "no">,
  steps: StepQuestion[],
): ProductKey[] {
  const set = new Set<ProductKey>()
  steps.forEach((step) => {
    if (answers[step.id] !== "yes") return
    const option = step.options.find((o) => o.value === "yes")
    option?.addProducts?.forEach((p) => set.add(p))
  })
  return Array.from(set)
}

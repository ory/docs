// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import {
  SOLUTION_DESIGN_STORAGE_KEY,
  SOLUTION_DESIGN_STEPS,
} from "../consts"

export function loadSolutionDesignProgressFromSessionStorage(): {
  currentStep: number
  answers: Record<string, "yes" | "no">
} | null {
  try {
    const raw =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(SOLUTION_DESIGN_STORAGE_KEY)
        : null
    if (!raw) return null
    const parsed = JSON.parse(raw) as {
      currentStep?: unknown
      answers?: unknown
    }

    const stepIds = new Set(SOLUTION_DESIGN_STEPS.map((s) => s.id))
    const nextAnswers: Record<string, "yes" | "no"> = {}
    if (parsed.answers && typeof parsed.answers === "object") {
      for (const [k, v] of Object.entries(
        parsed.answers as Record<string, unknown>,
      )) {
        if (!stepIds.has(k)) continue
        if (v === "yes" || v === "no") nextAnswers[k] = v
      }
    }

    const stepNum =
      typeof parsed.currentStep === "number" &&
      Number.isFinite(parsed.currentStep)
        ? parsed.currentStep
        : 0

    const clampedStep = Math.max(
      0,
      Math.min(SOLUTION_DESIGN_STEPS.length, stepNum),
    )
    return { currentStep: clampedStep, answers: nextAnswers }
  } catch {
    return null
  }
}

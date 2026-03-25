// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useMemo, useState } from "react"
import Link from "@docusaurus/Link"
import { StepBadge } from "./StepBadge"
import OryArchitectureDiagram from "../OryArchitectureDiagram"
import {
  SOLUTION_DESIGN_PRODUCT_LABELS,
  SOLUTION_DESIGN_RESULTS_ORDER,
  SOLUTION_DESIGN_STORAGE_KEY,
  SOLUTION_DESIGN_STEPS,
} from "./solutionDesignStepper/consts"
import { computeSelectedProductsFromAnswers } from "./solutionDesignStepper/utils/products"
import { loadSolutionDesignProgressFromSessionStorage } from "./solutionDesignStepper/utils/storage"

const STEPS = SOLUTION_DESIGN_STEPS
const PRODUCT_LABELS = SOLUTION_DESIGN_PRODUCT_LABELS
const RESULTS_ORDER = SOLUTION_DESIGN_RESULTS_ORDER
const STORAGE_KEY = SOLUTION_DESIGN_STORAGE_KEY
const RESULT_DOT_COLORS: Record<string, string> = {
  kratos: "var(--icon-kratos-tertiary)",
  hydra: "var(--icon-hydra-tertiary)",
  keto: "var(--icon-keto-tertiary)",
  oathkeeper: "var(--icon-oathkeeper-tertiary)",
  polis: "var(--icon-polis-tertiary)",
  elements: "#8b5cf6",
}

export function SolutionDesignStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, "yes" | "no">>({})

  useEffect(() => {
    const progress = loadSolutionDesignProgressFromSessionStorage()
    if (progress) {
      setAnswers(progress.answers)
      setCurrentStep(progress.currentStep)
    }
  }, [])

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ currentStep, answers }),
      )
    } catch {
      /* sessionStorage unavailable */
    }
  }, [currentStep, answers])

  const selectedProducts = useMemo(
    () => computeSelectedProductsFromAnswers(answers, STEPS),
    [answers],
  )

  const isResults = currentStep === STEPS.length
  const questionIndex = currentStep
  const currentQuestion =
    questionIndex >= 0 && questionIndex < STEPS.length
      ? STEPS[questionIndex]
      : null

  const isOnFirstQuestion = currentStep === 0
  const stepsAnsweredCount = STEPS.filter(
    (s) => answers[s.id] !== undefined,
  ).length
  const showIntroDiagram = stepsAnsweredCount === 0

  const handleAnswer = (stepId: string, value: "yes" | "no") => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* sessionStorage unavailable */
    }
  }

  const handleBack = () => {
    if (isResults) {
      handleReset()
      return
    }
    if (currentStep > 0) {
      const stepIdToClear = STEPS[currentStep].id
      setAnswers((prev) => {
        const next = { ...prev }
        delete next[stepIdToClear]
        return next
      })
      setCurrentStep(currentStep - 1)
    }
  }

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined
  const canProceed = isResults || currentAnswer !== undefined

  return (
    <div>
      <div className="flex flex-col gap-ory-4 mb-ory-8 relative">
        <StepBadge step={2} />
        <h3 className="ory-heading-3 max-w-[800px]">Pick your Ory products</h3>
        <p className="ory-body max-w-[800px]">
          Answer a few questions about your IAM requirements, and we'll
          recommend the right products for your solution.
        </p>
      </div>

      <div className="bg-ory-bg-primary border border-ory-border-primary flex flex-col overflow-hidden rounded-ory">
        <div className="p-ory-4 relative bg-ory-bg-primary">
          <div
            className="relative w-full overflow-hidden rounded-ory bg-ory-bg-secondary flex items-center justify-center"
            style={{ aspectRatio: "1008 / 400" }}
          >
            {showIntroDiagram ? (
              <div className="w-full h-full flex items-center justify-center bg-ory-bg-secondary border border-dashed border-ory-border-primary rounded-ory p-ory-8">
                <p className="ory-body-sm text-ory-text-tertiary m-0 text-center">
                  Select an option below to see your solution diagram.
                </p>
              </div>
            ) : (
              <OryArchitectureDiagram
                selectedProducts={selectedProducts}
                scimSelected={answers.scim === "yes"}
                currentStep={currentStep}
                identityAnswer={answers.identity}
              />
            )}
          </div>
        </div>

        <div className="border-t border-ory-border-primary p-ory-6 flex flex-col gap-ory-6 min-h-[192px]">
          {currentQuestion && !isResults && (
            <>
              <div className="flex justify-center">
                <span className="ory-body-sm text-ory-text-tertiary whitespace-nowrap leading-none">
                  Step {currentStep + 1} of {STEPS.length}
                </span>
              </div>
              <div className="flex justify-between gap-ory-6 w-full flex-wrap">
                <div className="flex-[1_1_280px] min-w-0">
                  <p className="ory-body-sm font-medium text-ory-text-primary pb-ory-3 m-0">
                    {currentQuestion.question}
                  </p>
                </div>
                <div className="flex-[1_1_200px] min-w-0">
                  <div className="flex flex-col gap-ory-3">
                    {currentQuestion.options.map((option) => {
                      const selected = currentAnswer === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleAnswer(currentQuestion.id, option.value)
                          }
                          className={`w-full flex items-center text-left bg-ory-bg-primary border rounded-ory-btn py-ory-2 px-ory-4 ory-body-sm cursor-pointer text-ory-text-primary ${selected ? "border-ory-border-brand-tertiary" : "border-ory-border-primary"}`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {isResults && (
            <div className="flex flex-col gap-ory-6">
              <p className="ory-body font-medium text-ory-text-primary m-0">
                Based on your answers, here's the Ory stack that matches your
                IAM requirements:
              </p>
              {selectedProducts.length > 0 ? (
                <ul className="m-0 pl-ory-6 flex flex-col gap-ory-2 list-disc">
                  {RESULTS_ORDER.filter((k) =>
                    selectedProducts.includes(k),
                  ).map((key) => {
                    const p = PRODUCT_LABELS[key]
                    return (
                      <li
                        key={key}
                        className="ory-body text-ory-text-secondary flex items-center gap-2"
                      >
                        <span
                          aria-hidden
                          className="inline-block rounded-full"
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: RESULT_DOT_COLORS[key],
                          }}
                        />
                        <Link
                          to={p.to}
                          className="text-ory-text-primary font-medium no-underline"
                        >
                          {p.label}
                        </Link>
                        {" — "}
                        {p.description}
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="ory-body text-ory-text-secondary m-0">
                  Based on your answers, you may not need additional Ory
                  products for your current use case. You can still explore our{" "}
                  <Link to="/getting-started/overview">quickstarts</Link> or{" "}
                  <a
                    href="https://www.ory.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ory-brand-primary underline"
                  >
                    contact sales
                  </a>{" "}
                  for guidance.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="bg-ory-bg-secondary border-t border-ory-border-primary p-ory-4 flex justify-between items-center flex-wrap gap-ory-3">
          <span className="ory-body-sm text-ory-text-tertiary leading-none">
            {currentQuestion && !isResults && "Select an option to continue"}
            {isResults && "Start over to try different answers"}
          </span>
          <div className="flex gap-ory-2">
            {!isOnFirstQuestion && (
              <button
                type="button"
                onClick={handleBack}
                className="ory-btn-secondary"
              >
                {isResults ? "Start over" : "Back"}
              </button>
            )}
            {!isResults && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className="ory-btn-primary disabled:bg-ory-bg-tertiary disabled:cursor-not-allowed"
              >
                {currentStep === STEPS.length - 1 ? "See results" : "Continue"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

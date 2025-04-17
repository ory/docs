import React from "react"

type Step = {
  title: string
  description: string
}

type ImplementationStepsProps = {
  steps: Step[]
}

/**
 * A component for displaying consistent numbered implementation steps
 */
export const ImplementationSteps: React.FC<ImplementationStepsProps> = ({
  steps,
}) => {
  return (
    <div className="implementation-steps">
      <ol>
        {steps.map((step, index) => (
          <li key={index} className="implementation-step">
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ImplementationSteps

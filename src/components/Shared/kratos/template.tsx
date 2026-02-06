// src/components/shared/AuthOverview.tsx
import React from "react"

type Product = "network" | "oel" | "oss"

interface IntroKratosProps {
  product: Product
}

export function IntroKratos({ product }: IntroKratosProps) {
  const productLabel =
    product === "network"
      ? "Ory Network"
      : product === "oel"
        ? "Ory Enterprise License"
        : "Ory Open Source"

  return (
    <>
      <h2>Authentication overview</h2>
      <p>
        This section explains how authentication works in{" "}
        <strong>{productLabel}</strong>.
      </p>

      {product === "network" && (
        <p>
          Because you're using Ory Network, authentication flows are fully
          managed and hosted for you.
        </p>
      )}

      {product === "oel" && (
        <p>
          In Ory Enterprise License, you run the control plane yourself but get
          enterprise support and features.
        </p>
      )}

      {product === "oss" && (
        <p>
          With Ory Open Source, you assemble and operate the components on your
          own infrastructure.
        </p>
      )}
    </>
  )
}

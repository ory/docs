import React from "react"
import Layout from "@theme/Layout"

export default function Welcome() {
  return (
    <Layout
      title="Welcome to Ory Docs"
      description="Landing page for Ory documentation"
    >
      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>How to use this help center</h1>

        <p>
          Not sure where to start? Use our guided paths—structured journeys that walk you through the Ory products 
          and solutions and get you learning and building faster.

        </p>

        <ul>
          <li>
            <a href="/docs/network/getting-started/overview">
              Ory Network – Getting Started
            </a>
          </li>

        </ul>
      </main>
    </Layout>
  )
}
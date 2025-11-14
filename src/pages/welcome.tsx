import React from "react"
import Layout from "@theme/Layout"

export default function Welcome() {
  return (
    <Layout
      title="Welcome to Ory Docs"
      description="Landing page for Ory documentation"
    >
      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Welcome to Ory Docs</h1>

        <p>
          This is your new documentation landing page.  
          Use the navigation bar to explore sections, or add quick links here.
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
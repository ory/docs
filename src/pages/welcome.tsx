// src/pages/welcome.tsx

import React from "react"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

function Hero() {
  return (
    <section className="hero hero--primary" style={{ padding: "4rem 0 3rem" }}>
      <div className="container">
        <div className="row">
          {/* Left: text */}
          <div className="col col--7">
            <h1 className="hero__title">Build secure identity into your apps</h1>
            <p className="hero__subtitle" style={{ maxWidth: 520 }}>
              Ory gives you authentication, authorization, and user management APIs
              designed for modern applications. Start fast, scale to millions, and
              keep security best practices baked in.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
              <Link
                className="button button--secondary button--lg"
                to="/network/getting-started"
              >
                Get started with Ory Network
              </Link>
              <Link
                className="button button--outline button--lg"
                to="/getting-started/overview"
              >
                Explore all getting-started guides
              </Link>
            </div>

            <p style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.85 }}>
              Prefer to self-host?{" "}
              <Link to="/oel/getting-started">Start with Ory Enterprise License</Link>{" "}
              or <Link to="/oss/getting-started">open source</Link>.
            </p>
          </div>

          {/* Right: quick code example */}
          <div className="col col--5">
            <div
              style={{
                background: "var(--ifm-background-surface-color)",
                borderRadius: "0.75rem",
                boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                padding: "1.25rem 1.25rem 1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  opacity: 0.7,
                  marginBottom: "0.5rem",
                }}
              >
                Example: sign in a user
              </p>

              <Tabs groupId="language" defaultValue="curl">
                <TabItem value="curl" label="cURL">
                  <CodeBlock language="bash">
                    {`curl -X POST "$ORY_SDK_URL/self-service/login/flows" \\
  -H "Content-Type: application/json" \\
  -d '{
    "identifier": "user@example.com",
    "password": "super-secret"
  }'`}
                  </CodeBlock>
                </TabItem>

                <TabItem value="js" label="JavaScript">
                  <CodeBlock language="ts">
                    {`import { FrontendApi, Configuration } from "@ory/client"

const ory = new FrontendApi(
  new Configuration({ basePath: process.env.ORY_SDK_URL })
)

const { data: flow } = await ory.createBrowserLoginFlow()
`}
                  </CodeBlock>
                </TabItem>

                <TabItem value="react" label="React + Elements">
                  <CodeBlock language="tsx">
                    {`import { LoginForm } from "@ory/elements-react"

export function Login() {
  return <LoginForm projectSlug={process.env.NEXT_PUBLIC_ORY_PROJECT_SLUG!} />
}`}
                  </CodeBlock>
                </TabItem>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductQuickstarts() {
  const cards = [
    {
      label: "Ory Network",
      description:
        "Managed identity, OAuth2/OIDC, and permissions. Best choice for new projects.",
      to: "/network/getting-started",
      meta: "Cloud · multi-region · production-ready",
    },
    {
      label: "Ory Enterprise License",
      description:
        "Self-host Ory with enterprise support, SLAs, and advanced compliance options.",
      to: "/oel/getting-started",
      meta: "Self-hosted · enterprise",
    },
    {
      label: "Ory Open Source",
      description:
        "Use the individual Ory projects directly and run everything yourself.",
      to: "/oss/getting-started",
      meta: "Open source · fully self-managed",
    },
  ]

  return (
    <section style={{ padding: "2.5rem 0 1.5rem" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <h2>Start by product</h2>
            <p style={{ maxWidth: 540 }}>
              Choose the deployment model that fits your organization. You can switch
              later — the core concepts stay the same.
            </p>
          </div>
        </div>

        <div className="row">
          {cards.map(card => (
            <div className="col col--4" key={card.label}>
              <div className="card" style={{ height: "100%" }}>
                <div className="card__header">
                  <h3>{card.label}</h3>
                </div>
                <div className="card__body">
                  <p>{card.description}</p>
                  <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>{card.meta}</p>
                </div>
                <div className="card__footer">
                  <Link className="button button--secondary button--sm" to={card.to}>
                    View quickstart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LanguageQuickstarts() {
  const langs = [
    {
      value: "javascript",
      label: "JavaScript / TypeScript",
      docs: "/getting-started/integrate-auth/react",
      snippet: `npm install @ory/client`,
    },
    {
      value: "nextjs",
      label: "Next.js",
      docs: "/getting-started/integrate-auth/nextjs-app-router-quickstart",
      snippet: `npx create-next-app my-app`,
    },
    {
      value: "vue",
      label: "Vue",
      docs: "/getting-started/integrate-auth/vue",
      snippet: `npm create vue@latest`,
    },
    {
      value: "go",
      label: "Go",
      docs: "/getting-started/integrate-auth/go",
      snippet: `go get github.com/ory/client-go`,
    },
  ]

  return (
    <section style={{ padding: "2.5rem 0 1.5rem" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <h2>Start by framework or language</h2>
            <p style={{ maxWidth: 560 }}>
              Drop Ory into an existing app. Pick your stack and follow the
              step-by-step integration guides.
            </p>
          </div>
        </div>

        <Tabs groupId="language-quickstarts" defaultValue="javascript">
          {langs.map(lang => (
            <TabItem key={lang.value} value={lang.value} label={lang.label}>
              <div className="row">
                <div className="col col--6">
                  <CodeBlock language="bash">{lang.snippet}</CodeBlock>
                </div>
                <div className="col col--6">
                  <div style={{ paddingTop: "0.25rem" }}>
                    <p>
                      Follow the full guide for{" "}
                      <Link to={lang.docs}>{lang.label}</Link>.
                    </p>
                    <ul style={{ fontSize: "0.9rem" }}>
                      <li>Set up Ory SDK and environment variables</li>
                      <li>Protect routes with login and sessions</li>
                      <li>Handle logout, recovery, and verification flows</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabItem>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function PopularGuides() {
  const guides = [
    {
      label: "Overview: Ory Network",
      to: "/getting-started/overview",
      description: "Understand the core building blocks and architecture.",
    },
    {
      label: "Implement sign-in and sign-up",
      to: "/kratos/self-service/flows/user-login-user-registration",
      description: "Design user login, registration, and account activation flows.",
    },
    {
      label: "Add social sign-in",
      to: "/kratos/social-signin/overview",
      description:
        "Let users sign in with Google, GitHub and more via OAuth2/OIDC providers.",
    },
    {
      label: "Protect APIs with OAuth2",
      to: "/oauth2-oidc/authorization-code-flow",
      description: "Secure backend services using OAuth2 and OpenID Connect.",
    },
    {
      label: "Model permissions with Ory Keto",
      to: "/keto/modeling/create-permission-model",
      description: "Design relationship-based access control for complex systems.",
    },
    {
      label: "Migrate from an existing IdP",
      to: "/migrate-to-ory/migrate/index",
      description: "Strategies and checklists for moving from legacy identity systems.",
    },
  ]

  return (
    <section style={{ padding: "2.5rem 0 1.5rem", background: "var(--ifm-background-surface-color)" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <h2>Popular guides</h2>
            <p style={{ maxWidth: 560 }}>
              Opinionated, end-to-end walkthroughs to help you ship real features,
              not just hello-world demos.
            </p>
          </div>
        </div>

        <div className="row">
          {guides.map(guide => (
            <div className="col col--4" key={guide.label}>
              <div className="card" style={{ height: "100%" }}>
                <div className="card__header">
                  <h3 style={{ fontSize: "1rem" }}>
                    <Link to={guide.to}>{guide.label}</Link>
                  </h3>
                </div>
                <div className="card__body">
                  <p style={{ fontSize: "0.9rem" }}>{guide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ToolsAndEcosystem() {
  const items = [
    {
      label: "REST API reference",
      to: "/reference/api",
      description: "Complete OpenAPI reference for all Ory Network endpoints.",
    },
    {
      label: "Ory CLI",
      to: "/cli/ory",
      description: "Manage projects, identities, permissions and more from the terminal.",
    },
    {
      label: "Ory Elements",
      to: "/elements/index",
      description: "Pre-built UI components for login, registration, and account flows.",
    },
    {
      label: "Open source projects",
      to: "/ecosystem/projects",
      description: "Explore and contribute to the individual Ory services.",
    },
    {
      label: "Changelog",
      to: "/ecosystem/changelog",
      description: "See what shipped recently across Ory products.",
    },
    {
      label: "Status & SLA",
      to: "https://status.ory.com/",
      description: "Monitor uptime and incident history for Ory services.",
    },
  ]

  return (
    <section style={{ padding: "2.5rem 0 3rem" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <h2>Tools & ecosystem</h2>
            <p style={{ maxWidth: 560 }}>
              Everything around the core APIs: observability, tooling, open source
              projects, and community support.
            </p>
          </div>
        </div>

        <div className="row">
          {items.map(item => (
            <div className="col col--4" key={item.label}>
              <div className="card" style={{ height: "100%" }}>
                <div className="card__header">
                  <h3 style={{ fontSize: "1rem" }}>
                    {item.to.startsWith("http") ? (
                      <a href={item.to}>{item.label}</a>
                    ) : (
                      <Link to={item.to}>{item.label}</Link>
                    )}
                  </h3>
                </div>
                <div className="card__body">
                  <p style={{ fontSize: "0.9rem" }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WelcomePage() {
  return (
    <Layout title="Ory Documentation" description="Developer documentation for Ory">
      <Hero />
      <ProductQuickstarts />
      <LanguageQuickstarts />
      <PopularGuides />
      <ToolsAndEcosystem />
    </Layout>
  )
}

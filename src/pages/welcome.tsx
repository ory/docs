// src/pages/welcome.tsx

import React from "react"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import OryHeroDemo from "@site/src/components/OryHeroDemo"
import heroBg from "@site/src/static/img/background_image2.png"

function StartHeading() {
  const guides = [
    {
      to: "/products",
    },
    {
      to: "/quickstarts",
    },
    {
      to: "/reference",
    },
  ]

  return (
    <section style={{ padding: "2.5rem 0 1.5rem", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>How to use the Ory help center</h1>
          <p style={{ maxWidth: 800, margin: "0 auto" }}>Ory gives you authentication, authorization, and user management APIs
              designed for modern applications. Start fast, scale to millions, and
              keep security best practices baked in.</p>
          <div style={{ 
            height: "1px", 
            margin: "1rem 0" 
            }} />
          <p style={{ maxWidth: 800, margin: "0 auto" }}>
            <strong>Not sure where to start?</strong> Follow our guided paths—structured journeys that walk you through Ory's products and solutions so you can learn and build faster.
          </p>
        </div>

        <div className="row">
          {guides.map((guide, index) => (
            <div className="col col--4" key={index}>
              <div className="card" style={{ height: "100%" }}>
                {index === 0 && (
                  <div className="card__header">
                    <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                      <strong>Want to learn more about a specific product suite or solution?</strong> Go directly to product and solution specific information.
                    </p>
                  </div>
                )}
                {index === 1 && (
                  <div className="card__header">
                    <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                      <strong>Want to start coding and need an example?</strong> Take a look in the Quickstarts to find the framework and language you want to use.
                    </p>
                  </div>
                )}
                {index === 2 && (
                  <div className="card__header">
                    <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                      <strong>Want to find the right API to use?</strong> Go directly to the REST API, SDKs, or CLI references.
                    </p>
                  </div>
                )}
                {index === 0 && (
                  <div className="card__footer">
                    <Link to="/products">Click on <strong>Products</strong> or <strong>Solutions</strong></Link>
                  </div>
                )}
                {index === 1 && (
                  <div className="card__footer">
                    <Link to="/quickstarts">Click on <strong>Quickstarts</strong></Link>
                  </div>
                )}
                {index === 2 && (
                  <div className="card__footer">
                    <Link to="/reference">Click on <strong>Reference</strong></Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Hero() {
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
    <section 
      className="hero" 
      style={{ 
        padding: "1rem 0 1.5rem", 
        backgroundImage: "url('/img/hero-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        {/* Heading above both columns */}
        <h2 className="hero__title" style={{ marginBottom: "1.5rem", fontSize: "1.5rem"}}>
          Choose a deployment model 
        </h2>
        
        <div className="row" style={{ alignItems: "flex-start" }}>
          {/* Left: text and cards */}
          <div className="col col--5">
            <p className="hero__subtitle" style={{ maxWidth: 520, marginTop: 0, fontSize: "1rem" }}>
              Choose the deployment model that fits your organization and build secure IAM into your apps. You can switch later — the core concepts stay the same.
            </p>

            {/* Product cards */}
            <div style={{ marginTop: "1.5rem" }}>
              {cards.map(card => (
                <div className="card" style={{ marginBottom: "1rem" }} key={card.label}>
                  <div className="card__header">
                    <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{card.label}</h3>
                  </div>
                  <div className="card__body" style={{ paddingTop: 0 }}>
                    <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>{card.description}</p>
                    <p style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.5rem" }}>{card.meta}</p>
                    <Link className="button button--secondary button--sm" to={card.to}>
                      View quickstart
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: interactive demo */}
          <div className="col col--7">
            <OryHeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductQuickstarts() {
  const cards = [
    {
      label: "Ory Kratos/Indentities",
      description:
        "Description TBD",
      to: "/network/getting-started",
    },
    {
      label: "Ory Hyra/OAuth2 & OIDC",
      description:
        "Description TBD",
      to: "/oel/getting-started",
    },
    {
      label: "Ory Keto/Permissions",
      description:
        "Description TBD",
      to: "/oss/getting-started",
    },
  ]

  return (
    <section style={{ padding: "2.5rem 0 1.5rem" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem"}}>Start by product</h2>
            <p style={{ maxWidth: 540 }}>
              Choose the Ory product(s) that fits your needs.
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
                    Get started
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
      <StartHeading/>
      <Hero />
      <ProductQuickstarts />
      <LanguageQuickstarts />
      <PopularGuides />
      <ToolsAndEcosystem />
    </Layout>
  )
}

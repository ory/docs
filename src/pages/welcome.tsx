// src/pages/welcome.tsx

import React from "react"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import OryHeroDemo from "@site/src/components/OryHeroDemo"
import heroBg from "@site/src/static/img/background_image2.png"
import { ProductSelectorStepper } from "./_assets/product-selector-stepper"

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
    <section style={{ padding: "2.5rem 0 0", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Welcome to the Ory developer center</h1>
        </div>

        {/* Intro text and demo in two columns */}
        <div className="row" style={{ alignItems: "flex-start", marginBottom: ".5rem" }}>
          <div className="col col--5" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: "1.25rem", marginTop: "3rem", textAlign: "center"}}>
              Ory gives you authentication, authorization, and user management APIs
              designed for modern applications. </p>
            <p style={{ fontSize: "1.25rem", marginTop: 0, textAlign: "center"}}>Start fast, scale to millions, and
              keep security best practices baked in.
            </p>
          </div>
          <div className="col col--7">
            <OryHeroDemo />
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ maxWidth: 800, margin: "0 auto" }}>
            How to use the Ory developer center
          </h2>
        </div>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
                    <p>Click on 
                    <Link to="/products/products-overview"><strong> Products</strong></Link> or <Link to="/solutions/solutions-overview"><strong> Solutions</strong></Link></p>
                  </div>
                )}
                {index === 1 && (
                  <div className="card__footer"><p>Click on  
                    <Link to="/getting-started/overview"><strong> Quickstarts</strong></Link>
                  </p></div>
                )}
                {index === 2 && (
                  <div className="card__footer"><p>Click on  
                    <Link to="/reference/reference-overview"><strong> Reference</strong></Link>
                  </p></div>
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
        padding: "2.5rem 0 0", 
        backgroundImage: "url('/img/hero-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        {/* Heading row above cards */}
        <div className="row" style={{ marginTop: "2rem" }}>
          <div className="col col--12">
            <StepHeading step={1}>Choose a deployment option</StepHeading>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              Choose the deployment option that fits your organization and build secure IAM into your apps. You can switch later — the core concepts stay the same.
            </p>
          </div>
        </div>

        {/* Product cards - 3 columns */}
        <div className="row">
          {cards.map(card => (
            <div className="col col--4" key={card.label}>
              <div className="card" style={{ height: "100%" }}>
                <div className="card__header">
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{card.label}</h3>
                </div>
                <div className="card__body" style={{ paddingTop: 0 }}>
                  <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>{card.description}</p>
                  <p style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.5rem" }}>{card.meta}</p>
                  <Link className="button button--secondary button--sm" to={card.to}>
                    Learn more
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

function ProductQuickstarts() {
  return (
    <section style={{ padding: "2.5rem 0 0", background: "#f8f9fa" }}>
      <div className="container" >
        <StepHeading2 step={2}>Design your Ory solution</StepHeading2>
        <ProductSelectorStepper />
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
    <section style={{ padding: "2.5rem 0 0" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <StepHeading step={3}>Select your framework or language</StepHeading>
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

function OtherGuides() {
  const guides = [
    {
      label: "Install from green-field",
      to: "/getting-started/overview",
      description: "Replace your home-grown IAM system.",
    },
    {
      label: "Migrate to Ory",
      to: "/kratos/self-service/flows/user-login-user-registration",
      description: "Plan your migration to Ory from an existing system.",
    },
    {
      label: "Ory architecture",
      to: "/kratos/self-service/flows/user-login-user-registration",
      description: "Understand the core building blocks and architecture.",
    },
  ]

  return (
    <section style={{ padding: "2.5rem 0 0", background: "#f8f9fa" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <h2>Other guides</h2>
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

function ComponentsTools() {
  const items = [
    {
      label: "Ory Console",
      to: "/cli/ory",
      description: "User interface to manage projects, configurations, and more.",
    },
    {
      label: "Ory Account Experience",
      to: "/reference/api",
      description: "User interface for all self-service screens like login, registration, or consent.",
    },
    {
      label: "Ory Elements",
      to: "/docs/elements",
      description: "Pre-built UI components for login, registration, and account flows.",
    },
    {
      label: "Ory Actions",
      to: "/docs/kratos/hooks/configure-hooks",
      description: "Define custom business logic, automating system behavior in response to events, and integrating with third-party services.",
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
    <section style={{ padding: "2.5rem 0 0" }}>
      <div className="container">
        <div className="row margin-bottom--sm">
          <div className="col col--8">
            <h2>Components & tools</h2>
            <p style={{ maxWidth: 560 }}>
              Everything around the core APIs: observability, tooling.
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

function SectionDivider() {
  return (
    <div style={{ 
      height: "1px", 
      background: "var(--ifm-color-emphasis-800)", 
      margin: "0 auto",
      width: "100%",
    }} />
  )
}

function StepHeading({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "var(--ifm-color-primary)",
        color: "white",
        fontSize: "1.1rem",
        fontWeight: "bold",
        marginRight: "0.75rem",
        flexShrink: 0,
      }}>{step}</span>
      {children}
    </h2>
  )
}

function StepHeading2({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "2px solid var(--ifm-color-primary)",
        color: "var(--ifm-color-primary)",
        fontSize: "1.1rem",
        fontWeight: "bold",
        marginRight: "0.75rem",
        flexShrink: 0,
      }}>{step}</span>
      {children}
    </h2>
  )
}

export default function WelcomePage() {
  return (
    <Layout title="Ory Documentation" description="Developer documentation for Ory">
      <StartHeading/>
      <Hero />
      <ProductQuickstarts />
      <LanguageQuickstarts />
      <OtherGuides />
      <ComponentsTools />
    </Layout>
  )
}

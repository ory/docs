import React from "react"
import Layout from "@theme/Layout"
import { StartHeading } from "@site/src/components/welcomePage/StartHeading"
import { HowToUseSection } from "@site/src/components/welcomePage/HowToUseSection"
import { DeploymentAndFrameworkSection } from "@site/src/components/welcomePage/DeploymentAndFrameworkSection"
import { OtherGuides } from "@site/src/components/welcomePage/OtherGuides"
import { ContentSection } from "@site/src/components/welcomePage/ContentSection"
import { NewsletterSection } from "@site/src/components/welcomePage/NewsletterSection"

export default function WelcomePage() {
  return (
    <Layout
      title="Ory Documentation"
      description="Developer documentation for Ory"
    >
      <StartHeading />
      <HowToUseSection />
      <DeploymentAndFrameworkSection />
      <OtherGuides />
      <ContentSection />
      <NewsletterSection />
    </Layout>
  )
}

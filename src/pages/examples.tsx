import React from "react"
import ExampleList from "../components/Examples/example-list"
import * as content from "./_assets/examples-content"
import Layout from "@theme/Layout"

const ExamplePage = () => {
  return (
    <Layout>
      <section className={"docs-doc-page"}>
        <ExampleList {...content.official} />
        <ExampleList {...content.community} />
        <ExampleList {...content.selfhosted} />
      </section>
    </Layout>
  )
}

export default ExamplePage

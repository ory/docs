import React from "react"
import CodeBlock from "@theme/CodeBlock"

type Product = "network" | "oel" | "oss"

interface E2EIntegrationTestsProps {
  product: Product
}

export function E2EIntegrationTests({ product }: E2EIntegrationTestsProps) {
  const productLabel =
    product === "network"
      ? "Ory Network"
      : product === "oel"
        ? "Ory Enterprise License"
        : "Ory Open Source"

  const commandPrefix = product === "network" ? "ory" : "kratos"

  return (
    <>
      <p>
        We run integration tests for both the{" "}
        <a href="https://github.com/ory/kratos-selfservice-ui-node">Node.js</a>{" "}
        and{" "}
        <a href="https://github.com/ory/kratos-selfservice-ui-react-native">
          React Native
        </a>{" "}
        reference implementation using{" "}
        <a href="https://www.cypress.io">Cypress</a>. You can find the set up
        and source code for these tests in{" "}
        <a href="https://github.com/ory/kratos/blob/master/test/e2e/run.sh">
          ./test/e2e/run.sh
        </a>
        . In principle, we start Ory Kratos with some configuration and an
        in-memory database in the background
      </p>

      <CodeBlock language="sh">
        {`DSN=memory ${commandPrefix} serve -c ./path/to/config/kratos.yml --dev > "kratos.e2e.log" 2>&1 &`}
      </CodeBlock>

      <p>
        as well as our application in the background as well. Then, we start the
        Cypress test runner which executes the different e2e tests. This works
        really well to test compliance and integration of Ory Kratos.
      </p>

      <p>
        If you run Ory Kratos and your app on separate domains or ports you
        might want to add
      </p>

      <CodeBlock language="json">
        {`{
  "chromeWebSecurity": false
}`}
      </CodeBlock>

      <p>
        to your <code>cypress.json</code> config file.
      </p>

      <h2>Testing React Native on web with Cypress</h2>

      <p>
        If you want to test React Native (rendered as a web application) in
        Cypress, you need to disable security features preventing browser from
        executing self-service API flows. To do this, set the environment
        variable <code>DEV_DISABLE_API_FLOW_ENFORCEMENT=1</code>:
      </p>

      <CodeBlock language="sh">
        {`DSN=memory \\
    DEV_DISABLE_API_FLOW_ENFORCEMENT=true
    hydra serve -c ./path/to/config/kratos.yml --dev  > "kratos.e2e.log" 2>&1 &)`}
      </CodeBlock>
    </>
  )
}

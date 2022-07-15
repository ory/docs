import React from "react"
import CodeBlock from "@theme/CodeBlock"
import { getSdkUrl } from "../../hooks"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

export default function SdkEnvVar(props: any) {
  const { hint, url } = getSdkUrl()

  return (
    <Tabs>
      <TabItem value="macos" label="macOS" default>
        <CodeBlock language="shell">{`${hint}export ORY_SDK_URL=${url}`}</CodeBlock>
      </TabItem>
      <TabItem value="linux" label="Linux">
        <CodeBlock language="shell">{`${hint}export ORY_SDK_URL=${url}`}</CodeBlock>
      </TabItem>
      <TabItem value="banana" label="Windows CMD">
        <CodeBlock language="shell">{`${hint}set ORY_SDK_URL=${url}`}</CodeBlock>
      </TabItem>
      <TabItem value="powershell" label="Windows Powershell">
        <CodeBlock language="powershell">{`${hint}$Env:ORY_SDK_URL = "${url}"`}</CodeBlock>
      </TabItem>
      <TabItem value="self-hosted" label="Self-Hosted Ory Kratos">
        <p>Clone and run Ory Kratos locally</p>
        <CodeBlock language="shell">{`git clone --depth 1 --branch master https://github.com/ory/kratos.git
cd kratos
git checkout master
git pull -ff
docker-compose -f quickstart.yml -f contrib/quickstart/kratos/cloud/quickstart.yml up --build --force-recreate -d`}</CodeBlock>
        <p>and set the environment variable to the exposed port:</p>
        <CodeBlock language="shell">{`export ORY_SDK_URL=http://localhost:4433`}</CodeBlock>
      </TabItem>
    </Tabs>
  )
}

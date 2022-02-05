import React from 'react'
import CodeBlock from '@theme/CodeBlock'
import {getSdkUrl} from '../../hooks'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function SdkEnvVar(props: any) {
  const url = getSdkUrl()
  const target = url ? url : 'https://playground.projects.oryapis.com'
  const hint = url ? '' : `# This is a public Ory Cloud Project.
# Don’t submit any personally identifiable information in requests made with this project.
# Sign up for Ory Cloud at
#
#   https://console.ory.sh/registration
#
# and create a free Ory Cloud Project to see your own configuration embedded in code samples!
`

  return (<Tabs>
    <TabItem value="macos" label="Mac OS" default>
      <CodeBlock language="shell">{`${hint}export ORY_SDK_URL=${target}`}</CodeBlock>
    </TabItem>
    <TabItem value="linux" label="Linux">
      <CodeBlock language="shell">{`${hint}export ORY_SDK_URL=${target}`}</CodeBlock>
    </TabItem>
    <TabItem value="banana" label="Windows CMD">
      <CodeBlock language="shell">{`${hint}set ORY_SDK_URL=${target}`}</CodeBlock>
    </TabItem>
    <TabItem value="powershell" label="Windows Powershell">
      <CodeBlock language="powershell">{`${hint}$Env:ORY_SDK_URL = "${target}"`}</CodeBlock>
    </TabItem>
    <TabItem value="self-hosted" label="Self-Hosted Ory Kratos">
      <CodeBlock language="powershell">{`export ORY_SDK_URL=http://localhost:4433`}</CodeBlock>
    </TabItem>
  </Tabs>
  )
}

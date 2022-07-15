import CodeBlock from '@theme/CodeBlock'
import React from 'react'

export default function SelfHostedKratos() {
  return (
    <>
      <p>
        Run Ory Kratos easily on your local machine or server with the Ory Cloud
        Hosted UI and default configuration in Docker:
      </p>
      <CodeBlock language="shell">
        {`git clone --depth 1 --branch master https://github.com/ory/kratos.git
cd kratos
git checkout master
git pull -ff
docker-compose -f quickstart.yml \\
  -f contrib/quickstart/kratos/cloud/quickstart.yml up`}
      </CodeBlock>
      <p>
        Ory Kratos will then be avaiable at <code>127.0.0.1:4433</code> (public
        port) and <code>127.0.0.1:4434</code> (admin port).
      </p>
    </>
  )
}

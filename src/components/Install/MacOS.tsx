import React from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function MacOS(props: { repo: string; name: string }) {
  const { repo, name } = props
  return (
    <>
      <p>
        Install {name} using <a href={'https://brew.sh'}>homebrew</a> on macOS:
      </p>
      <CodeBlock language="shell">{`brew install ory/tap/${repo}
${repo} help`}</CodeBlock>
    </>
  )
}

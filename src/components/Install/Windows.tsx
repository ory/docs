import React from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function Windows(props: { repo: string; name: string }) {
  const { repo, name } = props
  return (
    <>
      <p>
        Install {name} on Windows using <a href={'https://scoop.sh/'}>Scoop</a>:
      </p>
      <CodeBlock language="shell">{`scoop bucket add ory https://github.com/ory/scoop.git
scoop install ${repo}
${repo} help`}</CodeBlock>
    </>
  )
}

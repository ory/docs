import React from "react"
import CodeBlock from "@theme/CodeBlock"
import { useLatestRelease } from "../../hooks"

export default function Linux(props: { repo: string; name: string }) {
  const { repo, name } = props
  const version = useLatestRelease(repo)
  return (
    <>
      <p>
        Install {name} on Linux using <code>{`bash <(curl ...)`}</code>:
      </p>
      <CodeBlock language="shell">{`bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -d -b . ${repo} ${version}
./${repo} help`}</CodeBlock>
      <p>
        You may want to move {name} to your <code>$PATH</code>:
      </p>
      <CodeBlock language="shell">{`sudo mv ./${repo} /usr/local/bin/
${repo} help`}</CodeBlock>
    </>
  )
}

import { useLatestRelease } from "../../hooks"
import React from "react"
import CodeBlock from "@theme/CodeBlock"

export default function Docker(props: { repo: string; name: string }) {
  const { repo, name } = props
  const version = useLatestRelease(repo)
  return (
    <>
      <p>
        {name} is available as a Docker Image for all major platforms (ARM64,
        AMD64, ...):
      </p>
      <CodeBlock language="shell">{`docker pull oryd/${repo}:${version}
docker run --rm -it oryd/${repo}:${version} help`}</CodeBlock>
    </>
  )
}

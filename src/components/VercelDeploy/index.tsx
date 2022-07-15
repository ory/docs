import React from 'react'
import CodeBlock from '@theme/CodeBlock'
import { getSdkUrl } from '../../hooks'

export default function VercelDeploy() {
  const { hint, url } = getSdkUrl()
  return (
    <CodeBlock language="shell">{`${hint}npx vercel deploy --prod -e ORY_SDK_URL=${url}`}</CodeBlock>
  )
}

import Head from "@docusaurus/Head"
import useBaseUrl from "@docusaurus/useBaseUrl"

interface CanonicalUrlProps {
  path: string
}

export default function CanonicalUrl({ path }: CanonicalUrlProps) {
  const absoluteUrl = useBaseUrl(path, { absolute: true })
  const canonicalUrl = absoluteUrl.replace(/\/$/, "")

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
import React from "react"
import Heading from "@theme/Heading"

const contexts = {
  keto: require.context(
    "../../../docs/self-hosted/oel/keto/changelog",
    false,
    /\.md$/,
  ),
  kratos: require.context(
    "../../../docs/self-hosted/oel/kratos/changelog",
    false,
    /\.md$/,
  ),
  oathkeeper: require.context(
    "../../../docs/self-hosted/oel/oathkeeper/changelog",
    false,
    /\.md$/,
  ),
  oauth2: require.context(
    "../../../docs/self-hosted/oel/oauth2/changelog",
    false,
    /\.md$/,
  ),
  polis: require.context(
    "../../../docs/self-hosted/oel/polis/changelog",
    false,
    /\.md$/,
  ),
}

const rawContexts = {
  keto: require.context(
    "!!raw-loader!../../../docs/self-hosted/oel/keto/changelog",
    false,
    /\.md$/,
  ),
  kratos: require.context(
    "!!raw-loader!../../../docs/self-hosted/oel/kratos/changelog",
    false,
    /\.md$/,
  ),
  oathkeeper: require.context(
    "!!raw-loader!../../../docs/self-hosted/oel/oathkeeper/changelog",
    false,
    /\.md$/,
  ),
  oauth2: require.context(
    "!!raw-loader!../../../docs/self-hosted/oel/oauth2/changelog",
    false,
    /\.md$/,
  ),
  polis: require.context(
    "!!raw-loader!../../../docs/self-hosted/oel/polis/changelog",
    false,
    /\.md$/,
  ),
}

function baseFromPath(p) {
  // "./v1.3.2.md" -> "v1.3.2" ; "./CHANGELOG_2.0.md" -> "CHANGELOG_2.0"
  return p.replace("./", "").replace(/\.md$/, "")
}

function extractVersion(name) {
  // Find a version-like pattern (e.g., 1.2.3). If none, return the whole basename.
  const m = name.match(/\d+(?:\.\d+)*/)
  return m ? m[0] : name
}

function compareSemverDesc(a, b) {
  const va = extractVersion(baseFromPath(a))
  const vb = extractVersion(baseFromPath(b))

  const pa = va.split(".").map((n) => parseInt(n, 10) || 0)
  const pb = vb.split(".").map((n) => parseInt(n, 10) || 0)

  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const da = pa[i] ?? 0
    const db = pb[i] ?? 0
    if (da !== db) return db - da // descending
  }

  // Fallback to basename descending if versions equal or missing
  const ba = baseFromPath(a)
  const bb = baseFromPath(b)
  if (ba < bb) return 1
  if (ba > bb) return -1
  return 0
}

export default function ListChangelogs({ dir }) {
  const ctx = contexts[dir]
  const rawCtx = rawContexts[dir]
  if (!ctx) return <p>No changelogs for "{dir}"</p>

  const keys = ctx.keys().sort(compareSemverDesc)
  const Components = keys.map((k) => ctx(k).default)
  const raws = rawCtx
    ? keys.map((k) => {
        const mod = rawCtx(k)
        return typeof mod === "string" ? mod : mod.default
      })
    : keys.map(() => "")

  return (
    <>
      {Components.map((Comp, i) => {
        const basename = baseFromPath(keys[i])
        const version = extractVersion(basename)
        const raw = raws[i] || ""
        const isNoChanges = /no changelog entries found/i.test(raw.trim())
        return (
          <section key={keys[i]} style={{ marginBottom: "2rem" }}>
            {isNoChanges ? (
              <>
                <Heading as="h2">{version}</Heading>
                <p>This release contains bugfixes and minor improvements.</p>
              </>
            ) : (
              <Comp />
            )}
            <hr />
          </section>
        )
      })}
    </>
  )
}

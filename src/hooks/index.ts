// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import { Configuration, V0alpha2Api } from "@ory/client"
import { Octokit } from "@octokit/rest"
import useDocusaurusContext from "@docusaurus/core/lib/client/exports/useDocusaurusContext"

export function getSdkUrl() {
  const { siteConfig } = useDocusaurusContext()

  const sdk = new V0alpha2Api(
    new Configuration({
      basePath: String(siteConfig.customFields.CLOUD_URL),
      baseOptions: {
        withCredentials: true,
      },
    }),
  )
  const { data: projectSlug } = useQuery("getSdkUrl", () =>
    sdk
      .listProjects()
      .then(({ data: projects }) => {
        if (projects.length === 0) {
          return
        }

        // Fall back to the first project found
        return projects[0].slug
      })
      .catch(() => {
        return ""
      }),
  )

  const hint = projectSlug
    ? ""
    : `# This is a public Ory Network Project.
# Don’t submit any personally identifiable information in requests made with this project.
# Sign up to Ory Network at
#
#   https://console.ory.sh/registration
#
# and create a free Ory Network Project to see your own configuration embedded in code samples.
`
  return {
    hint,
    url: projectSlug
      ? "https://" + projectSlug + ".projects.oryapis.com"
      : "https://$PROJECT_SLUG.projects.oryapis.com",
  }
}

const octokit = new Octokit({})

/**
 * Returns the latest release for a repo.
 *
 * @param repo
 * @param fallback
 */
export function useLatestRelease(
  repo: string,
  fallback = "<version-you-want>",
) {
  const [release, setRelease] = useState<string>(fallback)

  useEffect(() => {
    octokit.repos
      .listReleases({
        owner: "ory",
        repo,
        per_page: 100,
      })
      .then(({ data }) => {
        const published = data.filter(
          ({ draft, tag_name }) => !draft && !tag_name.match(/pre.[0-9]+$/),
        )
        if (published.length > 0) {
          setRelease(published[0].tag_name)
        }
      })
  }, [repo])

  return release
}

/**
 * Returns the latest release filename tag
 *
 * @param repo
 * @param fallback
 */
export function useLatestReleaseFilename(
  repo: string,
  fallback = "<version-you-want>",
) {
  const releaseTag = useLatestRelease(repo)
  return releaseTag.replace("v", "")
}

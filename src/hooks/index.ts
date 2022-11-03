// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from "react"
import { Configuration, V0alpha2Api } from "@ory/client"
import { Octokit } from "@octokit/rest"
import useDocusaurusContext from "@docusaurus/core/lib/client/exports/useDocusaurusContext"
import { ProjectMetadata } from "@ory/client/api"

export function getSdkUrl() {
  const [project, setProject] = useState<ProjectMetadata | undefined>()
  const { siteConfig } = useDocusaurusContext()

  const sdk = new V0alpha2Api(
    new Configuration({
      basePath: String(siteConfig.customFields.CLOUD_URL),
      baseOptions: {
        withCredentials: true,
      },
    }),
  )

  useEffect(() => {
    sdk
      .listProjects()
      .then(({ data: projects }) => {
        // Fall back to the first project found
        setProject(projects[0])
      })
      .catch(() => {
        // do nothing
      })
  })

  const hint = project
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
    url: project
      ? "https://" + project.slug + ".projects.oryapis.com"
      : "https://{your-project-slug-here}.projects.oryapis.com",
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

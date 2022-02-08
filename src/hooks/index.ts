import { useEffect, useState } from 'react'
import { Configuration, Project, V0alpha0Api } from '@ory/client'

const sdk = new V0alpha0Api(new Configuration({
  basePath: 'https://api.console.ory:8080',
  baseOptions: {
    withCredentials: true
  }
}))

export function getSdkUrl() {
  const [project, setProject] = useState<Project | undefined>()

  useEffect(() => {
    sdk.getActiveProject().then(({ data }) => {
      const active = data.project_id

      return sdk.listProjects().then(({ data: projects }) => {
        const found = projects.find(p => p.id === active)
        if (!found && projects.length > 0) {
          setProject(projects[0])
          return
        }
        setProject(found)
      })
    }).catch(() => {
      // do nothing
    })
  })

  const hint = project ? '' : `# This is a public Ory Cloud Project.
# Don’t submit any personally identifiable information in requests made with this project.
# Sign up for Ory Cloud at
#
#   https://console.ory.sh/registration
#
# and create a free Ory Cloud Project to see your own configuration embedded in code samples!
`
  return {
    hint,
    url: project ? 'https://' + project.slug + '.projects.oryapis.com' : 'https://playground.projects.oryapis.com'
  }
}

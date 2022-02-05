import { useState, useEffect } from 'react';
import {Configuration, Project, V0alpha0Api} from "@ory/client";

const sdk = new V0alpha0Api(new Configuration({
  basePath: 'https://api.console.ory:8080',
  baseOptions: {
    withCredentials: false,
  }
}))

export function getSdkUrl(friendID) {
  const [project, setProject] = useState<Project | undefined>();

  useEffect(() => {
    sdk.listProjects().then(({data: projects}) => {
      if (projects.length > 0) {
        setProject(projects[0]);
      }
    }).catch(() => {
      // do nothing
    })
  });

  if (!project) {
    return
  }

  return 'https://' + project.slug + '.projects.oryapis.com';
}

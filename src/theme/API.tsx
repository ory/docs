import React, { useEffect, useState } from 'react'
import Redoc from '@theme/Redoc'
import './API.module.css'
import axios from 'axios'
import { useLatestRelease } from '../hooks'

function API({
  url,
  repo,
  override
}: {
  url: string
  repo: string
  override?: any
}) {
  const version = useLatestRelease(repo, 'master')
  const [spec, setSpec] = useState<any>(override)

  useEffect(() => {
    if (override) {
      return
    }

    axios.get(url.replace(/master/, version)).then((res) => {
      setSpec(res.data)
    })
  }, [url, repo, version])

  if (!spec) {
    return null
  }

  return <Redoc spec={spec} />
}

export default API

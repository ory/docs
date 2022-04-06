import React, { useEffect, useState } from 'react'
import Redoc from '@theme/Redoc'
import './API.module.css'
import axios from 'axios'
import { useLatestRelease } from '../hooks'
import useSSR from 'use-ssr'

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
  const { isServer } = useSSR()

  useEffect(() => {
    if (override || isServer) {
      return
    }

    axios.get(url.replace(/master/, version)).then((res) => {
      setSpec(res.data)
    })
  }, [url, repo, version])

  // For some reason this does not render server-side...
  if (!spec || isServer) {
    return <></>
  }

  console.log('redoc', { isServer })
  return <Redoc spec={spec} />
}

export default API

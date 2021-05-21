import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {ory, toFormikValues} from './helpers'
import {Session} from "@ory/client";
import {useRouter} from "next/router";
import {AxiosError} from "axios";

export default function Protected() {
  const router = useRouter()

  // A very simple function to fetch the current session.
  const [session, setSession] = useState<Session>()
  useEffect(() => {
    ory.toSession().then(({data}) => setSession(data)).catch((err: AxiosError) => {
      if (err.response.status === 401) {
        router.push('/login')
        return
      }
      return Promise.reject(err)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Protect Page / NextJS & Ory</title>
        <meta name="description" content="Ory integrated into NextJS"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome Back!
        </h1>

        <p className={styles.description}>
          Find your session information below.
        </p>

        <p className={styles.description}>
          <a href="#" onClick={() => {
            ory.initializeSelfServiceBrowserLogoutFlow().then(() => {
              router.push('/login')
            })
          }}>Log out</a>
        </p>

        <p>
          <pre>
            <code dangerouslySetInnerHTML={{__html: JSON.stringify(session, null, 2)}}/>
          </pre>
        </p>

      </main>
    </div>
  )
}

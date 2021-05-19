import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Configuration, DefaultApi} from "@ory/client";
import {useEffect, useState} from "react";

const ory = new DefaultApi(new Configuration({
  // We point the SDK to the Ory Proxy
  basePath: 'https://localhost:4000/.ory'
}))

export default function Protected() {

  // A very simple function to fetch the current session.
  const [session, setSession] = useState()
  useEffect(() => {
    ory.toSession().then(({data}) => setSession(data))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS + Ory</title>
        <meta name="description" content="Ory integrated into NextJS"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome Back!
        </h1>

        <p className={styles.description}>
          Find your session information below.
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

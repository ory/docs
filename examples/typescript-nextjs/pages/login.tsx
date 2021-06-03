import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {ory, toFormikValues} from './helpers'
import {LoginFlow} from "@ory/client";
import {Formik} from "formik";
import {AxiosError} from "axios";
import {useRouter} from "next/router";
import OryForm from './helpers/OryForm'

export default function Login() {
  const router = useRouter()

  const [flow, setFlow] = useState<LoginFlow>()
  useEffect(() => {
    ory.initializeSelfServiceLoginForBrowsers().then(({data}) => setFlow(data as unknown as LoginFlow))
  }, [])

  return (
    <div>
      <Head>
        <title>Login / NextJS & Ory</title>
        <meta name="description" content="Ory integrated into NextJS"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Log in
        </h1>

        {flow && (
          <Formik
            initialValues={toFormikValues(flow.ui)}
            onSubmit={(values, actions) => {
              ory.submitSelfServiceLoginFlow(flow.id, {
                ...values
              }).then(({data}) => {
                actions.setSubmitting(false);

                // we're now logged in!
                return router.push('/protected')
              }).catch((err: AxiosError) => {
                if (err.response.status !== 400) {
                  // Not a form error!
                  return Promise.reject(err)
                }

                setFlow(err.response.data)
              })
            }}
          >

            <OryForm ui={flow.ui}/>
          </Formik>
        )}
      </main>
    </div>
  )
}

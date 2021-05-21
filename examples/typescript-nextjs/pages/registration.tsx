import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {ory, toFormikValues} from './helpers'
import {Formik} from "formik";
import {AxiosError} from "axios";
import OryForm from "./helpers/OryForm";
import {RegistrationFlow} from "@ory/client";
import {useRouter} from "next/router";

export default function Registration() {
  const router = useRouter()
  const [flow, setFlow] = useState<RegistrationFlow>()
  useEffect(() => {
    ory.initializeSelfServiceRegistrationForBrowsers().then(({data}) => setFlow(data as unknown as RegistrationFlow))
  }, [])

  return (
    <div>
      <Head>
        <title>NextJS + Ory</title>
        <meta name="description" content="Ory integrated into NextJS"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sign Up
        </h1>

        {flow && (
          <Formik
            initialValues={toFormikValues(flow.ui)}
            onSubmit={(values, actions) => {
              ory.submitSelfServiceRegistrationFlow(flow.id, {
                ...values as any
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

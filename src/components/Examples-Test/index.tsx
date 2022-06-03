import React from 'react'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import * as content from '../../pages/_assets/examples-content'
import { official } from '../../pages/_assets/examples-content'

export interface PropTypes {
  title: string
  language: string
  framework: string
  author: string
  tested: boolean
  repoLink: string
  tutorialLink: string
  description: string
}

const Examples = ({ }: PropTypes) => (
      <Layout>
      <h1 className={styles.pageHeading}>Ory Examples</h1>
      <ul className={styles.wrapper}>
        {official.map((official) => {
          return (
            <li key="name">
              <div className={styles.examplecontainer}>
                <div>
                  <img
                    className={styles.img}
                    src={'./img/examples/' + official.language + '.svg'}
                  />
                </div>
                <div>
                  <p className={styles.examplename}>{official.title}</p>
                  </div>
                  </div>
            </li>
          )
        })}
         </ul>
    </Layout>
    )

export default Examples

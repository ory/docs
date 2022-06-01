import React from 'react'
import Layout from '@theme/Layout'
import styles from './examples.module.css';

import { content } from './_assets/examples-content'

const Examples = () => {
  return (
    <Layout>
      <h1>Ory Examples</h1>
      <ul className={styles.wrapper}>
        {content.map((content) => {
          return (
            <li key="content.name">
              <div className={styles.examplecontainer} >
                <div>
                  <img
                    className={styles.exampleimg}
                    src={'./img/examples/' + content.language + '.svg'}
                  />
                </div>
                <div>
                  <h2>{content.name}</h2>
                </div>
                <div></div>
                <div>
                  <h3>by <a href={'https://github.com/' + content.author}>@{content.author}</a></h3>
                </div>
                <div></div>
                <div>
                  {' '}
                  <button onClick={() => location.href=`${content.repoLink}`} type="button">
                    <img
                      src="./img/github.svg"
                    />
                    Code
                  </button>{' '}
                  {content.tutorialLink.length > 1 && (<button onClick={() => location.href=`${content.tutorialLink}`} type="button">
                    <img
                      src="./img/book.svg"
                    />
                    Docs
                  </button>)}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Examples

import React from 'react'
import Layout from '@theme/Layout'
import * as styles from './_assets/examples.module.css'
import { content } from './_assets/examples-content'

function Examples() {
  return (
    <Layout>
      <div>
        <h1>Ory Examples</h1>
        <table className={styles.table}>
          <thead className={styles.th}>
            <tr>
              <th>Language</th>
              <th>Framework</th>
              <th>Tutorial</th>
              <th>Link to Code</th>
              <th>Author</th>
              <th>Tests</th>
            </tr>
          </thead>
          <tbody>
            {content.map((value, key) => {
              {
                return (
                  <tr key={key}>
                    <td>
                      <img
                        width="75px"
                        height="75px"
                        src={'./img/examples/' + value.language + '.svg'}
                      />
                    </td>
                    <td>{value.framework}</td>
                    <td>
                      {' '}
                      {value.tutorialLink.length > 1 && (
                        <a href={value.tutorialLink}>{value.name}</a>
                      )}
                    </td>
                    <td>
                      <a href={value.repoLink}>{value.repoLink}</a>
                    </td>
                    <td>
                      <a href={'https://github.com/' + value.createdBy}>
                        {value.createdBy}
                      </a>
                    </td>
                    <td>{value.tested ? '✅' : '✖️'}</td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Examples

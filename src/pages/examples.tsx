import React from 'react';
import Layout from '@theme/Layout'
import PropTypes from 'prop-types';
import * as styles from './examples.module.css';
import { content } from './examples-content';

Examples.propTypes = {
  name: PropTypes.string,
  language: PropTypes.string,
  framework: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  createdby: PropTypes.string,
  tested: PropTypes.bool,
}


function Examples() {
  return (
    <Layout>
     <div>
     <h1>Ory Examples</h1>
      <table className={styles.table} >
        <thead className={styles.th} >
          <tr>
            <th>Language</th>
            <th>Framework</th>
            <th>Example Code</th>
            <th>Tutorial</th>
            <th>Description</th>
            <th>Author</th>
            <th>Tests</th>
          </tr>
        </thead>
        <tbody>
          {
            content.map((value, key) => {
              {
                return (
                  <tr key={key}>
                    <td><img width="75px" height="75px" src={'./img/examples/'+ value.language + '.svg'}/></td>
                    <td>{value.framework}</td>
                    <td><a href={value.link}>{value.link}</a></td>
                    <td><a href={value.tutorial}>{value.name}</a></td>
                    <td>{value.description}</td>
                    <td><a href={'https://github.com/'+ value.createdby}>{value.createdby}</a></td>
                    <td>{value.tested ? "✅" : "✖️"}</td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
    </Layout>
  );
}

export default Examples;
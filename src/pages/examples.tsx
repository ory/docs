import React from 'react';
import Layout from '@theme/Layout';
import * as styles from './examples.module.css'

export const content = [
  { name: "Protect a Page with Login in NextJs", language: "javascript", framework: "NextJs", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/nextjs", description: "This is a Next.js project bootstrapped with create-next-app.", official: true}, 
  { name: "Protect a Page with Login in ExpressJS", language: "javascript", framework: "ExpressJs", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/expressjs", description: "Some smart description", official: true}, 
  { name: "Protect a Page with Login in Go", language: "go", framework: "Vanilla", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/go", description: "Some smart Go description", official: true}, 
  { name: "Protect a Page with Login in PHP", language: "php", framework: "Vanilla", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/php", description: "Some smart PHP description", official: true}, 
  { name: "Protect a Page with Login in Flutter", language: "dart", framework: "Flutter", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/flutter_web_redirect", description: "Some smart Dart description", official: true}, 
  { name: "Protect a Page with Login in Kotlin", language: "java", framework: "Quarkus", link: "https://github.com/hbrammer/quarkus_kratos_example", description: "How to use Ory Kratos with Quarkus, Kotlin, and Qute", official: false}, 
  { name: "Ory Kratos Node Self-service UI", language: "javascript", framework: "NodeJS", link: "https://github.com/ory/kratos-selfservice-ui-node", description: "A reference implementation for Ory Kratos' in NodeJS / ExpressJS / Handlebars / NextJS.", official: true}, 
  { name: "Ory Kratos Vue3 Self-service UI", language: "javascript", framework: "Vue3", link: "https://github.com/timalanfarrow/kratos-selfservice-ui-vue3-typescript", description: "A reference self-service UI implementation for Ory Kratos' in Vue.", official: false}, 
  { name: "Ory Kratos Flask Self-service UI", language: "python", framework: "Flask", link: "https://github.com/ory/examples/tree/master/kratos-keto-flask", description: "An example Flask app using Kratos and Keto to check permissions and authenticate users", official: true}, 
  { name: "Ory Kratos/Hydra Erlang Self-service UI", language: "erlang", framework: "Rebar3", link: "https://github.com/hrefhref/styx", description: "Lightweight self-service UI for Ory Kratos/Hydra", official: false}, 
  { name: "Ory Kratos Rescript Self-service UI", language: "rescript", framework: "React", link: "https://github.com/allancalix/kratos-ui", description: "A ReScript React implementation of Kratos browser authentication flows.", official: false}, 
]

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
            <th>Example + Link</th>
            <th>Description</th>
            <th>Official</th>
          </tr>
        </thead>
        <tbody>
          {
            content.map((value, key) => {
              {
                return (
                  <tr key={key}>
                    <td><img width="50px" height="50px" src={'./img/examples/'+ value.language + '.png'}/></td>
                    <td>{value.framework}</td>
                    <td><a href={value.link}>{value.name}</a></td>
                    <td>{value.description}</td>
                    <td>{value.official ? "official example" : "community example"}</td>
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
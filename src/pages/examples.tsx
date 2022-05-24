import React from 'react';
import Layout from '@theme/Layout';
import * as styles from './examples.module.css'
import PropTypes from 'prop-types'

Examples.propTypes = {
  name: PropTypes.string,
  language: PropTypes.string,
  framework: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  createdby: PropTypes.string,
  tested: PropTypes.bool,
}
export const content = [
  { name: "Protect a Page with Login: NextJs", language: "typescript", framework: "NextJs", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/nextjs", description: "This is a Next.js project bootstrapped with create-next-app.", createdby: "Ory", tested: true}, 
  { name: "Protect a Page with Login: ExpressJS", language: "typescript", framework: "ExpressJs", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/expressjs", description: "Some smart description", createdby: "Ory", tested: true}, 
  { name: "Protect a Page with Login: Go", language: "go", framework: "Vanilla", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/go", description: "Some smart Go description", createdby: "Ory", tested: true}, 
  { name: "Protect a Page with Login: PHP", language: "php", framework: "Vanilla", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/php", description: "Some smart PHP description", createdby: "Ory", tested: true}, 
  { name: "Protect a Page with Login: Flutter", language: "dart", framework: "Flutter", link: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/flutter_web_redirect", description: "Some smart Dart description", createdby: "Ory", tested: true}, 
  { name: "Protect a Page with Login: Kotlin", language: "java", framework: "Quarkus", link: "https://github.com/hbrammer/quarkus_kratos_example", description: "How to use Ory Kratos with Quarkus, Kotlin, and Qute", createdby: 'hbrammer', tested: false}, 
  { name: "Protect a Page with Login: Django", language: "python", framework: "Django", link: "https://github.com/ory/examples/tree/master/django-ory-cloud", description: "This repo demonstrates how you can use Ory Cloud or Ory Kratos with Django apps. This app is not for production use and serves as an example of integration.", createdby: 'Ory', tested: false}, 
  { name: "Protect a Page with Login: Flask", language: "python", framework: "Flask", link: "https://github.com/ory/examples/tree/master/kratos-keto-flask", description: "An example Flask app using Kratos and Keto to check permissions and authenticate users", createdby: "Ory", tested: false}, 
  { name: "Add Custom Self-service UI: NodeJs", language: "typescript", framework: "NodeJs", link: "https://github.com/ory/kratos-selfservice-ui-node", description: "A reference implementation for Ory Kratos' in NodeJS / ExpressJS / Handlebars / NextJS.", createdby: "Ory", tested: true}, 
  { name: "Add Custom Self-service UI: NextJS", language: "typescript", framework: "NextJs", link: "https://github.com/ory/kratos-nextjs-react-example", description: " Add login, registration, account recovery (password reset), account verification (email verification), social sign in, multi-factor authentication to your Next.js / React App using Ory!", createdby: "Ory", tested: true}, 
  { name: "Add Custom Self-service UI: Vue3", language: "javascript", framework: "Vue3", link: "https://github.com/timalanfarrow/kratos-selfservice-ui-vue3-typescript", description: "A reference self-service UI implementation for Ory Kratos' in Vue.", createdby: 'timalanfarrow', tested: false}, 
  { name: "Add Custom Self-service UI: Erlang", language: "erlang", framework: "Rebar3", link: "https://github.com/hrefhref/styx", description: "Lightweight self-service UI for Ory Kratos/Hydra", createdby: 'hrefhref', tested: false},
  { name: "Add Custom Self-service UI: Rescript", language: "rescript", framework: "React", link: "https://github.com/allancalix/kratos-ui", description: "A ReScript React implementation of Kratos browser authentication flows.", createdby: "Ory", tested: true}, 
  { name: "Add Custom Self-service UI: React Native", language: "typescript", framework: "React Native", link: "https://github.com/ory/kratos-selfservice-ui-react-native", description: " A reference implementation of an app using ORY Kratos for auth (login), sign up (registration), profile settings (update password), MFA/2FA, account recovery (password reset), and more for React Native. ", createdby: "Ory", tested: true}, 
  { name: "Add Custom Self-service UI: Sveltekit", language: "javaScript", framework: "Sveltekit", link: "https://github.com/micleyman/sveltekit-ory-starter", description: "An unstyled starter template for a modern Svelte Kit app, secured using Ory's open source libraries.", createdby: "micleyman", tested: true}, 
  { name: "Add Custom Self-service UI: Sveltekit", language: "javaScript", framework: "Sveltekit", link: "https://github.com/drejohnson/sveltekit-kratos", description: "Basic SvelteKit example using Ory Kratos for authentication.", createdby: "drejohnson", tested: false}, 
  { name: "Add Custom Self-service UI: Sveltekit", language: "javaScript", framework: "Sveltekit", link: "https://github.com/emrahcom/kratos-selfservice-svelte-node", description: "Self-service Svelte node for Ory Kratos. It has no style or decoration. Apply your custom style according to your application.", createdby: "emrahcom", tested: false}, 
  { name: "Add Custom Self-service UI: Flutter", language: "dart", framework: "Flutter", link: "https://github.com/amorevino/ory-showcase-apps", description: "Flutter app using ORY Kratos for authentication.", createdby: "amorevino", tested: false}, 
  { name: "Integrate: Kong", language: "ory", framework: "Kong", link: "https://github.com/ory/examples/tree/master/kratos-oathkeeper-kong", description: "This is a demo app build to show a configuration using Kong and Ory", createdby: "Ory", tested: false}, 
  { name: "Ory Oathkeeper Examples", language: "ory", framework: "Ory Oathkeeper", link: "https://github.com/ory/examples/tree/master/oathkeeper", description: "This is a collection of example configuration for Ory Oathkeeper", createdby: "Ory", tested: false}, 
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
            <th>Repository Link</th>
            <th>Description</th>
            <th>Created by</th>
            <th>Tested</th>
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
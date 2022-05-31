import PropTypes from 'prop-types'

export const content = [
  {
    name: 'Protect a Page with Login: NextJs/React',
    language: 'typescript',
    framework: 'NextJs/React',
    createdBy: 'Ory',
    tested: true,
    repoLink:
      'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/nextjs',
    tutorialLink: 'https://www.ory.sh/docs/guides/protect-page-login/next.js',
    description: 'TODO'
  },
  {
    name: 'Protect a Page with Login: ExpressJS',
    language: 'typescript',
    framework: 'ExpressJs',
    createdBy: 'Ory',
    tested: true,
    repoLink:
      'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/expressjs',
    tutorialLink: 'https://www.ory.sh/docs/guides/protect-page-login/expressjs',
    description: 'TODO'
  },
  {
    name: 'Protect a Page with Login: Go',
    language: 'Go',
    framework: 'Vanilla',
    createdBy: 'Ory',
    tested: true,
    repoLink:
      'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/go',
    tutorialLink: 'https://www.ory.sh/docs/guides/protect-page-login/go',
    description: 'TODO'
  },
  {
    name: 'Protect a Page with Login: PHP',
    language: 'php',
    framework: 'Vanilla',
    createdBy: 'Ory',
    tested: true,
    repoLink:
      'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/php',
    tutorialLink: 'https://www.ory.sh/docs/guides/protect-page-login/php',
    description: 'TODO'
  },
  {
    name: 'Protect a Page with Login: Flutter',
    language: 'dart',
    framework: 'Flutter',
    createdBy: 'Ory',
    tested: true,
    repoLink:
      'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/flutter_web_redirect',
    tutorialLink: 'https://www.ory.sh/docs/guides/protect-page-login/flutter',
    description: 'TODO'
  },
  {
    name: 'Protect a Page with Login: Kotlin',
    language: 'java',
    framework: 'Quarkus',
    createdBy: 'Ory',
    tested: true,
    repoLink: 'https://github.com/hbrammer/quarkus_kratos_example',
    tutorialLink:
      'https://hauke.me/writing/2021-03-building-a-quarkus-application-with-ory-kratos/',
    description: 'How to use Ory Kratos with Quarkus, Kotlin, and Qute.'
  },
  {
    name: 'Protect a Page with Login: Django',
    language: 'python',
    framework: 'Django',
    createdBy: 'Ory',
    tested: true,
    repoLink: 'https://github.com/ory/examples/tree/master/django-ory-cloud',
    tutorialLink:
      'https://hauke.me/writing/2021-03-building-a-quarkus-application-with-ory-kratos/',
    description:
      'This repo demonstrates how you can use Ory Cloud or Ory Kratos with Django apps.'
  },
  {
    name: 'Protect a Page with Login: Flask',
    language: 'python',
    framework: 'Flask',
    createdBy: 'Ory',
    tested: true,
    repoLink: 'https://github.com/ory/examples/tree/master/kratos-keto-flask',
    tutorialLink:
      'https://www.ory.sh/securing-flask-application-using-kratos-and-keto/',
    description:
      'An example Flask app using Kratos and Keto to check permissions and authenticate users.'
  },
  {
    name: 'Customize Self-service UI: NodeJs',
    language: 'typescript',
    framework: 'NodeJs',
    createdBy: 'Ory',
    tested: true,
    repoLink: 'https://github.com/ory/kratos-selfservice-ui-node',
    tutorialLink: '',
    description:
      'A reference implementation for Ory Kratos in NodeJS / ExpressJS / Handlebars / NextJS.'
  },
  {
    name: 'Customize Self-service UI: NextJS/React',
    language: 'typescript',
    framework: 'NextJs/React',
    createdBy: 'Ory',
    tested: true,
    repoLink: 'https://github.com/ory/kratos-nextjs-react-example',
    tutorialLink:
      'https://www.ory.sh/nextjs-authentication-spa-custom-flows-open-source/',
    description:
      'Add login, registration, account recovery (password reset), account verification (email verification), social sign in, multi-factor authentication to your Next.js / React App using Ory.'
  },
  {
    name: 'Customize Self-service UI: React Native',
    language: 'typescript',
    framework: 'React Native',
    createdBy: 'Ory',
    tested: false,
    repoLink: 'https://github.com/ory/kratos-selfservice-ui-react-native',
    tutorialLink:
      'https://www.ory.sh/login-react-native-authentication-example-api/',
    description:
      'A reference implementation of an app using ORY Kratos for auth (login), sign up (registration), profile settings (update password), MFA/2FA, account recovery (password reset), and more for React Native.'
  },
  {
    name: 'Customize Self-service UI: Vue3',
    language: 'typescript',
    framework: 'Vue3',
    createdBy: 'timalanfarrow',
    tested: false,
    repoLink:
      'https://github.com/timalanfarrow/kratos-selfservice-ui-vue3-typescript',
    tutorialLink: '',
    description:
      'A reference self-service UI implementation for Ory Kratos in Vue.'
  },
  {
    name: 'Customize Self-service UI: Erlang',
    language: 'erlang',
    framework: 'Rebar3',
    createdBy: 'hrefhref',
    tested: false,
    repoLink: 'https://github.com/hrefhref/styx',
    tutorialLink: '',
    description: 'Lightweight self-service UI for Ory Kratos/Hydra.'
  },
  {
    name: 'Customize Self-service UI: Rescript',
    language: 'rescript',
    framework: 'React',
    createdBy: 'allancalix',
    tested: false,
    repoLink: 'https://github.com/allancalix/kratos-ui',
    tutorialLink: 'TODO',
    description:
      'A ReScript React implementation of Kratos browser authentication flows.'
  },
  {
    name: 'Customize Self-service UI: Sveltekit',
    language: 'javascript',
    framework: 'Sveltekit',
    createdBy: 'micleyman',
    tested: true,
    repoLink: 'https://github.com/micleyman/sveltekit-ory-starter',
    tutorialLink: '',
    description:
      'An unstyled starter template for a modern Svelte Kit app, secured using Orys open source libraries.'
  },
  {
    name: 'Customize Self-service UI: Sveltekit',
    language: 'javascript',
    framework: 'Sveltekit',
    createdBy: 'drejohnson',
    tested: false,
    repoLink: 'https://github.com/drejohnson/sveltekit-kratos',
    tutorialLink: '',
    description: 'Basic SvelteKit example using Ory Kratos for authentication.'
  },
  {
    name: 'Customize Self-service UI: Sveltekit',
    language: 'javascript',
    framework: 'Sveltekit',
    createdBy: 'emrahcom',
    tested: false,
    repoLink: 'https://github.com/emrahcom/kratos-selfservice-svelte-node',
    tutorialLink: '',
    description:
      'Self-service Svelte node for Ory Kratos. It has no style or decoration. Apply your custom style according to your application.'
  },
  {
    name: 'Customize Self-service UI: Flutter',
    language: 'dart',
    framework: 'Flutter',
    createdBy: 'amorevino',
    tested: false,
    repoLink: 'https://github.com/amorevino/ory-showcase-apps',
    tutorialLink: '',
    description: 'Flutter app using Ory Kratos for authentication.'
  },
  {
    name: 'Integrate: Kong',
    language: 'ory',
    framework: 'Kong',
    createdBy: 'Ory',
    tested: false,
    repoLink:
      'https://github.com/ory/examples/tree/master/kratos-oathkeeper-kong',
    tutorialLink: 'https://www.ory.sh/zero-trust-api-security-ory-tutorial/',
    description:
      'This is a demo app build to show a configuration using Kong and Ory'
  },
  {
    name: 'Ory Oathkeeper Examples',
    language: 'ory',
    framework: 'Ory Oathkeeper',
    createdBy: 'Ory',
    tested: false,
    repoLink: 'https://github.com/ory/examples/tree/master/oathkeeper',
    tutorialLink: '',
    description:
      'This is a collection of example configuration for Ory Oathkeeper'
  }
]

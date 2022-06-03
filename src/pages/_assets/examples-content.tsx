import { PropTypes } from '../../components/Examples/example-list'

export const official: PropTypes = {
  title: 'Official Examples',
  description:
    'Guides, tutorials and configurations for using Ory services. Examples maintained and tested by the Ory team.',
  examples: [
    {
      title: 'Protect a Page with Login: NextJs/React',
      language: 'typescript',
      framework: 'NextJs/React',
      author: 'ory',
      tested: true,
      repo:
        'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/nextjs',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/next.js'
    },
    {
      title: 'Protect a Page with Login: ExpressJS',
      language: 'typescript',
      framework: 'ExpressJs',
      author: 'ory',
      tested: true,
      repo:
        'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/expressjs',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/expressjs'
    },
    {
      title: 'Protect a Page with Login: Go',
      language: 'Go',
      framework: 'Vanilla',
      author: 'ory',
      tested: true,
      repo:
        'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/go',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/go'
    },
    {
      title: 'Protect a Page with Login: PHP',
      language: 'php',
      framework: 'Vanilla',
      author: 'ory',
      tested: true,
      repo:
        'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/php',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/php'
    },
    {
      title: 'Protect a Page with Login: Flutter',
      language: 'dart',
      framework: 'Flutter',
      author: 'ory',
      tested: true,
      repo:
        'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/flutter_web_redirect',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/-web-redirect'
    },
    {
      title: 'Protect a Page with Login: Django',
      language: 'python',
      framework: 'Django',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/examples/tree/master/django-ory-cloud',
      docs: 'https://hauke.me/writing/2021-03-building-a-quarkus-application-with-ory-kratos/',
      description:
        'This repo demonstrates how you can use Ory Cloud or Ory Kratos with Django apps.'
    },
    {
      title: 'Protect a Page with Login: Flask',
      language: 'python',
      framework: 'Flask',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/examples/tree/master/kratos-keto-flask',
      docs: 'https://www.ory.sh/securing-flask-application-using-kratos-and-keto/'
    },
    {
      title: 'Customize Self-service UI: NodeJs',
      language: 'typescript',
      framework: 'NodeJs',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/kratos-selfservice-ui-node',
      docs: 'https://github.com/ory/kratos-selfservice-ui-node/blob/master/README.md'
    },
    {
      title: 'Customize Self-service UI: NextJS/React',
      language: 'typescript',
      framework: 'NextJs/React',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/kratos-nextjs-react-example',
      docs: 'https://www.ory.sh/nextjs-authentication-spa-custom-flows-open-source/'
    },
    {
      title: 'Customize Self-service UI: React Native',
      language: 'typescript',
      framework: 'React Native',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/kratos-selfservice-ui-react-native',
      docs: 'https://www.ory.sh/login-react-native-authentication-example-api/'
    },
    {
      title: 'Ory Cloud with Supabase Backend',
      language: 'typescript',
      framework: 'React Native',
      author: 'ory',
      tested: false,
      repo:
        'https://github.com/ory/examples/tree/master/supabase-ory-cloud',
      docs: 'https://github.com/ory/examples/blob/master/supabase-ory-cloud/README.md'
    }
  ]
}

export const community: PropTypes = {
  title: 'Community Examples',
  description:
    'Guides, tutorials and configurations for using Ory services contributed by the Ory community.',
  examples: [
    {
      title: 'Customize Self-service UI: Flutter',
      language: 'dart',
      framework: 'Flutter',
      author: 'amorevino',
      tested: false,
      repo: 'https://github.com/amorevino/ory-showcase-apps',
      docs: 'https://www.ory.sh/cloud-ecommerce-frontend/'
    },
    {
      title: 'Customize Self-service UI: Flutter Web',
      language: 'dart',
      framework: 'Flutter Web',
      author: 'IGLU-Agency',
      tested: false,
      repo: 'https://github.com/IGLU-Agency/iglu-ory-kratos-example',
      docs: 'https://www.ory.sh/login-flutter-authentication-example-api-open-source/'
    },
    {
      title: 'Protect a Page with Login: Kotlin',
      language: 'java',
      framework: 'Quarkus',
      author: 'hbrammer',
      tested: false,
      repo: 'https://github.com/hbrammer/quarkus_kratos_example',
      docs: 'https://hauke.me/writing/2021-03-building-a-quarkus-application-with-ory-kratos/'
    },
    {
      title: 'Customize Self-service UI: Vue3',
      language: 'typescript',
      framework: 'Vue3',
      author: 'timalanfarrow',
      tested: false,
      repo:
        'https://github.com/timalanfarrow/kratos-selfservice-ui-vue3-typescript',
      docs: 'https://github.com/timalanfarrow/kratos-selfservice-ui-vue3-typescript/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: NextJs',
      language: 'typescript',
      framework: 'NextJs',
      author: 'spa5k',
      tested: false,
      repo: 'https://github.com/spa5k/kratos-next',
      docs: 'https://github.com/spa5k/kratos-next/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Erlang',
      language: 'erlang',
      framework: 'Rebar3',
      author: 'hrefhref',
      tested: false,
      repo: 'https://github.com/hrefhref/styx',
      docs: 'https://github.com/hrefhref/styx/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Rescript',
      language: 'rescript',
      framework: 'React',
      author: 'allancalix',
      tested: false,
      repo: 'https://github.com/allancalix/kratos-ui',
      docs: 'https://github.com/allancalix/kratos-ui/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Sveltekit',
      language: 'javascript',
      framework: 'Sveltekit',
      author: 'micleyman',
      tested: true,
      repo: 'https://github.com/micleyman/sveltekit-ory-starter',
      docs: 'https://github.com/micleyman/sveltekit-ory-starter/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Sveltekit',
      language: 'javascript',
      framework: 'Sveltekit',
      author: 'drejohnson',
      tested: false,
      repo: 'https://github.com/drejohnson/sveltekit-kratos',
      docs: 'https://github.com/drejohnson/sveltekit-kratos/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Sveltekit',
      language: 'javascript',
      framework: 'Sveltekit',
      author: 'emrahcom',
      tested: false,
      repo: 'https://github.com/emrahcom/kratos-selfservice-svelte-node',
      docs: 'https://github.com/emrahcom/kratos-selfservice-svelte-node/blob/master/README.md'
    }
  ]
}

export const selfhosted: PropTypes = {
  title: 'Selfhosted Examples',
  description:
    'Guides, tutorials and configurations for self-hosting Ory services. These examples are partly contributed by the Ory community, in parts by the Ory team.',
  examples: [
    {
      title: 'API Gateway using Kong, Ory Kratos & Ory Oathkeeper',
      language: 'ory',
      framework: 'Kong',
      author: 'ory',
      tested: false,
      repo:
        'https://github.com/ory/examples/tree/master/kratos-oathkeeper-kong',
      docs: 'https://www.ory.sh/zero-trust-api-security-ory-tutorial/'
    },
    {
      title: 'Ory Oathkeeper Examples',
      language: 'ory',
      framework: 'Ory Oathkeeper',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/examples/tree/master/oathkeeper',
      docs: 'https://github.com/ory/examples/blob/master/oathkeeper/README.md'
    },
    {
      title: 'Simple Admin UI for Ory Kratos',
      language: 'javascript',
      framework: 'Ory Kratos',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/dfoxg/kratos-admin-ui',
      docs: 'https://github.com/dfoxg/kratos-admin-ui/blob/main/README.md'
    },
    {
      title: 'SSO and ACL Ory Stack',
      language: 'javascript',
      framework: 'Ory Stack',
      author: 'pngouin',
      tested: false,
      repo: 'https://github.com/pngouin/k8s-ory-example',
      docs: 'https://github.com/pngouin/k8s-ory-example/blob/main/README.md'
    },
    {
      title: ' Reference Ory Stack Docker Compose',
      language: 'ory',
      framework: 'Ory Stack',
      author: 'radekg',
      tested: false,
      repo: 'https://github.com/radekg/ory-reference-compose',
      docs: 'https://github.com/dfoxg/kratos-admin-ui/blob/main/README.md'
    }
  ]
}

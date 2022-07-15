import { PropTypes } from '../../components/Examples/example-list'

export const official: PropTypes = {
  id: 'official',
  title: 'Official Examples',
  description:
    'Guides, tutorials, and configurations for using Ory services. Examples maintained and tested by the Ory team.',
  examples: [
    {
      title: 'Protect a Page with Login: Next.js/React',
      language: 'nextjs',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/nextjs',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/next.js'
    },
    {
      title: 'Protect a Page with Login: React',
      language: 'react',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/react',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/react'
    },
    {
      title: 'Protect a Page with Login: Express.js',
      language: 'typescript',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/expressjs',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/expressjs'
    },
    {
      title: 'Protect a Page with Login: Go',
      language: 'go',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/go',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/go'
    },
    {
      title: 'Protect a Page with Login: PHP',
      language: 'php',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/php',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/php'
    },
    {
      title: 'Protect a Page with Login: Vue.js',
      language: 'vue',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/vue',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/vue'
    },
    {
      title: 'Protect a Page with Login: Flutter',
      language: 'flutter',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/docs/tree/master/code-examples/protect-page-login/flutter_web_redirect',
      docs: 'https://www.ory.sh/docs/guides/protect-page-login/-web-redirect'
    },
    {
      title: 'Protect a Page with Login: Django',
      language: 'django',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/examples/tree/master/django-ory-cloud',
      docs: 'https://hauke.me/writing/2021-03-building-a-quarkus-application-with-ory-kratos/'
    },
    {
      title: 'Protect a Page with Login: Flask',
      language: 'python',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/examples/tree/master/kratos-keto-flask',
      docs: 'https://www.ory.sh/securing-flask-application-using-kratos-and-keto/'
    },
    {
      title: 'Customize Self-service UI: Node.js',
      language: 'nodejs',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/kratos-selfservice-ui-node',
      docs: 'https://github.com/ory/kratos-selfservice-ui-node/blob/master/README.md'
    },
    {
      title: 'Customize Self-service UI: Next.js/React',
      language: 'nextjs',
      author: 'ory',
      tested: true,
      repo: 'https://github.com/ory/kratos-nextjs-react-example',
      docs: 'https://www.ory.sh/nextjs-authentication-spa-custom-flows-open-source/'
    },
    {
      title: 'Customize Self-service UI: React Native',
      language: 'react',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/kratos-selfservice-ui-react-native',
      docs: 'https://www.ory.sh/login-react-native-authentication-example-api/'
    },
    {
      title: 'Ory Cloud with Supabase Backend',
      language: 'go',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/examples/tree/master/supabase-ory-cloud',
      docs: 'https://github.com/ory/examples/blob/master/supabase-ory-cloud/README.md'
    }
  ]
}

export const community: PropTypes = {
  id: 'community',
  title: 'Community Examples',
  description:
    'Guides, tutorials, and configurations for using Ory services contributed by the Ory community.',
  examples: [
    {
      title: 'Customize Self-service UI: Flutter',
      language: 'flutter',
      author: 'amorevino',
      tested: false,
      repo: 'https://github.com/amorevino/ory-showcase-apps',
      docs: 'https://www.ory.sh/cloud-ecommerce-frontend/'
    },
    {
      title: 'Customize Self-service UI: Flutter Web',
      language: 'flutter',
      author: 'IGLU-Agency',
      tested: false,
      repo: 'https://github.com/IGLU-Agency/iglu-ory-kratos-example',
      docs: 'https://www.ory.sh/login-flutter-authentication-example-api-open-source/'
    },
    {
      title: 'Protect a Page with Login: Kotlin',
      language: 'quarkus',
      author: 'hbrammer',
      tested: false,
      repo: 'https://github.com/hbrammer/quarkus_kratos_example',
      docs: 'https://hauke.me/writing/2021-03-building-a-quarkus-application-with-ory-kratos/'
    },
    {
      title: 'Customize Self-service UI: Vue.js',
      language: 'vue',
      author: 'timalanfarrow',
      tested: false,
      repo: 'https://github.com/timalanfarrow/kratos-selfservice-ui-vue3-typescript',
      docs: 'https://github.com/timalanfarrow/kratos-selfservice-ui-vue3-typescript/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: NextJs',
      language: 'nextjs',
      author: 'spa5k',
      tested: false,
      repo: 'https://github.com/spa5k/kratos-next',
      docs: 'https://github.com/spa5k/kratos-next/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Erlang',
      language: 'erlang',
      author: 'hrefhref',
      tested: false,
      repo: 'https://github.com/hrefhref/styx',
      docs: 'https://github.com/hrefhref/styx/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Rescript',
      language: 'rescript',
      author: 'allancalix',
      tested: false,
      repo: 'https://github.com/allancalix/kratos-ui',
      docs: 'https://github.com/allancalix/kratos-ui/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Svelte',
      language: 'svelte',
      author: 'micleyman',
      tested: true,
      repo: 'https://github.com/micleyman/sveltekit-ory-starter',
      docs: 'https://github.com/micleyman/sveltekit-ory-starter/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Svelte',
      language: 'svelte',
      author: 'drejohnson',
      tested: false,
      repo: 'https://github.com/drejohnson/sveltekit-kratos',
      docs: 'https://github.com/drejohnson/sveltekit-kratos/blob/main/README.md'
    },
    {
      title: 'Customize Self-service UI: Svelte',
      language: 'svelte',
      author: 'emrahcom',
      tested: false,
      repo: 'https://github.com/emrahcom/kratos-selfservice-svelte-node',
      docs: 'https://github.com/emrahcom/kratos-selfservice-svelte-node/blob/master/README.md'
    }
  ]
}

export const selfhosted: PropTypes = {
  id: 'selfhosted',
  title: 'Selfhosted Examples',
  description:
    'Guides, tutorials, and configurations for self-hosting Ory services. These examples are partly contributed by the Ory community, in parts by the Ory team.',
  examples: [
    {
      title: 'API Gateway using Kong, Ory Kratos & Ory Oathkeeper',
      language: 'ory',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/examples/tree/master/kratos-oathkeeper-kong',
      docs: 'https://www.ory.sh/zero-trust-api-security-ory-tutorial/'
    },
    {
      title: 'Ory Oathkeeper Configurations',
      language: 'ory',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/examples/tree/master/oathkeeper',
      docs: 'https://github.com/ory/examples/blob/master/oathkeeper/README.md'
    },
    {
      title: 'Ory Hydra Nginx Configurations',
      language: 'ory',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/examples/tree/master/hydra-nginx',
      docs: 'https://github.com/ory/examples/blob/master/hydra-nginx/README.md'
    },
    {
      title: 'Ory Kratos Nginx Configurations',
      language: 'ory',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/examples/tree/master/kratos-nginx',
      docs: 'https://github.com/ory/examples/blob/master/kratos-nginx/README.md'
    },
    {
      title: 'Basic Admin UI for Ory Kratos',
      language: 'react',
      author: 'dfoxg',
      tested: false,
      repo: 'https://github.com/dfoxg/kratos-admin-ui',
      docs: 'https://github.com/dfoxg/kratos-admin-ui/blob/main/README.md'
    },
    {
      title: 'SSO and ACL Ory Stack',
      language: 'kubernetes',
      author: 'pngouin',
      tested: false,
      repo: 'https://github.com/pngouin/k8s-ory-example',
      docs: 'https://github.com/pngouin/k8s-ory-example/blob/main/README.md'
    },
    {
      title: ' Reference Ory Stack Docker Compose',
      language: 'docker',
      author: 'radekg',
      tested: false,
      repo: 'https://github.com/radekg/ory-reference-compose',
      docs: 'https://github.com/radekg/ory-reference-compose/blob/master/README.md'
    },
    {
      title: 'Ory Kratos with Supabase Backend',
      language: 'go',
      author: 'ory',
      tested: false,
      repo: 'https://github.com/ory/examples/tree/master/kratos-keto-oathkeeper-supabase',
      docs: 'https://www.ory.sh/tutorial-url-shortener-supabase-ory-integration-backend/'
    },
    {
      title: 'Ory Hydra / Kratos Integration in Go',
      language: 'ory',
      // framework: 'Ory',
      author: 'atreya2011',
      tested: false,
      repo: 'https://github.com/atreya2011/go-kratos-test/tree/hydra-consent',
      docs: 'https://github.com/atreya2011/go-kratos-test/blob/hydra-consent/README.md'
    }
  ]
}

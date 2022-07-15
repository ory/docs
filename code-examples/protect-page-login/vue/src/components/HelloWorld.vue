<template>
  <div class="main">
    <h1>{{ msg }}</h1>

    <div v-if="!session">
      <p>Click on "login" or "Sign Up" below to sign in.</p>
      <!-- highlight-start -->
      <li><a :href="basePath + '/ui/login'" data-testid="sign-in">Login</a></li>
      <li>
        <a :href="basePath + '/ui/registration'" data-testid="sign-up"
          >Sign Up</a
        >
      </li>
      <!-- highlight-end -->
    </div>

    <h3 v-if="session">Calling <code>toSession()</code></h3>
    <div v-if="session" class="long">
      <p>
        Use the SDK's <code>toSession()</code> call to receive the session
        information, for example the authentication methods used:
      </p>
      <!-- highlight-start -->
      <pre><code data-testid='ory-response'>{{ session.authentication_methods }}</code></pre>
      <!-- highlight-end -->
    </div>

    <h3 v-if="apiResponse">API Response</h3>
    <div v-if="apiResponse" class="long">
      <p>
        Or make authenticated AJAX calls to your API using <code>fetch()</code>:
      </p>
      <!-- highlight-start -->
      <pre><code data-testid='api-response'>{{ apiResponse }}</code></pre>
      <!-- highlight-end -->
    </div>

    <h3 v-if="session">Common Actions</h3>
    <ul v-if="session">
      <!-- highlight-start -->
      <li><a :href="logoutUrl" data-testid="logout">Logout</a></li>
      <li>
        <a :href="basePath + '/ui/settings'" data-testid="settings">Settings</a>
      </li>
      <!-- highlight-end -->
    </ul>

    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://www.ory.sh">Ory Website</a></li>
      <li><a href="https://github.com/ory">Ory GitHub</a></li>
      <li><a href="https://www.ory.sh/docs">Documentation</a></li>
    </ul>
  </div>
</template>

<script>
// highlight-next-line
import { V0alpha2Api, Configuration } from '@ory/client'

// The basePath points to the location of Ory's APIs.
// You can use https://<slug>.projects.oryapis.com/ here because cookies can not
// easily be shared across different domains.
//
// In the next step, we will run a process to mirror Ory's APIs
// on your local machine using the Ory Tunnel at http://localhost:4000
// highlight-start
const basePath = process.env.VUE_APP_ORY_URL || 'http://localhost:4000'
const ory = new V0alpha2Api(
  new Configuration({
    basePath,
    baseOptions: {
      // Ensures we send cookies in the CORS requests.
      withCredentials: true
    }
  })
)
// highlight-end

const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:8081'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      session: null,
      logoutUrl: null,
      apiResponse: null,
      basePath
    }
  },
  mounted() {
    // highlight-start
    // Fetch the session directly from Ory
    ory.toSession().then(({ data }) => {
      this.session = data
      // highlight-end

      // If the user is logged in, we want to show a logout link!
      // highlight-start
      ory.createSelfServiceLogoutFlowUrlForBrowsers().then(({ data }) => {
        this.logoutUrl = data.logout_url
      })
      // highlight-end
    })

    // highlight-start
    // Or make an authenticated request to your API
    fetch(apiUrl + '/api/hello', {
      // Do not forget to set this - it is required to send the session cookie!
      credentials: 'include'
    })
      // highlight-end
      .then(
        (res) =>
          res.ok &&
          res.json().then((res) => {
            this.apiResponse = res
          })
      )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  max-width: 400px;
  margin: 0 auto;
}
</style>

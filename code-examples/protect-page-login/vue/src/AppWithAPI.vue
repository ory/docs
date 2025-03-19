<template>
  <div class="main">
    <h1>{{ msg }}</h1>

    <div v-if="!session">
      <p>Click on "login" or "Sign Up" below to sign in.</p>
      <li><a :href="basePath + '/ui/login'" data-testid="sign-in">Login</a></li>
      <li>
        <a :href="basePath + '/ui/registration'" data-testid="sign-up"
          >Sign Up</a
        >
      </li>
    </div>

    <h3 v-if="session">Calling <code>toSession()</code></h3>
    <div v-if="session" class="long">
      <p>
        Use the SDK's <code>toSession()</code> call to receive the session
        information, for example the authentication methods used:
      </p>
      <pre><code data-testid='ory-response'>{{ session.authentication_methods }}</code></pre>
    </div>

    <!-- highlight-start -->
    <h3 v-if="apiResponse">API Response</h3>
    <div v-if="apiResponse" class="long">
      <p>
        Make authenticated AJAX calls to your API using <code>fetch()</code>:
      </p>
      <pre><code data-testid='api-response'>{{ apiResponse }}</code></pre>
    </div>
    <!-- highlight-end -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { FrontendApi, Configuration } from "@ory/client-fetch"

const props = defineProps({
  msg: String,
})

// State variables
const session = ref(null)
const logoutUrl = ref(null)
const apiResponse = ref(null)

const basePath = import.meta.env.VITE_ORY_URL || "http://localhost:4000"
// highlight-next-line
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8081"

const ory = new FrontendApi(
  new Configuration({
    basePath,
    credentials: "include",
  }),
)

const fetchSession = async () => {
  try {
    const data = await ory.toSession()
    session.value = data
    const logoutData = await ory.createBrowserLogoutFlow()
    logoutUrl.value = logoutData.data.logout_url
  } catch (error) {
    console.error("Error fetching session:", error)
  }
}

// highlight-start
const fetchApiHello = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/hello`, {
      // Do not forget to set this - it is required to send the session cookie!
      credentials: "include",
    })

    if (res.ok) {
      const data = await res.json()
      apiResponse.value = data
    }
  } catch (error) {
    console.error("Error fetching API response:", error)
  }
}
// highlight-end

// Lifecycle hooks
onMounted(async () => {
  await fetchSession()
  // highlight-start
  // Make an authenticated API call
  await fetchApiHello()
  // highlight-end
})
</script>

<style scoped>
.main {
  max-width: 400px;
  margin: 0 auto;
}
</style>

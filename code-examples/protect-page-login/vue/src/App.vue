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

<script setup>
import { ref, onMounted } from "vue"
// highlight-next-line
import { FrontendApi, Configuration } from "@ory/client-fetch"

const props = defineProps({
  msg: String,
})

// State variables
const session = ref(null)
const logoutUrl = ref(null)

// highlight-start
const basePath = import.meta.env.VITE_ORY_URL || "http://localhost:4000"
// highlight-end

// Initialize Ory client
// highlight-start
const ory = new FrontendApi(
  new Configuration({
    basePath,
    credentials: "include",
  }),
)
// highlight-end

const fetchSession = async () => {
  try {
    // highlight-start
    // Fetch the session directly from Ory
    const data = await ory.toSession()
    session.value = data
    // highlight-end

    // highlight-start
    // Create logout URL if session exists
    const logoutData = await ory.createBrowserLogoutFlow()
    logoutUrl.value = logoutData.logout_url
    // highlight-end
  } catch (error) {
    console.error("Error fetching session:", error)
  }
}

// Lifecycle hooks
onMounted(async () => {
  // highlight-start
  // Fetch the session and API response
  await fetchSession()
  // highlight-end
})
</script>

<style scoped>
.main {
  max-width: 400px;
  margin: 0 auto;
}
</style>

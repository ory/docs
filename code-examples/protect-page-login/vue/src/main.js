import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import AppWithAPI from "./AppWithAPI.vue"

// createApp(App).mount('#app')
createApp(AppWithAPI).mount("#app")

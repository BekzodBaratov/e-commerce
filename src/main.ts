import { createApp } from "vue"
import { createPinia } from "pinia"
import Toast from "vue-toastification"

import App from "./App.vue"
import router from "@/router"

import "./style.css"
import "vue-toastification/dist/index.css"
import { authProtectedApi } from "@/plugins/axios"

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Toast)

app.provide("protectedApi", authProtectedApi)

app.mount("#app")

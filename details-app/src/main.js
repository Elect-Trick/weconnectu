import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
const vfm = createVfm()
app.use(createPinia())
app.use(vfm)

app.mount('#app')

/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

//Labels
import * as labels from '@/labels'

const app = createApp(App)

app.config.globalProperties.$labels = labels

registerPlugins(app)

app.mount('#app')

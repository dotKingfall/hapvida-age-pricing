import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import 'unfonts.css'

import * as labels from '@/labels'
import { useAppStore } from './stores/app'
import '@/styles/global.scss'

const app = createApp(App)
app.config.globalProperties.$labels = labels

registerPlugins(app)
app.mount('#app')

const appStore = useAppStore()
appStore.loadAndParseAllCsvFiles()
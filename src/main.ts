import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import 'unfonts.css'

import * as labels from '@/labels'
import { useThemeColors } from './styles/colors'
import { useAppStore } from './stores/app'

const app = createApp(App)
app.config.globalProperties.$labels = labels

registerPlugins(app)
app.mount('#app')

const appStore = useAppStore()
appStore.loadAndParseAllCsvFiles()
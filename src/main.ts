import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).use(store, key).use(router).use(elementPlus).mount('#app')

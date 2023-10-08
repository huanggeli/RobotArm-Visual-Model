import { createApp } from 'vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
axios.defaults.xsrfCookieName='csrftoken';//This code tells axios to include the CSRF token value with every request automatically
axios.defaults.xsrfHeaderName="X-CSRFTOKEN";
const app = createApp(App)
app.use(VueAxios,axios)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

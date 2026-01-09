import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { createApp } from 'vue'
import App from './App.vue'

// Import our custom CSS
import './style/bootstrap.scss'
import './style/utils.css'
// Import all of Bootstrap’s JS=
import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHashHistory} from 'vue-router'
document.title = "正在加载...";
// merge routes
const base = "/avaliability_beta";

const app = createApp(App)
routes.push({path:"/:pathMatch(.*)*",component:()=>import("./pages/NotFound.vue"), name:"404"})
const router = createRouter({
    history: createWebHashHistory(base),
    routes,
})

app.use(router)
app.mount("#app")

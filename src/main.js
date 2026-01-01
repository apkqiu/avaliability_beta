import { createApp } from 'vue'
import App from './App.vue'

// Import our custom CSS
import './style/bootstrap.scss'
import './style/utils.css'
// Import all of Bootstrap’s JS=
import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
document.title = "正在加载...";
// merge routes
const base = "/avaliability_beta";

const app = createApp(App)
routes.push({path:"/:pathMatch(.*)*",component:import("@/pages/Notfound.vue"), name:"404"})
console.log(routes)
const router = createRouter({
    history: createWebHashHistory(base),
    routes,
})
app.use(router)
const meta = {
    "viewport": "width=device-width, height=device-height, initial-scale=1",
    
};
for(const item in Object.keys(meta)){
    const element = document.createElement('meta')
    element.name = item
    element.content = meta[item]
    document.head.appendChild(element)
}
const container = document.createElement('div')
document.body.appendChild(container)
app.mount(container)

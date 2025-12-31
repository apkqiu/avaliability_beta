import App from './App.vue'

// Import our custom CSS
import './style/bootstrap.scss'
import './style/utils.css'
import NotFound from '@/pages/NotFound.vue'
// Import all of Bootstrap’s JS
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
// merge routes
const base= "/avaliability_beta";
var routercfg = {
    base,
    routes
}
routercfg.routes.push(
    { path: '/404', component: NotFound, name: "404" },
    { path: '/:pathMatch(.*)*', component: NotFound, name: "404" }
)
export const createApp = ViteSSG(App,
    routercfg,
    ({ app, router, routes, isClient, initialState }) => {
        //app.use(router)
    }
)

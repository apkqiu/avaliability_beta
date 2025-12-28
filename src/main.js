import App from './App.vue'

// Import our custom CSS
import './style/bootstrap.scss'
import './style/utils.css'

// Import all of Bootstrap’s JS
import { ViteSSG } from 'vite-ssg'
import routes from './router'
export const createApp = ViteSSG(App, routes, ({ app, router, routes, isClient, initialState }) => {
    app.use(router)
})

import Home from '@/pages/Home.vue'
import News from '@/pages/News.vue'
import Text from '@/pages/Text.vue'
import NotFound from '@/pages/NotFound.vue'
import View from '@/pages/View.vue'
import Settings from '@/pages/Settings.vue'




const base= "/avaliability_beta";
var routes = {
    base: base,
    routes: [
        { path: '/', component: Home, name: '首页' },
        { path: '/news', component:News, name: '新闻' },
        { path: '/text', component:Text, name: '学生创作' },
        { path: '/account', component:Settings, name: '个人中心' },
        { path: '/view', component:View, name: '文章详情' },
        /* --------------------- */
    ],
}
export default routes;
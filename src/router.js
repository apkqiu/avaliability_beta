export default {
    //base: base,
    routes: [
        { path: '/', component: import('@/pages/Home.vue'), name: '首页' },
        { path: '/news', component: import('@/pages/News.vue'), name: '新闻' },
        { path: '/text', component: import('@/pages/Text.vue'), name: '学生创作' },
        { path: '/account', component: import('@/pages/Settings.vue'), name: '个人中心' },
        { path: '/view', component: import('@/pages/View.vue'), name: '文章详情' },
        /* --------------------- */
        { path: '/404', component: import('@/pages/NotFound.vue'), name: "404" },
        { path: '/:pathMatch(.*)*', component: import('@/pages/NotFound.vue'), name:"404" }
    ],
}
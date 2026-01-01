<style scoped>
a {
    text-decoration: none;
}
</style>
<script setup>
import { onMounted, ref } from "vue";
import { WebDocument, WebFile } from "../utils.js";
import { url } from "../csshelper.js"
import { popular } from "../web_data.js";

const items = ref([]);
const carousel_items = ref([])


definePage({ alias: ['/'], meta: { title: "首页" } })

onMounted(async () => {
    carousel_items.value = [
        {
            image: WebFile.root+"/res/img/ccnews/013.1.01.jpeg",
            link: "/view?name=news/news013.1.md",
            title: "传承中华体育魂",
            source: "运动会快讯",
        },
        {
            image: WebFile.root+"/res/img/news/birdinclass.png",
            link: "/view?pdf=11",
            title: "震惊！我教室飞鸟",
            source: "《周恩来周报 第十一期》"
        },
        {
            image: WebFile.root+"/res/img/news/微信图片_20251001100626_83_43.jpg",
            title: "“老母鸡变鸭了啊”",
            source: "——顾晓雯 | 名人名言"
        },
        {
            image: WebFile.root+"/res/img/wechat.png",
            link: "/view?name=news/0000.00.01.md",
            title: "“一班报”",
            source: "微信公众号"

        }
    ]
    carousel_items.value[0].active = true;
    if (items.value.length == 0) {
        const dir_items = WebFile.public.articles.news;
        for (let key in dir_items) {
            items.value.push({ name: key, title: await new WebDocument(dir_items[key]).getTitle() });
        }
    }
})
</script>
<template>
    <div>
        <div id="carousel" class="carousel slide h-100" style="backdrop-filter: blur(20px)">
            <div class="carousel-inner">
                <div class="carousel-item" :class="{'active':active}" v-for="{ image, link, title, source, active } in carousel_items">
                    <RouterLink class="news-bg d-block w-100" :style="{ 'background-image': url(typeof image==='string'?image:image.default) }" :to="link||''">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>{{ title }}</h1>
                                <p>{{ source }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">上一个</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">下一个</span>
            </button>
        </div>
        <div style="clear: both; height: 25px"></div>
        <div class="container min-vw-100">
            <div class="row">
                <div class="col-md-4">
                    <h3>热点新闻</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="name in Object.keys(popular)">
                            <RouterLink :to="`/View?name=${popular[name]}`" v-html="name"></RouterLink>
                        </li>
                    </ul>
                    <span class="h3">最新文章</span><small>
                        <RouterLink to="news">查看更多>></RouterLink>
                    </small>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="item in items">
                            <RouterLink :to="`/View?name=news/${item.name}`">{{ item.title }}</RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <span class="h3">最新周报</span>
                    <small>
                        <RouterLink to="news">查看更多>></RouterLink>
                    </small>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"
                            v-for="id in Object.keys(WebFile.public.res.pdf).map((s)=>parseFloat(s.substring(7, s.length-4))).sort((a,b)=>b-a).slice(0,5)">
                            <RouterLink :to="`/view?pdf=${id}`">周恩来周报 第{{ id }}期</RouterLink>
                        </li>
                    </ul>
                    <span class="h3">随机作品</span><small>
                        <RouterLink to="text">查看更多>></RouterLink>
                    </small>
                    <ul class="list-group list-group-flush" id="students_text">
                        <p>没有配置。</p>
                    </ul>
                </div>
                <div class="col-md-4">
                    <span class="h3">热门游戏</span><small>
                        <RouterLink to="apps">查看更多>></RouterLink>
                    </small>
                    <div class="card mb-3 w-100">
                        <div class="card-body">
                            <h3 class="card-title">
                                <span style="color: #ffd700">TOP1.</span> 上课睡觉模拟器
                            </h3>
                            <p class="card-text">
                                眼观六路耳听八方，在老师巡查中安然入睡。躲避干扰、抓紧补眠，你能睡过整堂课吗？
                            </p>
                            <RouterLink to="apps/ClassSleep" no-intercept="true" class="btn btn-primary">开始游戏
                            </RouterLink>
                        </div>
                    </div>
                    <hr />
                    <h3>新站介绍</h3>
                    <p>新站虽然看起来与旧站无异（除了这条额外的介绍），但是使用了Vue.js提高了性能，减小了网页大小！（目前不计划增设镜像）</p>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}
</style>
<script setup>
import { onMounted, ref } from "vue";
import { root } from "../utils.js"
import { public_tree } from "../utils.js";
import { list_zhoubao, getTitle } from "../utils.js";
const items = ref([])



onMounted(async () => {
    const dir_items = public_tree.articles.news;
    for (let key in dir_items) {
        items.value.push({name:key,title:await getTitle(dir_items[key])});
    }
})
</script>
<template>
    <div>
        <div id="carousel" class="carousel slide h-100" style="backdrop-filter: blur(20px)">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <RouterLink class="news-bg d-block w-100"
                        :style="`background-image: url(${root}/res/img/ccnews/013.1.01.jpeg);`"
                        to="/view?name=news013.1.md">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>传承中华体育魂</h1>
                                <p>运动会快讯</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div class="carousel-item">
                    <RouterLink class="news-bg d-block w-100"
                        :style="`background-image: url(${root}/res/img/news/birdinclass.png);`" to="pdf_/view#p=11">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>震惊！我教室飞鸟</h1>
                                <p>《周恩来周报 第十一期》</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div class="carousel-item">
                    <div class="news-bg d-block w-100"
                        :style="`background-image: url(${root}/res/img/news/9clock_withsun.png);`">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>“九点钟出太阳”</h1>
                                <p>——俞梓涵 | 名人名言</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <RouterLink class="news-bg d-block w-100"
                        :style="`background-image: url(${root}/res/img/news/homeworkfinish.png);`" to="/view?name=1.md">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>
                                    我的一小步，暑假的一大步
                                    <small>——我学生胜利完成本周暑假作业</small>
                                </h1>
                                <p>近期热点</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div class="carousel-item">
                    <div class="news-bg d-block w-100"
                        :style="`background-image: url(${root}/res/img/news/微信图片_20251001100626_83_43.jpg);`">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>“老母鸡变鸭了啊”</h1>
                                <p>——顾晓雯 | 名人名言</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <RouterLink class="news-bg d-block w-100"
                        :style="`background-image: url(${root}/res/img/wechat.png);`" to="/view?name=000wechat.md">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>“一班报”</h1>
                                <p>微信公众号</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div class="carousel-item">
                    <div class="news-bg d-block w-100" style="background-image: url(/res/img/news/springpool.jpg);">
                        <div class="news-txt-box">
                            <div class="news-txt">
                                <h1>“春池嫣韵”</h1>
                                <p>——李军昊 | 书法</p>
                            </div>
                        </div>
                    </div>
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
                        <li class="list-group-item" v-for="id in list_zhoubao().reverse().slice(0, 5)">
                            <RouterLink :to="`/view?pdf=${id}`">周恩来周报 第{{ id }}期</RouterLink>
                        </li>
                    </ul>
                    <span class="h3">随机作品</span><small>
                        <RouterLink to="text">查看更多>></RouterLink>
                    </small>
                    <ul class="list-group list-group-flush" id="students_text"></ul>
                </div>
                <div class="col-md-4">
                    <span class="h3">热门游戏</span><small>
                        <RouterLink to="game">查看更多>></RouterLink>
                    </small>
                    <div class="card mb-3 w-100">
                        <div class="card-body">
                            <h3 class="card-title">
                                <span style="color: #ffd700">TOP1.</span> 上课睡觉模拟器
                            </h3>
                            <p class="card-text">
                                眼观六路耳听八方，在老师巡查中安然入睡。躲避干扰、抓紧补眠，你能睡过整堂课吗？
                            </p>
                            <RouterLink to="game/ClassSleep.md" no-intercept="true" class="btn btn-primary">开始游戏
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

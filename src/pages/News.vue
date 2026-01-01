<script setup>
import { onMounted, ref } from 'vue';
import { WebDocument, WebFile } from '../utils';
const items = ref([]);
definePage({ meta: { title: "新闻" } })

onMounted(async ()=>{
    if(items.value.length==0){
        const dir_items = WebFile.public.articles.news;
        for (let key in dir_items) {
            items.value.push({name:key,title:await new WebDocument(dir_items[key]).getTitle()});
        }
    }
})
</script>
<style scoped>
a {
    text-decoration: none;
}

.preview {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 3em;
}
</style>
<template>
    <h1>新闻</h1>
    <div class="row">
        <div class="col-md-8">
            <h2>最新文章</h2>
            <ul class="list-group list-group-flush w-100">
                <li class="list-group-item" v-for="item in items">
                    <RouterLink :to="'/view?name=news/'+item.name">{{ item.title }}</RouterLink>
                </li>
            </ul>
        </div>
        <div class="col-md" style="position:sticky">
            <h2>周报出版</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="id in Object.keys(WebFile.public.res.pdf).map((s)=>parseFloat(s.substring(7, s.length-4))).sort((a,b)=>b-a)">
                    <RouterLink :to="`/view?pdf=${id}`">周恩来周报 第{{ id }}期</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { WebFile, WebDocument } from '../utils';
definePage({ meta: { title: "学生创作" } })
const items = ref({});
onMounted(async () => {
    if (Object.keys(items.value).length == 0) {
        for (let type of ["poems", "songs", "words", "writings"]) {
            let dir_items = WebFile.public.articles[type];
            items.value[type] = [];
            for (let key in dir_items) {
                const title = await new WebDocument(dir_items[key], 1).getTitle(1);
                items.value[type].push({ name: key, title: `${title[0]} <small>作者：${title[1]}</small` });
            }
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
    <div id="students_text"></div>
    <div class="row">
        <div class="col-md-6">
            <h3>诗</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.poems">
                    <RouterLink :to="'/view?name=poems/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <h3>词</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.words">
                    <RouterLink :to="'/view?name=words/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
            <h3>曲</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.songs">
                    <RouterLink :to="'/view?name=songs/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
            <h3>书法</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.writings">
                    <RouterLink :to="'/view?name=writings/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
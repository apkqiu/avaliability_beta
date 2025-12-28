<script setup>
import { onMounted, ref, useTemplateRef } from 'vue';
import { urlarg } from '../utils';
import axios from 'axios';
import MarkdownIt from "markdown-it";
import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { ins } from "@mdit/plugin-ins";
import markdownQuote from 'markdown-it-quote';
import Comments from '../components/Comments.vue';
const name = ref();
const doccontent = useTemplateRef("content");
onMounted(async () => {
    name.value = urlarg('name');
    let content = await axios.get("/articles/news/" + name.value)
    const plugin_to_use = [
        footnote,
        align,
        markdownQuote,
        attrs,
        ins,
    ]

    const md = new MarkdownIt();
    for (const plugin of plugin_to_use) {
        md.use(plugin);
    }

    const html = md.render(content.data);

    doccontent.value.innerHTML = html;
})
</script>

<style scoped>
img {
    width: 80%;
    display: inline-block;
    image-orientation: from-image;
}

.list-group-item,
.list-group-item {
    background: transparent;

}

.list-group-item>a {
    text-decoration: none;
}
</style>
<template>
    <div class="row">
        <div class="col-md-8">
            <div style="backdrop-filter: blur(10px); padding: 10px">
                <div ref="content"></div>
                <br />
                <br />
                <hr />
                <Comments/>
            </div>
        </div>
        <div class="col-md-4" id="ads">
            <h4>人人关注</h4>
            <ul class="list-group list-group-flush" id="recommend"></ul>
            <div id="same_author">
                <h4>同作者的其他文章</h4>
                <ul class="list-group list-group-flush" id="same_author_list"></ul>
            </div>
        </div>
    </div>
</template>
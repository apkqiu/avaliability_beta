<script setup lang="jsx">
import { onMounted, ref, useTemplateRef } from 'vue';
import { urlarg, root } from '../utils';
import axios from 'axios';
import MarkdownIt from "markdown-it";
import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { ins } from "@mdit/plugin-ins";
import markdownQuote from 'markdown-it-quote';
import Comments from '../components/Comments.vue';
import * as pdfRenderer from '../lib/PdfRenderer.js';
import $ from 'jquery';
const doccontent = useTemplateRef("content");
onMounted(async () => {

    // normal document ## from articles/news
    var name = urlarg('name');
    if(name){
        let content = await axios.get(`${root}/articles/${name}`);
        let html = content.data;
        if (name.endsWith('.md')) {
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
            
            html = md.render(html);
        }
        doccontent.value.innerHTML = html;
    }
    // pdf document ## from ref/pdf
    var pdf = urlarg('pdf');
    if(pdf){
        var container = $("<div></div>");
        $(`
        <select>
            <option value="1">1. 较低质量</option>
            <option value="2" selected>2. 一般质量</option>
            <option value="3">3. 稍高质量</option>
            <option value="4">4. 较高质量</option>
            <option value="5">5. 准高质量</option>
            <option value="6">6. 超高质量</option>
            <option value="7">7. 极高质量</option>
            <option value="8">8. 最高质量</option>
        </select>
        `).change((e)=>{
            var value = $(e.target).val();
            pdfRenderer.renderIntoContainer(container[0], `${root}/res/pdf/zhoubao${pdf}.pdf`, {scale:parseFloat(value)});
        }).appendTo(doccontent.value);
        ;

        pdfRenderer.renderIntoContainer(container[0], `${root}/res/pdf/zhoubao${pdf}.pdf`, {scale:1});
        container.appendTo(doccontent.value);
    }
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
                <Comments />
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
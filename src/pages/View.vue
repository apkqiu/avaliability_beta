<script setup lang="js">
import { onMounted, ref, useTemplateRef } from 'vue';
import { Url, WebFile } from '../utils';
import MarkdownIt from "markdown-it";
import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { ins } from "@mdit/plugin-ins";
import markdownQuote from 'markdown-it-quote';
import Comments from '../components/Comments.vue';
import $ from 'jquery';
import { popular } from '../web_data.js';
import PdfViewer2 from '../components/PdfViewer2.vue';
import PdfViewer from '../components/PdfViewer.vue';
const doccontent = useTemplateRef("content");
const lg_img_src = ref('');
const preview = useTemplateRef("preview");
const pdf_src = ref('');
definePage({ meta: { title: "文章详情" } })
onMounted(async () => {
    doccontent.value.addEventListener("DOMSubtreeModified", ()=>{
        

    })

    let bootstrap = await import("bootstrap"); //ensure bootstrap is loaded
    let { name, pdf } = Url.args();
    // normal document ## from articles/news
    if (name) {
        let html
        try {
            html = await WebFile.fetch("/articles/" + name);
        } catch (e) {
            html = "文章不存在"
        }
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
    if (pdf) {
        pdf_src.value = "/res/pdf/zhoubao" + pdf + ".pdf";
    }
    const preview_modal = new bootstrap.Modal(preview.value);

})
</script>

<style scoped>
#content :deep(img) {
    width: 100%;
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
    <div class="modal fade" ref="preview" tabindex="-1">
        <div class="modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header" style="height: 50px !important;">
                    <span>{{ lg_img_src.split('/').at(-1) }}</span>
                    &nbsp;
                    <a :href="lg_img_src" download>下载</a>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <img :src="lg_img_src"></img>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div style="backdrop-filter: blur(10px); padding: 10px">
                <PdfViewer :src="pdf_src" v-if="pdf_src" style="width:100%" :options="{ 'scale': 4 }" />
                <div ref="content" id="content" v-else></div>
                <br />
                <br />
                <hr />
                <Comments />
            </div>
        </div>
        <div class="col-md-4" id="ads">
            <h4>人人关注</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="name in Object.keys(popular)">
                    <RouterLink :to="`/View?name=${popular[name]}`" v-html="name"></RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
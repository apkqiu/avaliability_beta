<script setup>
import { onMounted, ref, useTemplateRef } from 'vue';
import { Url, WebFile } from '../lib/utils';
import { Modal } from 'bootstrap';
definePage({ meta: { title: "资料库" } });

const dir_items = ref([]);
const file_items = ref([]);
const dirname = ref("");
const obj_src = ref("");
const preview = useTemplateRef("preview")
function encode_(text) {
    return btoa(encodeURIComponent(text));
}
function decode_(text) {
    return decodeURIComponent(atob(text));
}
const web_root = "洽隐山房 · 资料库";

const res_dir = WebFile.public;
onMounted(async () => {
    let path = Url.arg("path") || encode_(web_root);
    dirname.value = decode_(path);
    let parts = dirname.value.split("/");
    let dir = res_dir;
    for (let i = 1; i < parts.length; i++) {
        if (parts[i] === "") continue;
        dir = dir[parts[i]];
    }
    for (let name in dir) {
        if (typeof dir[name] === "object") {
            dir_items.value.push(name);
        } else {
            file_items.value.push({ name, real: dir[name] });
        }
    }
})
</script>

<template>
    <div class="modal fade" ref="preview" tabindex="-1">
        <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
            <div class="modal-content" >
                <div class="modal-header" style="height: 50px !important;">
                    <span>{{ obj_src.split('/').at(-1) }}</span>
                    &nbsp;
                    <a :href="obj_src" download>下载</a>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <embed :src="obj_src" style="width: 100%; height: 100%; "></embed>
            </div>
        </div>
    </div>

    <h1>{{ dirname }} 的索引</h1>
    <hr>
    <div class="list-group">
        <RouterLink :to="`?path=${encode_(dirname.slice(0, dirname.lastIndexOf('/')))}`" class="list-group-item"
            v-if="dirname !== web_root">&lt;上级目录&gt;</RouterLink>
        <RouterLink :to="`?path=${encode_(dirname + '/' + item)}`" class="list-group-item" v-for="item in dir_items">{{
            item
        }}</RouterLink>
        <div class="list-group-item" v-for="item in file_items">
            <a href="javascript:void(0)" @click="obj_src = item.real; new Modal(preview).show()">{{ item.name
                }}</a>
        </div>
    </div>
</template>
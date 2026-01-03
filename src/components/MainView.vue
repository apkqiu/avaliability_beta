<script setup lang="js">
import { onMounted, useTemplateRef, ref, nextTick, watchEffect } from "vue";
import MainViewNavbar from "./MainViewNavbar.vue";
import { Color, Variable, WebDocument, WebFile } from "../utils";
import localforage from "localforage";
import $ from "jquery";
import Parallax from "parallax-js";
import { rgba } from "../csshelper";
const props = defineProps(["title"]);

function load(name, fallback) {
    if (typeof localStorage !== 'undefined')
        return localStorage.getItem(name) || fallback;
    return fallback;
}

const bglayers = ref([]);
// [{img: "/bg-1.jpg", deepth: 0.5}, ...]
const get_setting = () => {
    return {
        color: load("color", "#000000"),
        adv_bg: load("adv_bg", "true") === 'true' ? true : false,
        mode: load("dark", "true") === 'true' ? "dark" : 'light',
        imgbg: load("imgbg", "bg-1.jpg"),
        bgbrightness: parseInt(load("bgbrightness", "50")),
        coloropacity: parseInt(load("coloropacity", "0")),
    }
}
watchEffect(()=>{
    document.title = props.title + " | 洽隐山房";
})
const settings = ref({});
let parallax = null;
const update_style = (async (old_settings, new_settings) => {
    
    settings.value = new_settings;

    if (new_settings.mode === 'dark') {
        document.body.setAttribute("data-bs-theme", "dark");
    } else {
        document.body.setAttribute("data-bs-theme", "light");
    }
    await (async () => { // block 背景设置
        if (new_settings.adv_bg) {
            if (old_settings.imgbg === new_settings.imgbg) {
                return
            }
            if (new_settings.imgbg.startsWith('custom')) {
                // 自定义背景：图像存在localforage中
                let value = await localforage.getItem('imgbg')
                bglayers.value.splice(0, bglayers.value.length);
                bglayers.value.push({ img: value, depth: 0.4 });
            } else if (typeof WebFile.public.res.img.background[new_settings.imgbg] === 'string') {
                // 如果背景是单张图片，则直接添加
                bglayers.value.splice(0, bglayers.value.length);
                bglayers.value.push({ img: WebFile.root + "/res/img/background/" + new_settings.imgbg, deepth: 0.4 })
            } else {
                // 如果背景是多个图片，则加载deepth.json文件，根据深度添加图片
                let data = await WebFile.fetch("/res/img/background/" + new_settings.imgbg + "/deepth.json")
                bglayers.value.splice(0, bglayers.value.length);
                for (var i = 0; i < data.layers; i++) {
                    bglayers.value.push({ img: WebFile.root + "/res/img/background/" + new_settings.imgbg + "/" + (i + 1) + ".png", deepth: data.deepth[i] });
                }
            }

            nextTick(() => {
                if (parallax) parallax.destroy();
                parallax = new Parallax(document.getElementById("scene"))
            })
        } else {
            // 关闭了高级背景
            if (parallax) parallax.destroy();
            parallax = null;
        }
    })()

});
onMounted(() => {
    parallax = new Parallax(document.getElementById("scene"));
    Variable.watch(get_setting, update_style, {})
})
</script>

<template>
    <div style="
      position: fixed;
      left: 50vw;
      top: 50vh;
      right: 50vw;
      bottom: 50vh;
      transform: translate(-50%, -50%);
      width: 120vw;
      height: 120vh;
      overflow: hidden;
      z-index: -10;
    " v-show="settings.adv_bg">
        <ul id="scene">
            <li class="layer" :data-depth="deepth" v-for="{ deepth, img } in bglayers">
                <img style="height: 120vh; width: 120vw; object-fit: cover" :src="img" />
            </li>
        </ul>
    </div>
    <div ref="mask" style="min-height: 100vh;" :style="{
        background: rgba(
            (settings.bgbrightness >= 100 ? ',255' : ',0').repeat(3).substring(1),
            Math.abs(settings.bgbrightness - 100) / 100
        )
    }">
        <div ref="mainbody" style="min-height: 100vh; padding: 60px 0 0 0; overflow-x: hidden;" :style="{
            background: rgba(
                Color.hex2rgb(settings.color || '#000').join(','),
                settings.adv_bg ? settings.coloropacity / 100 : 1)
        }">
            <div style="min-height: calc(100vh - 58px); margin: 10px">
                <div style="padding-top: 70px; margin-top: -70px">
                    <slot />
                </div>
            </div>

            <div class="text-sm text-muted" style="backdrop-filter: blur(10px)">
                <small>
                    如果你要提供意见，请
                    <RouterLink to="/contact">联系我们</RouterLink>
                    <i>
                        <br />电话：13270463238 <br />邮箱:Caixukun11451489@outlook.com
                    </i>
                    <b> <br />版权所有 ©2025 洽隐山房，保留所有权利</b>
                </small>
            </div>
        </div>
    </div>
</template>
<script ></script>

<script setup lang="js">
import { onMounted, useTemplateRef, ref } from "vue";
import MainViewNavbar from "./MainViewNavbar.vue";
import { hex2rgb, check, root, } from "../utils";
import localforage from "localforage";
import $ from "jquery";
import Parallax from "parallax-js";
const props = defineProps(["title"]);

function load(name, fallback) {
    if (typeof localStorage !== 'undefined')
        return localStorage.getItem(name) || fallback;
    return fallback;
}
const scene = useTemplateRef("scene");

const bodybg = ref()
const maskbg = ref()
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
let current_settings = ref({});
let old_custom_img = "";
const update_style = (() => {
    // 在onMounted中设置document.title，确保只在客户端执行
    document.title = props.title + " | 洽隐山房";

    let settings = get_setting();
    if (settings.mode === 'dark') {
        document.body.setAttribute("data-bs-theme", "dark");
    } else {
        document.body.setAttribute("data-bs-theme", "light");
    }
    if (!settings.adv_bg) {
        bodybg.value = `rgba(${hex2rgb(settings.color).join(',')},1)`
    } else {
        if (settings.bgbrightness >= 100) {
            maskbg.value = `rgba(255,255,255,${(settings.bgbrightness - 100) / 100})`
        } else {
            maskbg.value = `rgba(0,0,0,${(100 - settings.bgbrightness) / 100})`
        }
        bodybg.value = `rgba(${hex2rgb(settings.color).join(',')},${settings.coloropacity / 100})`
        if (settings.imgbg.startsWith('custom')) {
            
            localforage.getItem('imgbg').then(function (value) {
                if(value === old_custom_img) return;
                old_custom_img = value;
                $(scene.value).empty();
                var box = $(`<li class="layer" data-depth="0.4" style="height: 100%; width: 100%"></li>`)
                var bg = $(`<img style="height: 100%; width: 100%; object-fit: cover"/>`)
                bg.attr("src", value);
                box.append(bg).appendTo(scene.value);

                new Parallax(scene.value);
            });
        } else if (settings.imgbg != current_settings.value.imgbg || settings.adv_bg != current_settings.value.adv_bg) {
            // 判断变化(1)的原因：如果imgbg变化，则重新加载背景，重置Parallax效果会导致画面闪烁
            // 判断变化(2)的原因：禁用高级背景会导致Parallax被删除，启用后需要重新加载
            $.get(root + "/res/img/background/" + settings.imgbg + "/deepth.json").then(function (data) {
                if (typeof data === 'string') {
                    $(scene.value).empty();
                    var box = $(`<li class="layer" data-depth="0.4" style="height: 100%; width: 100%"></li>`)
                    var bg = $(`<img style="height: 100%; width: 100%; object-fit: cover"/>`)
                    bg.attr("src", root + "/res/img/background/" + settings.imgbg);
                    box.append(bg).appendTo(scene.value);
                    new Parallax(scene.value);
                    return;
                }
                // we may change the scene
                var layers_count = data.layers;
                var img = data.img;
                var layers = [];
                for (var i = 0; i < layers_count; i++) {
                    layers.push({ img: root + "/res/img/background/" + settings.imgbg + "/" + (i + 1) + ".png", deepth: data.deepth[i] });
                }
                $(scene.value).empty();
                for (var i = 0; i < layers_count; i++) {
                    /*
                    <li class="layer" data-depth="0.4" style="height: 100%; width: 100%">
                        <img id="bg" style="height: 100%; width: 100%; object-fit: cover" />
                    </li>
                    */
                    var layer = $('<li class="layer" data-depth="' + layers[i].deepth + '" style="height: 100%; width: 100%"></li>');
                    var img = $('<img style="height: 100%; width: 100%; object-fit: cover" />');
                    img.attr('src', layers[i].img);
                    layer.append(img);
                    $(scene.value).append(layer);
                }
                new Parallax(scene.value);
            })
        }
    }
    current_settings.value = settings;
});
onMounted(update_style);
check(get_setting, update_style);
</script>

<template>
    <MainViewNavbar :title="props.title" />
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
    " v-if="current_settings.adv_bg">
        <ul style="height: 100%; width: 100%" ref="scene">
            <li class="layer" data-depth="0.4" style="height: 100%; width: 100%">
                <img style="height: 100%; width: 100%; object-fit: cover" ref="bg" />
            </li>
        </ul>
    </div>
    <div ref="mask" :style="`min-height: 100vh; background: ${maskbg};`">
        <div ref="mainbody"
            :style="`min-height: 100vh; padding: 60px 0 0 0; overflow-x: hidden; background: ${bodybg};`">
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
<script lang="ts"></script>

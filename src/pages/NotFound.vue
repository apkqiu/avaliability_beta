<script setup lang="js">
import { randbetween } from '../utils.js';
import {ref} from 'vue';
defineProps(["url"]);
const saying = ref("生大材，不遇其时，其势定衰。生平庸，不化其势，其性定弱。");
const more_sayings = [
  "进了一班，就不等于进了保险箱！",
  "首先，态度是最重要的，五班他们其实一点都不比你们差，学习态度一个比一个认真。",
  "不要被周恩来班的光环，闪瞎了眼！",
  "你有没有抄吴琼（无穷）的作业？",
  "我教你们发面，你们做馒头花卷，可总有几个人，发面不会做，就开始做各种各样的糕点。",
  "我对你们客气，你们把我当福气了是吧！",
  "生大材，不遇其时，其势定衰。生平庸，不化其势，其性定弱。"
]
function change_saying(event){
  var selected = more_sayings[randbetween(0, more_sayings.length - 1)];
  event.target.disabled = true;
  
  // typewrite
  saying.value = "";
  for (var i = 0; i < selected.length; i++) {
    (function(index) {
      setTimeout(function() {
        saying.value += selected[index];
      }, 30 * index);
    })(i);
  }
  setTimeout(function() {
    event.target.disabled = false;
  }, 30 * selected.length);
}
</script>
<script lang="ts">
</script>
<template>
  <div class="not-found">
    <h1>404</h1>
    <p><strong>文件不存在</strong></p>

    <p>
      在此地址配置的站点不包含请求的文件。
    </p>

    <button class="btn btn-sm" @click="change_saying" >换一换</button><p>{{ saying }}</p>

  </div>
</template>
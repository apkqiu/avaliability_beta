<style>
    .pdf-text{
        color:transparent;
        font-size: 1px;
        position: absolute;
        font-family: serif;
    }
</style>
<script setup>
import Pdf from '../../components/PdfViewer2.vue';
definePage({
    meta: {
        title: "PDF渲染测试"
    },
})

</script>
<template>
    <h1>PDF渲染测试</h1>
    <Pdf src="/res/compressed.tracemonkey-pldi-09.pdf"></Pdf>
</template>
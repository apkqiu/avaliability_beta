<script setup>
definePage({
    alias: ["/test"],
    meta: {
        title: "测试"
    },
})
</script>
<template>
    <h1>测试</h1>
    <RouterLink to="/test/pdf">PDF渲染测试</RouterLink><br>
</template>
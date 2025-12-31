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
<script setup>
    import Reserved from '../components/Reserved.vue'
    definePage({ meta: { title: "学生创作" } })

</script>
<template>
    <Reserved hasnew="true" old="/text"/>
    <div id="students_text"></div>
    <div class="row">
        <div class="col-md-6">
            <h3>诗</h3>
            <ul class="list-group list-group-flush" id="sp"></ul>
        </div>
        <div class="col-md-6">
            <h3>词</h3>
            <ul class="list-group list-group-flush" id="sw"></ul>
            <h3>曲</h3>
            <ul class="list-group list-group-flush" id="ss"></ul>
            <h3>书法</h3>
            <ul class="list-group list-group-flush" id="sc"></ul>
        </div>
    </div>
</template>
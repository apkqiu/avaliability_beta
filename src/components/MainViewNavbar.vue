<script setup>
const props = defineProps(["title"])
const urls = {
    "首页":"/",
    "新闻":"/news",
    "文学创作": "/text",
    "自制网页": "/webmaker",
    "设置": "/settings",
    "小游戏": "/games",
    "资料库": "/resource",
}
</script>

<template>
    <nav class="navbar navbar-expand-sm" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1001;
      backdrop-filter: blur(10px);
    ">
        <div class="container-fluid">
            <span>{{ props.title }}</span>
            <ul class="navbar-nav me-auto hide_on_mobile">
                <li class="nav-item" v-for="name in Object.keys(urls)">
                    <RouterLink class="nav-link" :to="urls[name]">{{name}}</RouterLink>
                </li>
            </ul>
            <div class="d-flex">
                <button class="btn" type="button" @click="new bootstrap.Offcanvas('#offcanvas').show()">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
    </nav>
    <div class="offcanvas offcanvas-end " id="offcanvas" tabindex="-1">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title">搜索</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <h3>导航</h3>
            <div class="list-group">
                <RouterLink class="list-group-item" v-for="name in Object.keys(urls)" :to="urls[name]">{{name}}</RouterLink>
            </div>
            <br />
            <h3>搜索</h3>
            <ul class="list-group">
                <li class="input-group clearfix">
                    <input type="text" class="form-control" placeholder="搜索" oninput="search()" />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="search()">
                        搜索
                    </button>
                </li>
                <div></div>
            </ul>
        </div>
    </div>
</template>

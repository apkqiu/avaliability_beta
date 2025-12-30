<script setup>
const props = defineProps(["title"])

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
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/">首页</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/news">新闻</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/text">文学创作</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/web_maker">自制网页</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/account">设置</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/game">小游戏</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/resource">资料库</RouterLink>
                </li>
            </ul>
            <div class="d-flex">
                <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">
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
                <RouterLink class="list-group-item" to="/">首页</RouterLink>
                <RouterLink class="list-group-item" to="/text">文学创作</RouterLink>
                <RouterLink class="list-group-item" to="/web_maker">自制网页</RouterLink>
                <RouterLink class="list-group-item" to="/account">设置</RouterLink>
                <RouterLink class="list-group-item" to="/news">新闻</RouterLink>
                <RouterLink class="list-group-item" to="/game">小游戏</RouterLink>
                <RouterLink class="list-group-item" to="/resource">资料库</RouterLink>
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

<script setup>
import { onMounted} from 'vue';
import { nav } from '../web_data';
import { Menu, MenuItem } from 'view-ui-plus';
const props = defineProps(["title"])

let bootstrap;
let offcanvas;
onMounted(async () => {
    bootstrap = await import("bootstrap")
    offcanvas = new bootstrap.Offcanvas('#offcanvas');
})

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
                <li class="nav-item" v-for="name in Object.keys(nav)">
                    <RouterLink class="nav-link" :to="nav[name]">{{ name }}</RouterLink>
                </li>
            </ul>
            <div class="d-flex">
                <button class="btn" type="button" @click="offcanvas.show()">
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
                <RouterLink class="list-group-item" v-for="name in Object.keys(nav)" :to="nav[name]" @vue:before-update="offcanvas.hide()">{{ name }}
                </RouterLink>
            </div>
            <br />
            
        </div>
    </div>
</template>

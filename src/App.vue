<script setup>
import MainView from './components/MainView.vue';
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import MainViewNavbar from './components/MainViewNavbar.vue';
onMounted(async () => {
  await import("bootstrap") // 为什么呢？
})

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", console.clear);
  import.meta.hot.on("vite:beforeFullReload", console.clear);
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <MainViewNavbar :title="route.meta.title || route.name" />
    <MainView :title="route.meta.title || route.name">
      <Transition mode="out-in">
        <div :key="route.fullPath">
          <component :is="Component" />
        </div>
      </Transition>
    </MainView>
  </RouterView>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }

  /* 40% {
    transform: translateY(100px);
    opacity: 0;
  } */

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;

  }
}

.v-enter-active {
  animation: fadeIn 0.3s ease-out;
}

.v-leave-active {
  opacity: 0;
  animation: fadeOut 0.2s ease-out;
}
</style>

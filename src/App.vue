<script setup>
import MainView from './components/MainView.vue';
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
onMounted(async () => {
  await import("bootstrap") // 为什么呢？
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <component :is="route.meta.view || MainView" :title="route.meta.title || route.name">
      <Transition mode="out-in">
        <div :key="route.fullPath">
          <component :is="Component" />
        </div>
      </Transition>
    </component>
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

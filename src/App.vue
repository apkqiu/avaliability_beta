<script setup lang="ts">
import MainView from './components/MainView.vue';
import { RouterView } from 'vue-router';
import { ref, signal, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
const key = ref(Number.MIN_SAFE_INTEGER)
const ikey = ref(Number.MIN_SAFE_INTEGER)
onMounted(async()=>{
  await import("bootstrap") // 为什么呢？
})
</script>

<template>
  <client-only>
    <RouterView v-slot="{ Component, route }">
      <component :is="route.meta.view || MainView" :title="route.meta.title || route.name" :key="key">
        <Transition mode="out-in">
          <div :key="route.fullPath + ikey">
            <component :is="Component" />
          </div>
        </Transition>
      </component>
    </RouterView>
  </client-only>
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

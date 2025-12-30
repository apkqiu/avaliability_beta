<script setup lang="ts">
import MainView from './components/MainView.vue';
import { RouterView } from 'vue-router';
import { chooseRandom, randbetween } from './utils';
import { onMounted, ref } from 'vue';
const key = ref(BigInt(0))
const ikey = ref(BigInt(0))

</script>

<template>
  <client-only>
  <RouterView v-slot="{ Component, route }" >
    <MainView :title="route.name" :key="key">
      故障排除
      <button onclick="window.location.reload()" class="btn btn-sm">硬刷新</button>
      <button @click="key++" class="btn btn-sm">软刷新（页面）</button>
      <button @click="ikey++" class="btn btn-sm">软刷新（框架）</button>
      <Transition mode="fade">
        <div :key="route.fullPath+ikey">
          <component :is="Component" />
        </div>
      </Transition>
    </MainView>
  </RouterView>
  </client-only>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }

  40% {
    transform: translateY(100px);
    opacity: 0;
  }

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
  animation: fadeIn 0.5s ease-out;
}

.v-leave-active {
  opacity: 0;
  animation: fadeOut 0.2s ease-out;
}
</style>

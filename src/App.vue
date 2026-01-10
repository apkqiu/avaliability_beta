<script setup>
import MainView from './components/MainView.vue';
import { RouterView } from 'vue-router';
import MainViewNavbar from './components/MainViewNavbar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", console.clear);
  import.meta.hot.on("vite:beforeFullReload", console.clear);
}
const spinner = ref();
const errors = ref()
const router = useRouter()
let last_timeout = null;
router.beforeEach((to, from) => {
  if (last_timeout) clearTimeout(last_timeout)
  last_timeout = setTimeout(() => {
    spinner.value = true;
  }, 300);
  return true;
})
router.afterEach((to, from, failure) => {
  clearTimeout(last_timeout);
  last_timeout = null;
  if (failure) {
    errors.value = failure;
    return
  }
  errors.value = "";
  spinner.value = false;
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <MainViewNavbar title="洽隐山房" />
    <Suspense>
      <MainView :title="route.meta.title || route.name">
        <Transition mode="out-in">
          <Suspense>
            <template #default>
              <div :key="route.fullPath" v-if="!spinner">
                <component :is="Component" />
              </div>
              <div :key="route.fullPath + 'spinner'" v-else>
                <div class="spinner-border"></div>
                <div v-html="errors"></div>
              </div>

            </template>
            <template #fallback>
              <div class="spinner-border"></div>
            </template>
          </Suspense>
        </Transition>
      </MainView>
    </Suspense>
  </RouterView>
  <div class="modal fade " id="loading" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
        </div>
      </div>
    </div>
  </div>
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


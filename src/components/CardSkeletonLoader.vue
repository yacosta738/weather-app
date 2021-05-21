<template>
  <div class="w-full p-2">
    <a href="/"
       class="flex flex-col relative w-full bg-secondary overflow-hidden card translate-3d-none-after relative w-full bg-white overflow-hidden card translate-3d-none-after rounded border border-gray-300">
      <div class="relative group text-primary" style="padding-top: 70%">
        <div class="absolute top-0 left-0 h-full w-full"><span
            class="skeleton-box group-hover:scale-110 transition-transform transform-center block h-full"></span></div>
      </div>
      <div class="flex flex-col flex-grow">
        <div class="pl-4 pr-4 pt-4 mb-4 text-left relative flex-grow">
          <h3
              class="text-lg font-bold text-gray-darkest mr-10"><span
              class="skeleton-box h-5 w-1/6 inline-block"></span>
            <span class="skeleton-box h-5 w-1/2 inline-block"></span>
            <span class="skeleton-box h-5 w-2/4 inline-block"></span>
            <span class="skeleton-box h-5 w-2/5 inline-block"></span>
          </h3>
        </div>
      </div>
    </a>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({})
export default class CardSkeletonLoader extends Vue {}
</script>

<style lang="scss" scoped>

.skeleton-box {
  position: relative;
  overflow: hidden;
  @apply bg-secondary;

&::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
    );
    animation: shimmer 3s infinite;
    content: '';
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

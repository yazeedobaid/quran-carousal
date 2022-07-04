<script setup lang="ts">
import { ref, computed } from "vue";
import * as Icons from "@heroicons/vue/solid";
import { useMotion, slideLeft, slideRight } from "@vueuse/motion";
import ButtonComponent from "./components/ButtonComponent.vue";
import { useLocalStorage } from "./composables/useLocalStorage";
import { useQueryParam } from "./composables/useQueryParam";

const pageSelection = parseInt(useQueryParam("page", "1"));
const slideNumber = useLocalStorage("quran-carousal", 1);

if (pageSelection !== slideNumber.value) {
  slideNumber.value = pageSelection;
}

let carousal = ref<HTMLElement>();

function prevSlide() {
  if (slideNumber.value === 1) {
    return;
  }

  slideNumber.value--;
  useMotion(carousal, slideRight);
}

function nextSlide() {
  if (slideNumber.value === 604) {
    return;
  }

  slideNumber.value++;
  useMotion(carousal, slideLeft);
}

const imgUrl = computed(() => {
  let formattedSlideNumber = slideNumber.value.toString().padStart(3, "0");
  return new URL(
    `./assets/quran-pages/${formattedSlideNumber}.svg`,
    import.meta.url
  ).toString();
});
</script>

<template>
  <div
    class="flex h-full min-h-full w-screen flex-col items-center justify-between text-white md:flex-row md:justify-between"
  >
    <div class="hidden touch-manipulation md:block">
      <button-component @click="prevSlide">
        <Icons.ChevronLeftIcon class="h-10 w-10" />
      </button-component>
    </div>
    <div ref="carousal">
      <img class="bg-white fill-current text-gray-900" :src="imgUrl" />
    </div>
    <div class="hidden touch-manipulation md:block">
      <button-component @click="nextSlide">
        <Icons.ChevronRightIcon class="h-10 w-10" />
      </button-component>
    </div>
    <div class="fixed bottom-0 block flex w-full touch-manipulation md:hidden">
      <div class="flex w-1/2 justify-center">
        <button-component @click="prevSlide">
          <Icons.ChevronLeftIcon class="h-10 w-10" />
        </button-component>
      </div>
      <div class="flex w-1/2 justify-center">
        <button-component @click="nextSlide">
          <Icons.ChevronRightIcon class="h-10 w-10" />
        </button-component>
      </div>
    </div>
  </div>
</template>

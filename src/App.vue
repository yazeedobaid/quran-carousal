<script setup lang="ts">
import { ref, computed } from "vue";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/solid";
import { useMotion, slideRight, Variant } from "@vueuse/motion";
import ButtonComponent from "./components/ButtonComponent.vue";
import { useLocalStorage } from "./composables/useLocalStorage";
import { useQueryParam } from "./composables/useQueryParam";
import { onKeyStroke } from "@vueuse/core";

const pageSelection = useQueryParam("page");
const slideNumber = useLocalStorage("quran-carousal", 1);

if (pageSelection && pageSelection !== slideNumber.value) {
  slideNumber.value = parseInt(pageSelection);
}

let carousal = ref<HTMLElement>();
let carousalMotion = useMotion(carousal, slideRight);

function prevSlide() {
  if (slideNumber.value === 1) {
    return;
  }

  slideNumber.value--;
  carousalMotion.stop()
  carousalMotion.apply(slideRight.enter as Variant)
}

async function nextSlide() {
  if (slideNumber.value === 604) {
    return;
  }

  slideNumber.value++;
  carousalMotion.stop()
  await carousalMotion.apply(slideRight.initial as Variant)
  await carousalMotion.apply(slideRight.enter as Variant)
}

const imgUrl = computed(() => {
  let formattedSlideNumber = slideNumber.value.toString().padStart(3, "0");
  return new URL(
    `./assets/quran-pages/${formattedSlideNumber}.svg`,
    import.meta.url
  ).toString();
});

onKeyStroke('ArrowLeft', prevSlide)
onKeyStroke('ArrowRight', nextSlide)
</script>

<template>
  <div
    class="flex h-full min-h-full w-screen flex-col items-center justify-between text-white md:flex-row md:justify-between"
  >
    <div class="hidden touch-manipulation md:block">
      <button-component @click="prevSlide">
        <ChevronLeftIcon class="h-10 w-10" />
      </button-component>
    </div>
    <div ref="carousal">
      <img class="bg-white fill-current text-gray-900" :src="imgUrl"  :alt="'quran page' + slideNumber"/>
    </div>
    <div class="hidden touch-manipulation md:block">
      <button-component @click="nextSlide">
        <ChevronRightIcon class="h-10 w-10" />
      </button-component>
    </div>
    <div class="fixed bottom-0 block flex w-full touch-manipulation md:hidden">
      <div class="flex w-1/2 justify-center">
        <button-component @click="prevSlide">
          <ChevronLeftIcon class="h-10 w-10" />
        </button-component>
      </div>
      <div class="flex w-1/2 justify-center">
        <button-component @click="nextSlide">
          <ChevronRightIcon class="h-10 w-10" />
        </button-component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import * as Icons from '@heroicons/vue/solid'
import {useMotion, slideLeft, slideRight} from '@vueuse/motion'
import ButtonComponent from './components/ButtonComponent.vue'
import {useLocalStorage} from './composables/useLocalStorage'
import {useQueryParam} from './composables/useQueryParam'

const pageSelection = parseInt(useQueryParam('page', '1'))
const slideNumber = useLocalStorage('quran-carousal', 1)

if (pageSelection !== slideNumber.value) {
  slideNumber.value = pageSelection
}

let carousal = ref<HTMLElement>()

function prevSlide() {
  if (slideNumber.value === 1) {
    return
  }

  slideNumber.value--
  useMotion(carousal, slideRight)
}

function nextSlide() {
  if (slideNumber.value === 604) {
    return
  }

  slideNumber.value++
  useMotion(carousal, slideRight)
}

const imgUrl = computed(() => {
  let formattedSlideNumber = slideNumber.value.toString().padStart(3, '0')
  return new URL(`./assets/quran-pages/${formattedSlideNumber}.svg`, import.meta.url).toString()
})

</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen text-white md:flex-row md:justify-between">
    <div class="hidden md:block">
      <button-component @click="prevSlide">
        <Icons.ChevronLeftIcon class="h-10 w-10"/>
      </button-component>
    </div>
    <div ref="carousal" class="w-screen md:h-screen md:flex-1">
      <img class="inset-0 w-full h-screen fill-current bg-white text-gray-900" :src="imgUrl"/>
    </div>
    <div class="hidden md:block">
      <button-component @click="nextSlide">
        <Icons.ChevronRightIcon class="h-10 w-10"/>
      </button-component>
    </div>
    <div class="block md:hidden flex w-full">
      <div class="bg-gray-100 w-1/2 flex justify-center">
        <button-component @click="prevSlide">
          <Icons.ChevronLeftIcon class="h-10 w-10"/>
        </button-component>
      </div>
      <div class="bg-gray-100 w-1/2 flex justify-center">
        <button-component @click="nextSlide">
          <Icons.ChevronRightIcon class="h-10 w-10"/>
        </button-component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as Icons from '@heroicons/vue/solid'
import { useMotion, slideLeft, slideRight } from '@vueuse/motion'
import { CarousalDirection } from './types/CarousalDirection'
import ButtonComponent from './components/ButtonComponent.vue'
import { useLocalStorage } from './composables/useLocalStorage'

const slideNumber = useLocalStorage('quran-carousal', 1)

let direction = ref<CarousalDirection>(CarousalDirection.Increasing)
let carousal = ref<HTMLElement>()

function prevSlide(){
  if(slideNumber.value === 1) {
    return
  }

  direction.value = CarousalDirection.Decreasing
  slideNumber.value--
  useMotion(
    carousal,
    direction.value === CarousalDirection.Increasing ? slideLeft : slideRight
  )
}

function nextSlide(){
  if(slideNumber.value === 604) {
    return
  }

  direction.value = CarousalDirection.Increasing
  slideNumber.value++
  useMotion(
    carousal,
    direction.value === CarousalDirection.Increasing ? slideLeft : slideRight
  )
}

const imgUrl = computed(() => {
  let formattedSlideNumber = slideNumber.value.toString().padStart(3, '0')
  return new URL(`./assets/quran-pages/${formattedSlideNumber}.svg`, import.meta.url)
})

</script>

<template>
  <div class="flex justify-between items-center min-h-screen text-white">
    <div>
      <button-component @click="prevSlide">
        <Icons.ChevronLeftIcon class="h-10 w-10" />
      </button-component>
    </div>
    <div class="flex flex-1 items-center justify-center min-h-screen overflow-hidden">
      <div  ref="carousal"
            class="flex items-center justify-center min-h-screen w-full overflow-hidden">
        <img
          class="fill-current bg-white text-gray-900 w-full h-screen"
          :class="slideNumber % 2 != 0 ? 'ml-[120px]' : ''" 
          :src="imgUrl" 
        />
      </div>
    </div>
    <div>
      <button-component @click="nextSlide">
        <Icons.ChevronRightIcon class="h-10 w-10" />
      </button-component>
    </div>
    <div>
  </div>
    
  </div>  
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <button
      class="text-green-200 cursor-pointer md:min-h-screen hover:text-green-400 flex-1 flex justify-center items-center outline-none focus:bg-green-100 active:bg-green-100"
      @click="$emit('click')">
    <slot/>
  </button>
</template>
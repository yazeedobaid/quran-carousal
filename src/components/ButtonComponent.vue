<script setup lang="ts">
defineEmits(["click"]);
</script>

<template>
  <button
    class="flex flex-1 cursor-pointer items-center justify-center text-green-200 outline-none hover:text-green-400 focus:bg-green-100 active:bg-green-100 md:min-h-screen"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

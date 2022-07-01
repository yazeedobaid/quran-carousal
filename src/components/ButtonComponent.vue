<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
<button 
    class="min-h-screen text-gray-300 cursor-pointer hover:text-gray-400" 
    @click="$emit('click')"
>
    <slot  />
</button>
</template>
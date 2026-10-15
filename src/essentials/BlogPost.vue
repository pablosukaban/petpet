<script setup lang="ts">
defineProps<{ title: string }>();
defineEmits<{
  "enlarge-text": [];
}>();
</script>

<template>
  <h4>{{ title }}</h4>
  <button v-on:click="$emit('enlarge-text')">make bigger</button>
</template>

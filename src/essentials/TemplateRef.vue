<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";

const inpRef = useTemplateRef("inputRef");
// const inputRef = ref(null)

onMounted(() => {
  inpRef.value?.focus();
});
</script>

<template>
  <div>
    <input ref="inputRef" />
  </div>
</template>

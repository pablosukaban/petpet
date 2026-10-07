<script setup lang="ts">
import ChildComponent from "./ChildComponent.vue";

const isActive = true;
</script>

<template>
  <ChildComponent class="baz" :class="{ active: isActive }" />
</template>

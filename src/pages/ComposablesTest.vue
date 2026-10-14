<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import { useMouseCoords } from "@/composables/useMouseCoords";

const { x, y } = useMouseCoords();
</script>

<template>
  <PageComponent> Mouse position is at: {{ x }}, {{ y }} </PageComponent>
</template>

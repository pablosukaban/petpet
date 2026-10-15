<script setup lang="ts">
import { useId } from "vue";

defineOptions({ inheritAttrs: false });
const model = defineModel<string>({ required: true });

const id = useId();

defineProps<{
  label?: string;
  error?: string;
}>();
</script>

<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id
      v-model="model"
      v-bind="$attrs"
      :aria-invalid="!!error"
      :aria-describedby="!!error ? `${id}-err` : undefined"
    />
    <p v-if="error" :id="`${id}-err`">{{ error }}</p>
  </div>
</template>

<style scoped></style>

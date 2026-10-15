<script setup lang="ts">
import { useId } from "vue";

defineOptions({ inheritAttrs: false });
const model = defineModel<string>({ required: true });

const id = useId();

defineProps<{ label?: string; error?: string }>();
</script>

<template>
  <div class="field">
    <label v-if="label" class="field__label" :for="id">{{ label }}</label>
    <input
      :id
      class="field__input"
      v-model="model"
      v-bind="$attrs"
      :aria-invalid="!!error"
      :aria-describedby="!!error ? `${id}-err` : undefined"
    />
    <p v-if="error" :id="`${id}-err`" class="field__error">{{ error }}</p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-heading);
}

.field__input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border-hover);
  border-radius: 8px;
  background: var(--color-background-soft);
  color: var(--color-text);
  font: inherit;
  font-size: 16px; /* меньше 16px — iOS зумит страницу при фокусе */
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.field__input::placeholder {
  color: var(--vt-c-text-light-2);
}

.field__input:focus {
  outline: none;
  border-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 0 0 3px hsla(160, 100%, 37%, 0.2);
}

/* aria-invalid уже ставится при ошибке — используем его как селектор, отдельный класс не нужен */
.field__input[aria-invalid="true"] {
  border-color: #e5484d;
}

.field__input[aria-invalid="true"]:focus {
  box-shadow: 0 0 0 3px rgba(229, 72, 77, 0.2);
}

.field__error {
  font-size: 13px;
  color: #e5484d;
}
</style>

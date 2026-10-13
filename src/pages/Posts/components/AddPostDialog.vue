<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

const title = ref("");
const body = ref("");

const emits = defineEmits<{
  addPost: [title: string, body: string];
}>();

const addModalRef = useTemplateRef("add-dialog");

const submit = () => {
  emits("addPost", title.value, body.value);
  addModalRef.value?.close();
  title.value = "";
  body.value = "";
};
</script>

<template>
  <button @click="addModalRef?.showModal()">add post</button>
  <dialog ref="add-dialog">
    <form @submit.prevent="submit">
      <input placeholder="title" v-model="title" required />
      <input placeholder="body" v-model="body" required />
      <button>confirm</button>
    </form>
  </dialog>
</template>

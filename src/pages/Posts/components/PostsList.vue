<script setup lang="ts">
import { useTemplateRef, computed } from "vue";
import type { Post } from "../types";
import AddPostDialog from "./AddPostDialog.vue";
import { useFetch } from "@/composables/useFetch";
import { debounce } from "@/utils";

const { searchQ, selectLimit = 10 } = defineProps<{
  selectLimit: number;
  searchQ: string;
}>();

const postsUrl = "https://jsonplaceholder.typicode.com/posts?";

const totalPostsCount = computed(() => posts.value?.length);
const urlWithParams = computed(() => {
  const params = new URLSearchParams();
  if (searchQ) {
    params.set("q", searchQ);
  }
  params.set("_limit", String(selectLimit));

  return postsUrl + params;
});

const addModalRef = useTemplateRef("add-dialog");

const { data: posts, error } = useFetch<Array<Post>>(urlWithParams);

const addPost = (title: string, body: string) => {
  const newPost: Post = {
    id: Date.now(),
    userId: 1,
    title: title,
    body: body,
  };

  posts.value?.push(newPost);
  addModalRef.value?.close();
};

const removePost = (id: number) => {
  console.log({ id });

  const isSure = confirm("u sure?");

  if (isSure) {
    posts.value = posts.value?.filter((p) => p.id !== id) ?? [];
  }
};
</script>

<template>
  <AddPostDialog @addPost="addPost" />
  <p v-if="error">Error...</p>
  <div class="list" v-else-if="totalPostsCount && totalPostsCount > 0">
    <p>Posts: {{ totalPostsCount }}</p>
    <div v-for="post in posts" :key="post.id">
      <slot name="post" :post :remove="removePost" />
    </div>
  </div>
  <p v-else-if='totalPostsCount === 0 && !error'>no posts(</p>
  <p v-else class="loading">Loading...</p>
</template>

<style lang="css" scoped>
.loading {
  color: #888;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

<script setup lang="ts">
import { debounce } from "@/utils";
import { ref, watch, onUnmounted, useTemplateRef, computed } from "vue";
import type { Post } from "../types";
import AddPostDialog from "./AddPostDialog.vue";

const { searchQ, selectLimit = 10 } = defineProps<{
  selectLimit: number;
  searchQ: string;
}>();

const postsUrl = "https://jsonplaceholder.typicode.com/posts?";

const posts = ref<Array<Post>>([]);
const isPostsLoading = ref(false);

const totalPostsCount = computed(() => posts.value.length);

const addModalRef = useTemplateRef("add-dialog");

const loadPosts = debounce(async (search: string, limit: number) => {
  const params = new URLSearchParams();
  if (search) {
    params.set("q", search);
  }
  params.set("_limit", String(limit));

  try {
    const response = await fetch(postsUrl + params);
    posts.value = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    isPostsLoading.value = false;
  }
}, 300);

const addPost = (title: string, body: string) => {
  const newPost: Post = {
    id: Date.now(),
    userId: 1,
    title: title,
    body: body,
  };

  posts.value.push(newPost);
  addModalRef.value?.close();
};

const removePost = (id: number) => {
  console.log({ id });

  const isSure = confirm("u sure?");

  if (isSure) {
    posts.value = posts.value.filter((p) => p.id !== id);
  }
};

watch(
  [() => searchQ, () => selectLimit],
  async ([search, limit]) => {
    isPostsLoading.value = true;
    loadPosts(search, limit);
  },
  { immediate: true },
);

onUnmounted(() => loadPosts.cancel());
</script>

<template>
  <AddPostDialog @addPost="addPost" />
  <p v-if="isPostsLoading" class="loading">Loading...</p>
  <div class="list" v-else-if="totalPostsCount > 0">
    <p>Posts: {{ totalPostsCount }}</p>
    <div v-for="post in posts" :key="post.id">
      <slot name="post" :post :remove="removePost" />
    </div>
  </div>
  <p v-else-if="!isPostsLoading && totalPostsCount === 0">Ошибочка</p>
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

<script setup lang="ts">
import type { Post } from "./types"

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="postContainer">
    <p class="title">{{ post.id }}. {{ post.title }}</p>
    <p class="body">{{ post.body }}</p>
    <p class="author">Author: {{ post.userId }}</p>
  </div>
</template>

<style scoped>
.postContainer {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.title {
  font-weight: 600;
  margin: 0 0 6px;
}

.body {
  margin: 0;
  line-height: 1.4;
}

.author {
  margin: 8px 0 0;
  font-size: 0.85em;
  color: #888;
}
</style>

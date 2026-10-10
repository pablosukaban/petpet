<script setup lang="ts">
import type { Post } from '../types'

defineProps<{
  post: Post
}>()
defineEmits<{
  removePost: [id: number]
}>()
</script>

<template>
  <div class="postContainer">
    <div class="header">
      <p class="title">
        <RouterLink :to="{ name: 'post', params: { id: post.id } }">
          {{ post.id }}. {{ post.title }}
        </RouterLink>
      </p>
      <button @click="$emit('removePost', post.id)">X</button>
    </div>
    <p class="body">{{ post.body }}</p>
    <p class="author">Author: {{ post.userId }}</p>
  </div>
</template>

<style scoped>
.postContainer {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.title {
  font-weight: 600;
  margin: 0;
}

.title a {
  color: inherit;
  text-decoration: none;
}

.title a:hover {
  text-decoration: underline;
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

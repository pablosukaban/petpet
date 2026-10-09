<script setup lang="ts">
import PostsListItem from './PostsListItem.vue';
import type { Post } from './types';

defineProps<{ posts: Array<Post> }>()
</script>

<template>
  <div class="list">
    <PostsListItem v-for="post in posts" :post :key="post.id" />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

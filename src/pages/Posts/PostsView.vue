<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import type { Post } from './types';
import PostsList from './PostsList.vue';
import { debounce } from '@/utils.ts';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts'

const posts = ref<Array<Post>>([])
const isLoading = ref(false)
const searchQ = ref('')

const loadPosts = debounce(
  async (search: string) => {
    isLoading.value = true

    try {
      const response = await fetch(`${postsUrl}?q=${search}`)
      posts.value = await response.json()
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  },
  300
)

watch(searchQ, async (search) => {
  loadPosts(search)
}, { immediate: true })

onUnmounted(() => loadPosts.cancel())
</script>

<template>
  <div class="page">
    <div class="pageHeader">
      <h1>Posts</h1>
      <input v-model="searchQ" placeholder="search posts" />
    </div>
    <p v-if="isLoading" class="loading">Loading...</p>
    <PostsList v-else-if="posts.length > 0" :posts />
    <p v-else>Ошибочка</p>
  </div>
</template>

<style scoped>
.pageHeader {
  margin-bottom: 8px;
}

.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
}

.loading {
  color: #888;
}
</style>

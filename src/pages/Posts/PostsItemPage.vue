<script setup lang="ts">
import type { Post } from './types'
import { ref, watch } from 'vue'

import { useRouter } from 'vue-router'

const props = defineProps<{ id: string }>()

const post = ref<Post>()
const isPostLoading = ref(false)
const isPostDeleting = ref(false)
const error = ref<string | null>(null)

const router = useRouter()

const getUrl = (id: string) => `https://jsonplaceholder.typicode.com/posts/${id}`

const loadPost = async (id: string) => {
  isPostLoading.value = true
  error.value = null
  post.value = undefined

  try {
    const response = await fetch(getUrl(id))
    if (!response.ok) {
      throw new Error(response.status === 404 ? 'Пост не найден' : `HTTP ${response.status}`)
    }
    post.value = await response.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    isPostLoading.value = false
  }
}

const deletePost = async (id: string): Promise<boolean> => {
  isPostDeleting.value = true

  try {
    const response = await fetch(getUrl(id), {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return true
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    return false
  } finally {
    isPostDeleting.value = false
  }
}

const handleRemove = async () => {
  const isSure = confirm('u sure?')

  if (!isSure || !post.value) {
    return
  }

  const isDeleted = await deletePost(String(post.value.id))

  if (isDeleted) {
    router.push({ name: 'posts' })
  }
}

watch(
  () => props.id,
  (id) => {
    loadPost(id)
  },
  { immediate: true },
)
</script>

<template>
  <div class="page">
    <RouterLink to="/posts" class="back">← Все посты</RouterLink>

    <p v-if="isPostLoading" class="loading">Loading...</p>
    <div v-else-if="error" class="error">
      <p>Ошибочка: {{ error }}</p>
      <button @click="loadPost(props.id)">Попробовать снова</button>
    </div>
    <article v-else-if="post" class="post">
      <div>
        <h1 class="title">{{ post.title }}</h1>
        <button @click="handleRemove" :disabled="isPostDeleting">X</button>
      </div>
      <p class="body">{{ post.body }}</p>
      <p class="author">Author: {{ post.userId }}</p>
    </article>
  </div>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
}

.back {
  display: inline-block;
  margin-bottom: 16px;
  color: #888;
  text-decoration: none;
}

.back:hover {
  color: inherit;
}

.loading {
  color: #888;
}

.error {
  padding: 12px 16px;
  border: 1px solid #f0b4b4;
  border-radius: 8px;
  background: #fdf0f0;
  color: #b42318;
}

.error p {
  margin: 0 0 8px;
}

.post {
  padding: 16px 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.title {
  margin: 0 0 12px;
  font-size: 1.5em;
  font-weight: 600;
}

.body {
  margin: 0;
  line-height: 1.5;
}

.author {
  margin: 16px 0 0;
  font-size: 0.85em;
  color: #888;
}
</style>

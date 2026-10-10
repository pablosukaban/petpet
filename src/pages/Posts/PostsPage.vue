<script setup lang="ts">
import { debounce } from '@/utils.ts'
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import PostsListItemComponent from './components/PostsListItemComponent.vue'
import type { Post, User } from './types.js'

const postsUrl = 'https://jsonplaceholder.typicode.com/posts?'
const usersUrl = 'https://jsonplaceholder.typicode.com/users'

const posts = ref<Array<Post>>([])
const users = ref<Array<User>>([])
const searchQ = ref('')
const selectLimit = ref(10)
const addTitle = ref('')
const addBody = ref('')

const isPostsLoading = ref(false)
const isUsersLoading = ref(false)

const addModalRef = useTemplateRef('add-dialog')

const addPost = () => {
  const newPost: Post = {
    id: Math.random() * 1000,
    userId: 1,
    title: addTitle.value,
    body: addBody.value,
  }

  posts.value.push(newPost)
  addModalRef.value?.close()
}

const removePost = (id: number) => {
  console.log({ id })

  const isSure = confirm('u sure?')

  if (isSure) {
    posts.value = posts.value.filter((p) => p.id !== id)
  }
}

const loadUsers = async () => {
  isUsersLoading.value = true

  try {
    const response = await fetch(usersUrl)
    users.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    isUsersLoading.value = false
  }
}

const loadPosts = debounce(async (search: string, limit: number) => {
  const params = new URLSearchParams()
  if (search) {
    params.set('q', search)
  }
  params.set('_limit', String(limit))

  try {
    const response = await fetch(postsUrl + params)
    posts.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    isPostsLoading.value = false
  }
}, 300)

watch(
  [searchQ, selectLimit],
  async ([search, limit]) => {
    isPostsLoading.value = true
    loadPosts(search, limit)
  },
  { immediate: true },
)

onMounted(() => {
  loadUsers()
})

onUnmounted(() => loadPosts.cancel())
</script>

<template>
  <div class="page">
    <div class="pageHeader">
      <h1>Posts</h1>
      <input v-model="searchQ" placeholder="search posts" />
      <select v-model="selectLimit">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
      <button @click="addModalRef?.showModal()">add post</button>
      <dialog ref="add-dialog">
        <form @submit.prevent="addPost">
          <input placeholder="title" v-model="addTitle" required />
          <input placeholder="body" v-model="addBody" required />
          <button>confirm</button>
        </form>
      </dialog>
    </div>
    <p v-if="isPostsLoading" class="loading">Loading...</p>
    <div class="list" v-else-if="posts.length > 0">
      <PostsListItemComponent
        v-for="post in posts"
        :post
        :key="post.id"
        @remove-post="removePost"
      />
    </div>
    <p v-else-if="!isPostsLoading && posts.length === 0">Ошибочка</p>
  </div>
</template>

<style scoped>
.pageHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.pageHeader h1 {
  flex-basis: 100%;
  font-weight: 600;
}

.pageHeader input {
  flex: 1;
  min-width: 0;
}

.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
}

.loading {
  color: #888;
}

select {
  margin-left: auto;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

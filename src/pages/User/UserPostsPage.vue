<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { computed } from "vue";
import type { Post } from "../../types";

const props = defineProps<{ id: string }>();

const postsUrl = computed(() => `https://jsonplaceholder.typicode.com/posts?userId=${props.id}`);

const { data: posts, error } = useFetch<Array<Post>>(postsUrl);
</script>

<template>
  <p v-if="error" class="error">Не удалось загрузить посты: {{ error.message }}</p>
  <p v-else-if="!posts" class="muted">Loading...</p>
  <p v-else-if="!posts.length" class="muted">У пользователя пока нет постов</p>
  <ul v-else class="postList">
    <li v-for="post in posts" :key="post.id">
      <RouterLink :to="{ name: 'post', params: { id: post.id } }" class="postLink">
        <span class="postTitle">{{ post.title }}</span>
        <span class="postBody">{{ post.body }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.muted {
  color: #888;
}

.error {
  padding: 12px 16px;
  border: 1px solid rgb(240 68 56 / 0.4);
  border-radius: 8px;
  background: rgb(240 68 56 / 0.08);
  color: #e5484d;
}

.postList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.postLink {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: inherit;
}

.postLink:hover {
  border-color: var(--color-border-hover);
  background: var(--color-background-soft);
}

.postTitle {
  font-weight: 600;
  color: var(--color-heading);
}

.postTitle::first-letter {
  text-transform: uppercase;
}

/* превью тела поста в две строки */
.postBody {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  color: #888;
  font-size: 0.9em;
  line-height: 1.5;
}
</style>

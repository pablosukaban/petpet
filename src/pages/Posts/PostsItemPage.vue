<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import PageComponent from "@/components/PageComponent.vue";
import type { Comment, Post } from "./types";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "./usersStore";

import { useRouter } from "vue-router";

const props = defineProps<{ id: string }>();

const isPostDeleting = ref(false);

const { data: post, error: postError } = useFetch<Post>(
  () => `https://jsonplaceholder.typicode.com/posts/${props.id}`,
);

const { data: comments, error: commentsError } = useFetch<Array<Comment>>(
  () => `https://jsonplaceholder.typicode.com/comments?postId=${props.id}`,
);

const usersStore = useUsersStore();
const { getUserById } = storeToRefs(usersStore);
const author = computed(() => (post.value ? getUserById.value(post.value.userId) : undefined));

onMounted(() => usersStore.fetchUsers());

const router = useRouter();

const getPostUrl = (id: string) => `https://jsonplaceholder.typicode.com/posts/${id}`;

const deletePost = async (id: string): Promise<boolean> => {
  isPostDeleting.value = true;

  try {
    const response = await fetch(getPostUrl(id), {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return true;
  } catch (e) {
    console.error(e);
    return false;
  } finally {
    isPostDeleting.value = false;
  }
};

const handleRemove = async () => {
  const isSure = confirm("u sure?");

  if (!isSure || !post.value) {
    return;
  }

  const isDeleted = await deletePost(String(post.value.id));

  if (isDeleted) {
    router.push({ name: "posts" });
  }
};
</script>

<template>
  <PageComponent>
    <RouterLink :to="{ name: 'posts' }" class="back">← Все посты</RouterLink>

    <div v-if="postError" class="error">
      <p>Ошибочка: {{ postError }}</p>
    </div>
    <article v-else-if="post" class="post">
      <header class="postHeader">
        <h1 class="title">{{ post.title }}</h1>
        <button
          class="remove"
          @click="handleRemove"
          :disabled="isPostDeleting"
          title="Удалить пост"
        >
          {{ isPostDeleting ? "…" : "✕" }}
        </button>
      </header>
      <p class="body">{{ post.body }}</p>
      <p class="author">
        Author:
        <RouterLink v-if="author" :to="{ name: 'user', params: { id: author.id } }">
          {{ author.name }}
        </RouterLink>
        <span v-else>#{{ post.userId }}</span>
      </p>
    </article>
    <p v-else class="loading">Loading...</p>

    <section class="comments">
      <h2 class="commentsTitle">
        Комментарии
        <span v-if="comments" class="count">{{ comments.length }}</span>
      </h2>

      <div v-if="commentsError" class="error">
        <p>Ошибочка: {{ commentsError }}</p>
      </div>
      <p v-else-if="!comments" class="loading">Loading...</p>
      <p v-else-if="!comments.length" class="loading">Комментариев пока нет</p>
      <ul v-else class="commentList">
        <li v-for="comment in comments" :key="comment.id" class="comment">
          <div class="commentHeader">
            <span class="commentName">{{ comment.name }}</span>
            <a class="commentEmail" :href="`mailto:${comment.email}`">{{ comment.email }}</a>
          </div>
          <p class="commentBody">{{ comment.body }}</p>
        </li>
      </ul>
    </section>
  </PageComponent>
</template>

<style scoped>
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
  border: 1px solid rgb(240 68 56 / 0.4);
  border-radius: 8px;
  background: rgb(240 68 56 / 0.08);
  color: #e5484d;
}

.error p {
  margin: 0;
}

.post {
  padding: 20px 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background-soft);
}

.postHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.title {
  margin: 0;
  font-size: 1.5em;
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-heading);
}

.title::first-letter {
  text-transform: uppercase;
}

.remove {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: transparent;
  color: #888;
  cursor: pointer;
}

.remove:hover:not(:disabled) {
  border-color: rgb(240 68 56 / 0.5);
  color: #e5484d;
}

.remove:disabled {
  cursor: wait;
  opacity: 0.6;
}

.body {
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
}

.author {
  margin: 16px 0 0;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  font-size: 0.85em;
  color: #888;
}

.author a {
  color: inherit;
  font-weight: 600;
}

.comments {
  margin-top: 32px;
}

.commentsTitle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  font-size: 1.1em;
  font-weight: 600;
  color: var(--color-heading);
}

.count {
  padding: 0 8px;
  border-radius: 999px;
  background: var(--color-background-mute);
  font-size: 0.8em;
  font-weight: 500;
}

.commentList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.comment {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.commentHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 12px;
  margin-bottom: 6px;
}

.commentName {
  font-weight: 600;
}

.commentName::first-letter {
  text-transform: uppercase;
}

.commentEmail {
  font-size: 0.8em;
  color: #888;
  text-decoration: none;
}

.commentEmail:hover {
  text-decoration: underline;
}

.commentBody {
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
}
</style>

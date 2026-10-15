<script setup lang="ts">
import { ref, watchEffect } from "vue";
import BlogPost from "./BlogPost.vue";

const link = "https://jsonplaceholder.typicode.com/posts";
const posts = ref(null);
const postFontSize = ref(1);

watchEffect(async () => {
  const response = await fetch(link);
  posts.value = await response.json();
});
</script>

<template>
  <div :style="{ fontSize: postFontSize + 'em' }">
    <BlogPost
      v-for="(post, index) in posts"
      :key="post.id"
      :title="`${index + 1}. ${post.title}`"
      v-on:enlarge-text="postFontSize += 0.1"
    />
  </div>
</template>

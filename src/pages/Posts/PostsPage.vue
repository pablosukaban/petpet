<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import PostsListItemComponent from "./components/PostsListItemComponent.vue";
import PostsList from "./components/PostsList.vue";
import PageComponent from "@/components/PageComponent.vue";
import { debounce } from "@/utils.js";
import { useUsersStore } from "./usersStore";

const usersStore = useUsersStore();

const searchQ = ref("");
const selectLimit = ref(20);
const debouncedSearch = ref("");

const updateSearch = debounce((value: string) => {
  debouncedSearch.value = value;
}, 300);

watch(searchQ, (search) => updateSearch(search));
onMounted(() => usersStore.fetchUsers());
onUnmounted(() => updateSearch.cancel());
</script>

<template>
  <PageComponent>
    <div class="pageHeader">
      <h1>Posts</h1>
      <input v-model="searchQ" placeholder="search posts" />
      <select v-model="selectLimit">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
    </div>
    <PostsList :search-q="debouncedSearch" :select-limit>
      <template #post="{ post, remove }">
        <PostsListItemComponent :post :key="post.id" @remove-post="remove" />
      </template>
    </PostsList>
  </PageComponent>
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

select {
  margin-left: auto;
}
</style>

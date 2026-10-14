<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import { useFetch } from "@/composables/useFetch";
import { computed, ref } from "vue";

type Commit = {
  author: {
    name: string;
    email: string;
    date: string;
  };
  id: string;
  message: string;
  url: string;
};

const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`;
const branches = ["main", "minor"];
const currentBranch = ref(branches[0]);

const { data, error } = useFetch<Array<{ sha: string; commit: Commit }>>(
  () => `${API_URL}${currentBranch.value}`,
);

const commits = computed(() => {
  return data.value?.map((item) => ({
    ...item.commit,
    id: item.sha,
  }));
});
</script>

<template>
  <PageComponent>
    <h1>Fetching</h1>
    <div>
      <template v-for="b in branches" :key="b">
        <input :id="b" type="radio" :value="b" v-model="currentBranch" />
        <label :for="b">{{ b }}</label>
      </template>
      <p v-if="error">Error......</p>
      <ul v-else-if="commits && commits.length > 0">
        <li v-for="c in commits" :key="c.id">
          <a :href="c.url">
            {{ c.id.slice(0, 7) }}
          </a>
          - {{ c.message }} <br />
          by {{ c.author.name }}, at
          <strong>
            {{ c.author.date }}
          </strong>
        </li>
      </ul>
      <p v-else>Loading...</p>
    </div>
  </PageComponent>
</template>

<style lang="css" scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
}
</style>

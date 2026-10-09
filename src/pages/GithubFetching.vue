<script setup lang="ts">
import { ref, watchEffect } from 'vue';

type Commit = {
  author: {
    name: string,
    email: string
    date: string
  },
  id: string,
  message: string,
  url: string,
}

const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ['main', 'minor']
const currentBranch = ref(branches[0])

const commits = ref<Array<Commit>>([])

const isLoading = ref(false)

watchEffect(async () => {
  isLoading.value = true
  try {
    const response = await fetch(API_URL + currentBranch.value)

    commits.value = (await response.json()).map((item: { sha: string, commit: Commit }) => ({ ...item.commit, id: item.sha }))
  } catch (error) {
    console.error(error)
    // err.value = error
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <h1>
    Fetching
  </h1>
  <div>
    <template v-for="b in branches" :key="b">
      <input :id="b" type="radio" :value="b" v-model="currentBranch" />
      <label :for="b">{{ b }}</label>
    </template>
    <p v-if="isLoading">Loading...</p>
    <ul v-else-if="!isLoading && commits.length > 0">
      <li v-for="c in commits" :key="c.id">
        <a :href="c.url">
          {{ c.id.slice(0, 7) }}
        </a> - {{ c.message }} <br /> by {{ c.author.name }}, at <strong>
          {{ c.author.date }}
        </strong>
      </li>
    </ul>
    <p v-else>Error!!!!</p>
  </div>
</template>

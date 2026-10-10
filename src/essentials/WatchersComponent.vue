<script setup lang="ts">
import { onWatcherCleanup, ref, watch, watchEffect } from 'vue'

const question = ref('')
const answer = ref('add "?"')
const loading = ref(false)

const x = ref(0)
const y = ref(0)

const todoHref = 'https://jsonplaceholder.typicode.com/todos/'
const todoId = ref(1)
const todoData = ref(null)

watch(question, async (newQuestion, oldQuestion, onCleanup) => {
  console.log({ question: question.value, newQuestion, oldQuestion })
  if (newQuestion.includes('?')) {
    answer.value = ''
    loading.value = true

    await new Promise((resolve) => {
      setTimeout(resolve, 200)
    })

    try {
      const response = await fetch('https://yesno.wtf/api')
      const newAnswer = (await response.json()).answer
      answer.value = newAnswer
    } catch (err) {
      answer.value = 'SOmething wrong! ' + err
    } finally {
      loading.value = false
    }
  }

  onCleanup(() => {})
})

watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum is ${sum}`)
  },
)

const stopWatch = watchEffect(async () => {
  const controller = new AbortController()

  const response = await fetch(todoHref + todoId.value, { signal: controller.signal })
  todoData.value = await response.json()

  onWatcherCleanup(() => {
    controller.abort()
  })
})
// To manually stop a watcher
stopWatch()
</script>

<template>
  <div>
    <p>
      ask for yes/no
      <span v-show="loading">loading...</span>
    </p>
    <input v-model="question" :disabled="loading" />
    <p>{{ answer }}</p>
  </div>
  <hr />
  <div>
    <input placeholder="x" v-model.number="x" />
    <input placeholder="y" v-model.number="y" />
  </div>
  <hr />
  <div>
    <input id="todoInput" v-model.number="todoId" placeholder="todo id" />
    <label for="todoInput">todo id here</label>
    {{ JSON.stringify(todoData) }}
  </div>
</template>

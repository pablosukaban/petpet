<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const styleObj = reactive({
  color: 'red',
  fontSize: '20px'
})

const newStyle = reactive({
  fontWeight: 900
})

const isCool = ref(false)

const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

const bookObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

const numbers = ref([1, 2, 3, 4, 5, 6])
const evenNums = computed(() => numbers.value.filter(n => n % 2 === 0))
</script>

<template>
  <p class="foo bar" :style="[styleObj, newStyle]">yo</p>
  <div>
    <button @click="isCool = !isCool">toggle</button>
    <p v-if="isCool">cool!</p>
    <p v-else>not cool!!!!</p>
    <template v-if="isCool">
      <p>so coooool</p>
      <p>so coooool</p>
      <p>so coooool</p>
    </template>
    <p v-show="isCool">showing cool</p>
    <div>
      <ul>
        <li v-for="({ message }, index) of items" :key="message"> damn - {{ index }} {{ message }}</li>
      </ul>
      book:
      <ul>
        <li v-for="(value, key, index) in bookObject" :key="value">{{ index + 1 }}. {{ key }}: {{ value }}</li>
      </ul>
      range:
      <ul>
        <li v-for="item in 3" :key="item">{{ item }}</li>
      </ul>
      filtered:
      <ul>
        <li v-for="num in evenNums" :key="num">{{ num }}</li>
      </ul>
    </div>
  </div>
</template>

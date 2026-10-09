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

const str = ref('')
function addChar(dollarEvent: Event,) {
  console.log({ dollarEvent })
  str.value += "yo"
}

const numbers = ref([1, 2, 3, 4, 5, 6])
const evenNums = computed(() => numbers.value.filter(n => n % 2 === 0))

const inputText = ref('')
const checked = ref(false)
const radiod = ref('')
const selected = ref('')
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
    <div>
      <button @click="addChar($event)">add: {{ str }}</button>
    </div>
  </div>
  <div>
    <input v-bind:value="inputText" v-on:input="event => inputText = (event.target as any)?.value!"
      placeholder="not cool" />
    <input v-model="inputText" placeholder="cool" />
    <span>{{ inputText }}</span>
    <input id="box" type="checkbox" v-model="checked" />
    <label for="box">{{ checked }}</label>
    <div>
      <p>Picked: {{ radiod }}</p>
      <input type="radio" id="r1" value="val1" v-model="radiod" />
      <label for="r1">val1</label>
      <input type="radio" id="r2" value="val2" v-model="radiod" />
      <label for="r2">val2</label>
    </div>
    <div>
      <p>selected: {{ selected }}</p>
      <select v-model="selected" multiple>
        <option disabled value="">select some</option>
        <option>o1</option>
        <option>o2</option>
        <option>o3</option>
      </select>
    </div>
  </div>
</template>

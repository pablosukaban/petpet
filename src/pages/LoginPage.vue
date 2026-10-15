<script setup lang="ts">
import { useAuthStore } from "@/authStore";
import BaseInput from "@/components/BaseInput.vue";
import PageComponent from "@/components/PageComponent.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const email = ref("");

const password = ref("");

const handleClick = () => {
  if (authStore.isAuth) {
    authStore.logOut();
  } else {
    authStore.logIn();

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/posts";
    router.push(redirect);
  }
};
</script>

<template>
  <PageComponent>
    <form novalidate @submit.prevent="handleClick">
      <BaseInput v-model="email" placeholder="email" required type="email" label="email" />
      <BaseInput v-model="password" placeholder="password" required type="password" />
      <button>
        {{ authStore.isAuth ? "Log out" : "Log in" }}
      </button>
    </form>
  </PageComponent>
</template>

<style scoped></style>

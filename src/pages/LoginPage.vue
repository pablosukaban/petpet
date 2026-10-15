<script setup lang="ts">
import { useAuthStore } from "@/authStore";
import BaseInput from "@/components/BaseInput.vue";
import PageComponent from "@/components/PageComponent.vue";
import { useForm } from "@/composables/useForm";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const { values, errors, validate } = useForm(
  { email: "", password: "" },
  {
    email: (v) => (!v ? "Обязательное поле" : !/^\S+@\S+$/.test(v) ? "Неверный email" : ""),
    password: (v) => (v.length < 6 ? "Минимум 6 символов" : ""),
  },
);

const handleClick = () => {
  if (authStore.isAuth) {
    authStore.logOut();
  } else {
    if (!validate()) {
      return;
    }

    authStore.logIn();

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/posts";
    router.push(redirect);
  }
};
</script>

<template>
  <PageComponent>
    <form class="login" novalidate @submit.prevent="handleClick">
      <h1 class="login__title">{{ authStore.isAuth ? "Выход" : "Вход" }}</h1>
      <template v-if="!authStore.isAuth">
        <BaseInput
          v-model="values.email"
          placeholder="email"
          required
          type="email"
          label="email"
          :error="errors.email"
        />
        <BaseInput
          v-model="values.password"
          placeholder="password"
          required
          type="password"
          :error="errors.password"
        />
      </template>
      <button class="login__submit">
        {{ authStore.isAuth ? "Log out" : "Log in" }}
      </button>
    </form>
  </PageComponent>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 360px;
  margin: 48px auto;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background);
}

.login__title {
  font-size: 22px;
  font-weight: 600;
  color: var(--color-heading);
}

.login__submit {
  margin-top: 8px;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s,
    transform 0.1s;
}

.login__submit:hover {
  background: hsla(160, 100%, 30%, 1);
}

.login__submit:active {
  transform: scale(0.98);
}

.login__submit:focus-visible {
  outline: 2px solid hsla(160, 100%, 37%, 1);
  outline-offset: 2px;
}
</style>

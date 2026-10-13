<script setup lang="ts">
import ContainerComponent from "./components/ContainerComponent.vue";
</script>

<template>
  <ContainerComponent>
    <template v-slot:header>
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/fetching">GH Fetching</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
      </nav>
    </template>

    <!-- <template #default>
      <RouterView />
    </template> -->

    <RouterView />

    <!-- seconds, isOpen и toggle в этом файле нигде не объявлены: их даёт ContainerComponent -->
    <template #aside="{ seconds, isOpen, toggle }">
      <button @click="toggle">{{ isOpen ? "Скрыть" : "Показать" }}</button>
      <p v-if="isOpen">Ты на сайте уже {{ seconds }} сек.</p>
    </template>

    <!-- <template #footer> Footer </template> -->

  </ContainerComponent>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 8px;
  max-width: 720px;
  margin: 0 auto;
  padding: 12px 16px;
}

.nav a {
  padding: 6px 12px;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
}

.nav a:hover {
  background: var(--color-background-soft);
}

/* класс, который RouterLink сам вешает на ссылку текущей страницы */
.nav a.router-link-active {
  background: var(--color-background-mute);
  font-weight: 600;
}
</style>

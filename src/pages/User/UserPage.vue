<script setup lang="ts">
import { computed, onMounted } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import { useUsersStore } from "../Posts/usersStore";

const usersStore = useUsersStore();

const props = defineProps<{ id: string }>();

// const { getUserById } = storeToRefs(usersStore);
// computed, чтобы автор подхватился, когда юзеры догрузятся в стор или поменяется id
const author = computed(() => usersStore.getUserById(Number(props.id)));

onMounted(() => usersStore.fetchUsers());
</script>

<template>
  <PageComponent>
    <h1 v-if="author">{{ author.name }}</h1>
    <nav class="tabs">
      <RouterLink :to="{ name: 'userInfo' }" class="tab">User info</RouterLink>
      <RouterLink :to="{ name: 'userPosts' }" class="tab">User posts</RouterLink>
    </nav>
    <RouterView />
  </PageComponent>
</template>

<style lang="css" scoped>
.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.tab {
  margin-bottom: -1px;
  padding: 8px 12px;
  border-bottom: 2px solid transparent;
  color: #888;
  font-weight: 500;
}

.tab:hover {
  background: transparent;
  color: var(--color-heading);
}

/*
  exact, а не просто router-link-active: ссылка на дочерний маршрут с path: ""
  считается ссылкой на родителя и была бы активна на любой вкладке
*/
.tab.router-link-exact-active {
  border-bottom-color: hsla(160, 100%, 37%, 1);
  color: var(--color-heading);
}
</style>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import { useUsersStore } from "./Posts/usersStore";
import { storeToRefs } from "pinia";

const props = defineProps<{ id: string }>();

const usersStore = useUsersStore();
const { getUserById, isLoading } = storeToRefs(usersStore);
// computed, чтобы автор подхватился, когда юзеры догрузятся в стор или поменяется id
const author = computed(() => getUserById.value(Number(props.id)));

onMounted(() => usersStore.fetchUsers());
</script>

<template>
  <PageComponent>
    <p v-if='isLoading'>Loading...</p>
    <template v-else-if="author">
      <h1>{{ author.name }}</h1>
      <p class="username">@{{ author.username }}</p>

      <dl class="info">
        <dt>Email</dt>
        <dd>
          <a :href="`mailto:${author.email}`">{{ author.email }}</a>
        </dd>

        <dt>Phone</dt>
        <dd>{{ author.phone }}</dd>

        <dt>Website</dt>
        <dd>
          <a :href="`https://${author.website}`" target="_blank" rel="noopener">
            {{ author.website }}
          </a>
        </dd>

        <dt>Address</dt>
        <dd>
          {{ author.address.street }}, {{ author.address.suite }}, {{ author.address.city }},
          {{ author.address.zipcode }}
        </dd>

        <dt>Company</dt>
        <dd>
          {{ author.company.name }}
          <span class="muted">— «{{ author.company.catchPhrase }}»</span>
        </dd>
      </dl>
    </template>
    <template v-else>
      <h1>Author not found</h1>
      <RouterLink :to="{ name: 'posts' }">← Все посты</RouterLink>
    </template>
  </PageComponent>
</template>

<style lang="css" scoped>
h1 {
  flex-basis: 100%;
  font-weight: 600;
}

.username,
.muted {
  opacity: 0.7;
}

.info {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 8px 16px;
  margin-top: 16px;
}

.info dt {
  font-weight: 600;
}

.info dd {
  margin: 0;
}
</style>

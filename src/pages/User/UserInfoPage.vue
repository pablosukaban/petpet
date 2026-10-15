<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useUsersStore } from "../Posts/usersStore";

const props = defineProps<{ id: string }>();

const usersStore = useUsersStore();
const { getUserById, isLoading } = storeToRefs(usersStore);
// computed, чтобы автор подхватился, когда юзеры догрузятся в стор или поменяется id
const author = computed(() => getUserById.value(Number(props.id)));

const initials = computed(() =>
  author.value?.name
    .split(" ")
    .filter((word) => !word.endsWith("."))
    .map((word) => word[0])
    .slice(0, 2)
    .join(""),
);
</script>

<template>
  <p v-if="isLoading" class="loading">Loading...</p>
  <article v-else-if="author" class="card">
    <header class="header">
      <div class="avatar" aria-hidden="true">{{ initials }}</div>
      <div>
        <!-- <h2 class="name">{{ author.name }}</h2>  -->
        <p class="username">@{{ author.username }}</p>
      </div>
    </header>

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
  </article>
  <div v-else class="notFound">
    <h1 class="name">Author not found</h1>
    <RouterLink :to="{ name: 'posts' }">← Все посты</RouterLink>
  </div>
</template>

<style lang="css" scoped>
.loading {
  color: #888;
}

.card {
  padding: 20px 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background-soft);
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 30%, 1);
  font-size: 1.2em;
  font-weight: 600;
}

.name {
  margin: 0;
  font-size: 1.5em;
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-heading);
}

.username,
.muted {
  color: #888;
}

.username {
  margin: 2px 0 0;
}

.info {
  display: grid;
  grid-template-columns: max-content 1fr;
  margin: 0;
}

.info dt,
.info dd {
  padding: 10px 0;
  border-top: 1px solid var(--color-border);
}

.info dt {
  padding-right: 24px;
  color: #888;
  font-size: 0.85em;
  font-weight: 500;
  line-height: 1.7;
}

.info dd {
  margin: 0;
  overflow-wrap: anywhere;
}

/* компенсируем padding: 3px у глобальных ссылок, чтобы текст не прыгал по горизонтали */
.info a {
  margin: -3px;
}

.notFound {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

@media (max-width: 480px) {
  .card {
    padding: 16px;
  }

  .info {
    grid-template-columns: 1fr;
  }

  .info dt {
    padding-bottom: 0;
  }

  .info dd {
    padding-top: 2px;
    border-top: none;
  }
}
</style>

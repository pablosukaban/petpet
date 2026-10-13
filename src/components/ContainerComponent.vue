<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

// всё это живёт ТОЛЬКО здесь, App.vue про эти переменные ничего не знает
const seconds = ref(0);
const isOpen = ref(true);

function toggle() {
  isOpen.value = !isOpen.value;
}

let timer: ReturnType<typeof setInterval>;
onMounted(() => {
  timer = setInterval(() => seconds.value++, 1000);
});
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="layout">
    <header>
      <slot name="header" />
    </header>
    <main class="main">
      <slot />
    </main>
    <aside v-if="$slots.aside" class="aside">
      <!-- отдаём свои данные наружу: всё, что тут перечислено, прилетит в #aside="{ ... }" -->
      <slot name="aside" :seconds="seconds" :is-open="isOpen" :toggle="toggle" />
    </aside>
    <footer v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </footer>
    <div v-else class="footer">no footer</div>
  </div>
</template>

<style lang="css" scoped>
/* растягиваем на всю высоту экрана, чтобы футер был внизу даже на короткой странице */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

.header {
  border-bottom: 1px solid var(--color-border);
}

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

.aside {
  border-top: 1px dashed var(--color-border);
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 12px 16px;
}

.footer {
  border-top: 1px solid var(--color-border);
  padding: 16px;
  text-align: center;
  font-size: 0.85em;
  color: #888;
}
</style>

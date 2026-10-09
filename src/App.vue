<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/fetching">GH Fetching</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
    <footer class="footer">
      Footer
    </footer>
  </div>
</template>

<style scoped>
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
  border-bottom: 1px solid #ddd;
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
  background: #f2f2f2;
}

/* класс, который RouterLink сам вешает на ссылку текущей страницы */
.nav a.router-link-active {
  background: #e8e8e8;
  font-weight: 600;
}

.footer {
  border-top: 1px solid #ddd;
  padding: 16px;
  text-align: center;
  font-size: 0.85em;
  color: #888;
}
</style>

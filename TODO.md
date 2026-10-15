Что можно добавить в проект для практики

  <!--1. Nested: вкладки «Инфо / Посты» на /user/:id, как в примере выше.-->
  <!--2. beforeEnter: не пускать на /posts/abc и /user/abc с нечисловым id.-->
  <!--3. afterEach: менять document.title по to.meta.title.-->
  4. onBeforeRouteLeave: спрашивать подтверждение, если в AddPostDialog введён текст и пользователь уходит со страницы.
  5. beforeEach + meta.requiresAuth: простая фейковая авторизация через ref(false) в сторе и закрытый маршрут.

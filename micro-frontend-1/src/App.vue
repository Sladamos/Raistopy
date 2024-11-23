<template>
  <div class="box-border my-3">
    Super bus stop application
    <ul class="my-2">
      <!--Using <a/> will refresh adn reload the page. Routerlink will change the URL and change location but not refresh/reload the whole page.-->
      <RouterLink to="/">
        <li>Secure page</li>
      </RouterLink>
      <RouterLink to="/InsecurePage">
        <li>Insecure page</li>
      </RouterLink>
      <RouterLink to="/login">
        <li>Auth</li>
      </RouterLink>
    </ul>
  </div>
  <RouterView />
</template>

<script setup lang="ts"></script>

<style scoped>
ul li{
  @apply inline p-2 mx-2 bg-neutral-300 rounded-lg hover:bg-sky-400;
}
</style>

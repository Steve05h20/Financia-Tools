<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>
<template>
  <header class="navbar bg-base-300 text-base-content flex justify-around max-sm:hidden">
    <h1>Logo</h1>
    <nav class="flex gap-8 ">
      <RouterLink
        class="btn"
        :class="{ 'btn-secondary': $route.path === '/' }"
        to="/"
      >
        Home
      </RouterLink>
      <RouterLink
        class="btn"
        :class="{ 'btn-secondary': $route.path === '/budget' }"
        to="/budget"
      >
        Budget
      </RouterLink>
      <RouterLink
        class="btn"
        :class="{ 'btn-secondary': $route.path === '/profile' }"
        to="/profile"
      >
        Profile
      </RouterLink>
      <button class="btn btn-ghost">S'inscrire</button>
      <button class="btn btn-primary">Se connecter</button>
    </nav>
  </header>
</template>


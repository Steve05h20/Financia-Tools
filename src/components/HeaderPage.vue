<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="navbar bg-base-300 text-base-content flex justify-around">
    <h1>Logo</h1>
    <nav class="flex gap-8">
      <RouterLink class="btn" :class="{ 'btn-secondary': $route.path === '/' }" to="/">
        Home
      </RouterLink>
      <RouterLink class="btn" :class="{ 'btn-secondary': $route.path === '/budget' }" to="/budget">
        Budget
      </RouterLink>
      <RouterLink
        class="btn"
        :class="{ 'btn-secondary': $route.path === '/profile' }"
        to="/profile"
      >
        Profile
      </RouterLink>
      <RouterLink
        class="btn"
        :class="{ 'btn-ghost': $route.path === '/inscription' }"
        to="/inscription"
      >
        S'inscrire
      </RouterLink>
      <RouterLink
        class="btn"
        :class="{ 'btn-ghost': $route.path === '/connexion' }"
        to="/connexion"
      >
        Se connecter
      </RouterLink>
    </nav>
  </header>
</template>

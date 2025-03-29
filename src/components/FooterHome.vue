<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4 border-t-6 shadow-lg border-primary"
  >
    <aside>
      <p class="text-black font-normal text-xs">
        Copyright © {{ currentYear }} - Tous droits réservés par
        <span class="text-xl text-primary m-4 font-bold">Financia</span>
      </p>
    </aside>
  </footer>
</template>

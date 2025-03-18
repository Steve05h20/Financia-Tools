<script lang="ts" setup>


const Props = defineProps<{
  userName:string
}>()


</script>
<template>
  <div class="avatar btn btn-xs py-4 avatar-online avatar-placeholder gap-4 flex items-center">
  <div class="bg-primary text-neutral-content w-8 rounded-full">
    <span class="text-lg">{{ Props.userName[0] }}</span>
  </div>
  <p class="font-bold text-lg">{{ Props.userName }}</p>
</div>
</template>

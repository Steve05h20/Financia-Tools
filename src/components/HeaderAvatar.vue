<script lang="ts" setup>
import { useAuth } from '@/services/useAuth';
import '@fortawesome/fontawesome-free/css/all.css'



const Props = defineProps<{
  userName:string
}>()

const auth = useAuth()
</script>
<template>

<details class="dropdown dropdown-center">
  <summary class="btn m-1 avatar  btn-xs py-4 avatar-online avatar-placeholder gap-4 flex items-center">
    <div class="bg-primary text-neutral-content w-8 rounded-full">
    <span class="text-lg">{{ Props.userName[0] }}</span>
  </div>
  <p class="font-bold text-lg">{{ Props.userName }}</p>
  </summary>
  <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a href="/profile" class="hover:bg-primary hover:text-primary-content"> <i class="fa-solid fa-user"></i> Profile</a></li>
    <li><a href="/budget" class="hover:bg-primary hover:text-primary-content"> <i class="fa-solid fa-wallet"></i> Budget</a></li>
    <li class=""><a class="text-red-500 hover:bg-red-500 hover:text-red-50" @click="auth.deconnexion"> <i class="fa-solid fa-right-from-bracket"></i> Déconnexion</a></li>
  </ul>
</details>
</template>


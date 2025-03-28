<script lang="ts" setup>
import { useAuth } from '@/services/useAuth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faWallet, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

const Props = defineProps<{
  userName:string
}>()

const auth = useAuth()
const router = useRouter()

const handleLogout = () => {
  auth.deconnexion()
  router.push('/')
}
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
    <li><a href="/profile" class="hover:bg-primary hover:text-primary-content"> <font-awesome-icon :icon="faUser" /> Profile</a></li>
    <li><a href="/budget" class="hover:bg-primary hover:text-primary-content"> <font-awesome-icon :icon="faWallet" /> Budget</a></li>
    <li class=""><a class="text-red-500 hover:bg-red-500 hover:text-red-50" @click="handleLogout"> <font-awesome-icon :icon="faRightFromBracket" /> Déconnexion</a></li>
  </ul>
</details>
</template>


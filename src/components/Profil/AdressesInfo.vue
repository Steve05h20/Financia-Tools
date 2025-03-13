<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
</script>

<template>

  <h2 class="my-6">Addresses</h2>
 <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto">
    <div>
      <Label text="Addresse" htmlFor="addresse" required />
      <input id="addresse" />
    </div>

    <div>
      <Label text="rue" htmlFor="rue" required />
      <Input id="rue" />
    </div>

    <div>
      <Label text="ville" htmlFor="ville" required />
      <Input id="ville" />
    </div>
  </div>

  <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto lg:pt-10">
    <div>
      <Label text="province" htmlFor="province" required />
      <Input id="province"/>
    </div>

    <div>
      <Label text="pays" htmlFor="pays" required />
      <Input id="pays" />
    </div>
  </div>

</template>

<style>
</style>

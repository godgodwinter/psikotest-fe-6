<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
</script>

<template>
  <div class="flex justify-center flex-col">
    <div class="flex justify-center">
      <img src="@/assets/img/flat/icons8-lock-500.svg" />
    </div>
    <div>
      <p class="text-center font-bold text-2xl">
        Fitur tidak tersedia dalam Paket Anda!
      </p>
      <p class="text-center font-light text-md">
        Upgrade paket anda agar dapat menggunakan fitur ini!
      </p>
      <span @click="router.go(-1)">
        <p class="text-center font-bold text-2xl underline text-primary link">
          Kembali
        </p></span
      >
    </div>
  </div>

  <!-- <div class="text-3xl font-bold underline text-red-200 flex justify-center items-center py-32">
    <div>404 NOT FOUND!</div>
  </div> -->
</template>

<style scoped>
a {
  color: #42b983;
}
</style>

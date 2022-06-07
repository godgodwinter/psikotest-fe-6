<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const goLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
  router.go();
};
</script>

<template>
  <div class="flex justify-center flex-col">
    <div class="flex justify-center">
      <img src="@/assets/img/flat/icons8-lock-500.svg" />
    </div>
    <div>
      <p class="text-center font-bold text-2xl">Akun anda tidak Aktif!</p>
      <p class="text-center font-light text-md">
        Hubungi administrator untuk info lebih lanjut!
      </p>
      <span @click="goLogout">
        <p class="text-center font-bold text-2xl underline text-primary link">
          Keluar
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

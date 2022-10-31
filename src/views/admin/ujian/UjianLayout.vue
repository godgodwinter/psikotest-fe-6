<script setup>
import { useStoreAdminBar } from "@/stores/adminBar";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("ujian");
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Ujian Minat Bidang
        Studi
      </span>
    </div>
  </div>
  <div class="py-2 lg:py-4 px-4 flex justify-start flex-col">
    <div class="tabs tabs-boxed">
      <RouterLink :to="{ name: 'admin.ujian' }">
        <span class="tab tab-bordered">List Ujian</span>
      </RouterLink>
      <RouterLink :to="{ name: 'admin.ujian.create' }" class="tab tab-bordered">
        <a class="tab tab-bordered">Buat Baru</a>
      </RouterLink>
      <RouterLink :to="{ name: 'admin.ujian.paketsoal' }" class="tab tab-bordered">
        <a class="tab tab-bordered"> Paket Soal</a>
      </RouterLink>
      <!-- <RouterLink
        :to="{ name: 'admin.ujian.paketsoal.create' }"
        class="tab tab-bordered"
      >
        <a class="tab tab-bordered">Buat Paket Soal</a></RouterLink
      > -->
    </div>
  </div>

  <div class="py-2 lg:py-4 px-4">
    <router-view />
  </div>
</template>

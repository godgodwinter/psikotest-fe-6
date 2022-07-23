<script setup>
import { useStoreAdminBar } from "@/stores/adminBar";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("banksoal");
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
        >Bank Soal
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Bank Soal <BreadCrumbSpace /> Index
        </template>
      </BreadCrumb>
    </div>
  </div>
  <div class="py-2 lg:py-4 px-4 flex justify-start flex-col">
    <div class="tabs tabs-boxed">
      <a class="tab tab-bordered tab-active">Soal</a>
      <a class="tab tab-bordered">Kategori</a>
      <a class="tab tab-bordered">Buat Baru</a>
    </div>
  </div>
  <div class="py-2 lg:py-4 px-4 flex justify-start flex-col">
    <h1 class="font-bold text-xl">Kategori :</h1>
    <div class="tabs gap-4 flex justify-center">
      <a class="tab tab-bordered">IPA</a>
      <a class="tab tab-bordered">MTK</a>
      <a class="tab tab-bordered">Bahasa Indonesia</a>
      <a class="tab tab-bordered tab-active">Bahasa Indonesia</a>
      <a class="tab tab-bordered">Bahasa Indonesia</a>
      <a class="tab tab-bordered">Bahasa Indonesia</a>
      <a class="tab tab-bordered">Bahasa Indonesia</a>
      <a class="tab tab-bordered">Bahasa Indonesia</a>
    </div>
  </div>

  <div class="py-2 lg:py-4 px-4">Tabel</div>
</template>

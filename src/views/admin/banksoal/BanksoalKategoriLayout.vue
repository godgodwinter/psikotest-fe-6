<script setup>
import { computed } from "vue";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import { useStoreKategori } from "@/stores/data/kategori";
const storeKategori = useStoreKategori();
storeKategori.setPagesActive("index");
const pagesActive = computed(() => storeKategori.getPagesActive);
const storeBanksoal = useStoreBanksoal();
storeBanksoal.setPagesActive("kategori");
</script>
<template>
  <div class="py-2 lg:py-4 px-4 flex justify-start flex-col">
    <div class="tabs gap-4 flex justify-start">
      <RouterLink :to="{ name: 'admin.banksoal.kategori' }">
        <a
          class="tab tab-bordered"
          :class="{ 'tab-active': pagesActive == 'index' }"
          >List</a
        ></RouterLink
      >
      <RouterLink :to="{ name: 'admin.banksoal.kategori.tambah' }">
        <a
          class="tab tab-bordered"
          :class="{ 'tab-active': pagesActive == 'create' }"
          >Tambah</a
        ></RouterLink
      >
    </div>
  </div>
  <div>
    <RouterView />
  </div>

  <!-- <div class="py-2 lg:py-4 px-4">Tabel Kategori</div> -->
</template>

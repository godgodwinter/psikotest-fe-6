<script setup>
import { useStoreAdminBar } from "@/stores/adminBar";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("banksoal");
</script>
<template>
  <div class="py-2 lg:py-4 px-4">Form Tambah Soal</div>
</template>

<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { computed } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
const storeAdminBar = useStoreAdminBar();
const storeBankSoal = useStoreBanksoal();
storeAdminBar.setPagesActive("skolastik-paketsoal");
storeBankSoal.setPagesActive("soal");
const pagesActive = computed(() => storeBankSoal.getPagesActive);
</script>
<template>
  <div class="divider">MENU PAKETSOAL SKOLASTIK</div>

  <div class="py-2 lg:py-4 px-4">
    <router-view />
  </div>
</template>

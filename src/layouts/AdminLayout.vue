<script setup>
import NavBar from "@/components/template/NavBar.vue";
import SideBar from "@/components/template/SideBar.vue";
import Footer from "@/components/template/Footer.vue";
import Api from "@/axios/axios";
import Loading from "@/components/atoms/Loading1.vue";
import CardLockedFitur from "@/components/organismes/CardNonAktif.vue";

import { ref, computed } from "vue";
import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const getData = async () => {
  try {
    const response = await Api.post(`gurubk/auth/me`);
    storeGuruBk.setIdentitas(response.identitas);
    storeGuruBk.setSekolah(response.sekolah);
    storeGuruBk.setPaket(response.paket);
    storeGuruBk.setStats(response.stats);
    // data.value = response.data;
    // data.value.map((item, index) => {
    // arr.value.push(item.penjelasan);
    // });
    loading.value = true;
    return true;
  } catch (error) {
    loading.value = true;
    console.error(error);
  }
};
const loading = ref(false);
getData();

const sekolah = computed(() => storeGuruBk.getSekolah);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(paket.value);
});
</script>
<template>
  <!-- <div class="font-serif">
    <AdminHeader />
  </div> -->
  <div class="font-serif">
    <NavBar />
    <SideBar />

    <div class="flex overflow-hidden pt-24 px-2 bg-base-100">
      <div class="opacity-50 hidden fixed inset-0 z-10" />
      <div class="w-full relative lg:ml-72">
        <main class="pb-4 min-h-screen">
          <div v-if="loading">
            <div v-if="sekolah.status == 'Aktif'">
              <router-view />
            </div>

            <div v-else>
              <CardLockedFitur />
            </div>
          </div>
          <div v-else><Loading /></div>
        </main>
        <Footer />
      </div>
    </div>
  </div>
  -
  <!-- <main class="container mx-w-6xl mx-auto font-serif">
    <router-view />
  </main> -->
</template>

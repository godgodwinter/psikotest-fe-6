<script setup>
import SubSideBarMenu from "@/components/organismes/SubSideBarMenu.vue";
const BASE_URL = import.meta.env.VITE_API_URL;
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const sekolah = computed(() => storeGuruBk.getSekolah);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(sekolah.value.id);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("sekolah");
const router = useRouter();
const route = useRoute();

const id = route.params.id;

// const dataAsli = ref([]);
// const data = ref([]);

// const getData = async () => {
//   try {
//     const response = await Api.get(`owner/sekolah/${id}`);
//     dataAsli.value = response.data;
//     data.value = response.data;

//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// getData();
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <!-- <BreadCrumb>
        <template v-slot:content> Sekolah <BreadCrumbSpace /> Index </template>
      </BreadCrumb> -->
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        MENU SEKOLAH
      </span>
    </div>
    <div class="md:py-0 py-4">
      <router-link :to="{ name: 'AdminSekolah' }">
        <button
          class="btn btn-secondary hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
        >
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg> -->
          MENU SEKOLAH
        </button></router-link
      >
    </div>
  </div>

  <div class="container mx-auto lg:mx-0 my-5 p-5">
    <div class="xl:flex no-wrap lg:-mx-2">
      <!-- Left Side -->
      <div class="w-full xl:w-3/12 mx-2">
        <SubSideBarMenu :data="data"></SubSideBarMenu>
      </div>
      <!-- Right Side -->
      <div class="w-full xl:w-9/12 pt-10 lg:pt-0 mx-2">
        <router-view />
      </div>
    </div>
  </div>
</template>

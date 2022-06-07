<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const paket = computed(() => storeGuruBk.getPaket);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(paket.value);
});

const router = useRouter();
const storeAdminBar = useStoreAdminBar();
const toggleSideBar = () => {
  storeAdminBar.toggleSideBar();
};
// const arr = ref([
//   "Kegembiraan yang Anda miliki gunakan secara wajar dan realita",
//   "Nikmatilah hidup itu dengan gembira seperti menyongsong terbitnya Matahari dengan penuh harapan",
//   "Menanti datangnya kegembiraan hal yang sangat diharapkan setiap orang maka nikmatilah kegembiraan dengan hati riang, lembut",
// ]);
const arr = ref([]);
const data = ref([]);
const getData = async () => {
  try {
    const response = await Api.get(`guest/katabijak`);
    // console.log(response);
    data.value = response.data;
    data.value.map((item, index) => {
      arr.value.push(item.penjelasan);
    });

    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getData();
</script>
<template>
  <div class="static bg-base-100" v-if="!isSidebarActive">
    <div
      class="fixed z-50 w-full font-serif font-semibold text-sm text-base-200 bg-base-content flex justify-center py-2 px-4 text-center"
    >
      <VueWriter
        v-if="arr.length > 0"
        :array="arr"
        :eraseSpeed="50"
        :typeSpeed="40"
        :delay="10000"
        :intervals="500"
      />
    </div>
  </div>
  <nav class="bg-base-200 border-b border-base-100 fixed z-30 w-full top-8">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            @click="toggleSideBar()"
          >
            <svg
              id="toggleSidebarMobileHamburger"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              id="toggleSidebarMobileClose"
              class="w-6 h-6 hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <a href="#" class="text-xl font-bold flex items-center lg:ml-2.5">
            <img
              src="../../assets/img/logo/tailwindcss-icon.svg"
              class="h-6 mr-2"
              alt="Windster Logo"
            />
            <span class="self-center whitespace-nowrap"
              >PELITA MULTI TALENTA</span
            >
          </a>
        </div>
        <div class="flex items-center">
          <div class="hidden lg:flex items-center">
            <span class="text-base font-bold uppercase text-gray-500 mr-5"
              >Paket {{ paket.nama }} ❤️
            </span>
            <div class="-mb-1">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

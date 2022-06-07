<script setup>
import Api from "@/axios/axios";
import { computed } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreAuth } from "@/stores/auth";
import { useStoreGuruBk } from "@/stores/guruBk";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const storeAdminBar = useStoreAdminBar();
const isSideBarActive = computed(() => storeAdminBar.getIsSidebarActive);
const pagesActive = computed(() => storeAdminBar.getPagesActive);
async function goLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
  router.go();
}
const storeAuth = useStoreAuth();
const storeGuruBk = useStoreGuruBk();
const getIsLogin = computed(() => storeAuth.getIsLogin);

const getIdentitas = computed(() => storeGuruBk.getIdentitas);
// const getToken = computed(() => storeAuth.getToken);
if (getIsLogin.value == false) {
  //logout
  router.push({ name: "LandingLogin" });
}
const pagesActiveClass = ref(
  "border border-primary rounded-lg bg-primary text-primary-content"
);
</script>
<template>
  <aside
    :class="{ hidden: !isSideBarActive }"
    id="sidebar"
    class="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 lg:w-72 transition-width duration-75 bg-base-200"
    aria-label="Sidebar"
  >
    <div class="relative flex-1 flex flex-col min-h-0 pt-6 md:pt-4">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-1 px-3 space-y-1">
          <!-- divide-y  -->
          <ul
            class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-2 justify-center"
          >
            <li class="lg:w-full">
              <div class="flex gap-2 items-center justify-center">
                <!-- <img
                  src="@/assets/img/avatar/baemon-ava-2.jpg"
                  alt=""
                  class="rounded-full w-20 h-20 object-cover"
                /> -->
                <!-- <div class="avatar">
                  <div class="w-24 mask mask-squircle">
                    <img src="@/assets/img/avatar/baemon-ava-2.jpg" />
                  </div>
                </div> -->
                <div class="avatar online">
                  <div
                    class="w-24 rounded-full border border-sky-200 hover:border-sky-400 shadow hover:shadow-lg"
                  >
                    <img src="@/assets/img/avatar/baemon-ava-2.jpg" />
                  </div>
                </div>
              </div>
              <div>
                <p
                  class="text-base-content text-md font-semibold text-center py-2"
                >
                  {{ getIdentitas.nama }}
                </p>
                <p
                  class="text-base-content text-sm font-medium text-center link link-primary"
                >
                  User Sekolah
                </p>
              </div>
            </li>
            <li class="lg:w-full flex justify-center">
              <button
                @click="goLogout()"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group border border-primary hover:border-primary-content hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-sm">Logout </span>
              </button>
            </li>
          </ul>
          <ul
            class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between"
          >
            <li
              class="lg:w-full py-2"
              :class="[pagesActive == 'dashboard' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminDashboard' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                <span class="ml-3">Dashboard </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'siswa' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminSiswa' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Siswa </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'kelas' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminKelas' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                <span class="ml-3">Kelas </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'walikelas' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminWaliKelas' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="ml-3">Wali Kelas </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'pengguna' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminPengguna' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="ml-3">Pengguna </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'hasilpsikologi' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminHasilPsikologi' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Hasil Psikologi </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'nilaipsikologi' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminNilaiPsikologi' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Nilai Psikologi Siswa </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'minatbakat' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminAnalisaMinatBakat' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Analisa Minat dan Bakat </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'penjurusan' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminAnalisaPenjurusan' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
                  />
                </svg>
                <span class="ml-3">Analisa Penjurusan </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'kasus' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminCatatanKasus' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span class="ml-3">Catatan Kasus Siswa </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[
                pagesActive == 'pengembangandiri' ? pagesActiveClass : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminCatatanPengembangandiri' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clip-rule="evenodd"
                  />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
                <span class="ml-3">Catatan Pengembangan Diri Siswa </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'prestasi' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminCatatanPrestasi' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
                  />
                </svg>
                <span class="ml-3">Catatan Prestasi Siswa </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

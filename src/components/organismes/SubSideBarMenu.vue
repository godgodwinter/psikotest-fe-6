<script setup>
import { computed, ref } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
const storeAdminBar = useStoreAdminBar();
const pagesSubSideBarActive = computed(
  () => storeAdminBar.getPagesSubSideBarActive
);
const pagesSubSideBarActiveClass = ref(
  "border border-gray-300 rounded-lg bg-gray-300"
);
</script>
<template>
  <div>
    <!-- Profile Card -->
    <div class="bg-white p-3 border-t-4 border-green-400">
      <div class="image overflow-hidden">
        <img
          class="h-20 w-20 mx-auto"
          src="@/assets/img/flat/portfolio_2.png"
          alt=""
        />
      </div>
      <p
        class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-center pt-2"
      >
        Menu - Menu Sekolah
      </p>
      <ul
        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
      >
        <li class="flex items-center py-3">
          <span>Status Sekolah</span>
          <span class="ml-auto">
            <div class="flex justify-center">
              <div class="form-check form-switch">
                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox checkbox-lg checkbox-primary"
                />
              </div>
            </div>
          </span>
        </li>
      </ul>
    </div>
    <!-- End of profile card -->
    <div class="my-4"></div>
    <!-- Friends card -->
    <div class="bg-white p-3 hover:shadow">
      <div
        class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"
      >
        <span class="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </span>
        <span>Mastering</span>
      </div>
      <div class="px-6">
        <ul class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between">
          <li
            class="bg-white lg:w-full py-2"
            :class="[
              pagesSubSideBarActive == 'sekolahDashboard'
                ? pagesSubSideBarActiveClass
                : '',
            ]"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailDashboard' }"
              class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
              <span class="ml-3">Dashboard Sekolah</span>
            </router-link>
          </li>
          <li
            class="bg-white lg:w-full py-0"
            :class="[
              pagesSubSideBarActive == 'sekolahSiswa'
                ? pagesSubSideBarActiveClass
                : '',
            ]"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailSiswa' }"
              class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
              <span class="ml-3"> Siswa </span>
            </router-link>
          </li>
          <li
            class="bg-white lg:w-full py-0"
            :class="[
              pagesSubSideBarActive == 'sekolah'
                ? pagesSubSideBarActiveClass
                : '',
            ]"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailKelas' }"
              class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
              <span class="ml-3">Kelas </span>
            </router-link>
          </li>
          <li
            class="bg-white lg:w-full py-0"
            :class="[
              pagesSubSideBarActive == 'sekolah'
                ? pagesSubSideBarActiveClass
                : '',
            ]"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailWaliKelas' }"
              class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
              <span class="ml-3">Wali Kelas </span>
            </router-link>
          </li>
          <li
            class="bg-white lg:w-full py-0"
            :class="[
              pagesSubSideBarActive == 'sekolah'
                ? pagesSubSideBarActiveClass
                : '',
            ]"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailGuruBk' }"
              class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
              <span class="ml-3">Pengguna</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <div
          class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8 pt-2"
        >
          <span class="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span>Proses</span>
        </div>
        <div class="px-6">
          <ul
            class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between"
          >
            <li
              class="bg-white lg:w-full py-2"
              :class="[
                pagesSubSideBarActive == 'sekolahdashboard'
                  ? pagesSubSideBarActiveClass
                  : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailHasilPsikologi' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
                <span class="ml-3">Hasil Psikologi</span>
              </router-link>
            </li>
            <li
              class="bg-white lg:w-full py-0"
              :class="[
                pagesSubSideBarActive == 'apiprobk'
                  ? pagesSubSideBarActiveClass
                  : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailNilaiPsikologiSiswa' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
                <span class="ml-3"> Nilai Psikologi Siswa </span>
              </router-link>
            </li>
            <li
              class="bg-white lg:w-full py-0"
              :class="[
                pagesSubSideBarActive == 'sekolah'
                  ? pagesSubSideBarActiveClass
                  : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailAnalisaMinatBakat' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
                <span class="ml-3">Analisa Minat dan Bakat </span>
              </router-link>
            </li>
            <li
              class="bg-white lg:w-full py-0"
              :class="[
                pagesSubSideBarActive == 'sekolah'
                  ? pagesSubSideBarActiveClass
                  : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailAnalisaPenjurusan' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
                <span class="ml-3">Analisa Penjurusan </span>
              </router-link>
            </li>
            <li
              class="bg-white lg:w-full py-0"
              :class="[
                pagesSubSideBarActive == 'sekolah'
                  ? pagesSubSideBarActiveClass
                  : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailCatatanKasusSiswa' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
                <span class="ml-3">Catatan Kasus Siswa </span>
              </router-link>
            </li>
            <li
              class="bg-white lg:w-full py-0"
              :class="[
                pagesSubSideBarActive == 'sekolah'
                  ? pagesSubSideBarActiveClass
                  : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailCatatanPengembanganDiri' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
                <span class="ml-3">Catatan Pengembangan Diri Siswa</span>
              </router-link>
            </li>
            <li
              class="bg-white lg:w-full py-0"
              :class="[
                pagesSubSideBarActive == 'sekolah'
                  ? pagesSubSideBarActiveClass
                  : '',
              ]"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailCatatanPrestasiSiswa' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
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
                <span class="ml-3">Catatan Prestasi Siswa </span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- <ul
          class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
        >
          <li class="flex items-center py-3">
            <span>Menu Refresh Data Sidebar</span>
            <span class="ml-auto">
              <div class="flex justify-center">
                <div class="form-check form-switch">
                  <button
                    class="bg-emerald-600 py-2 px-2 rounded-full text-gray-100 text-xs font-bold"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </span>
          </li>
        </ul> -->
      </div>
    </div>
    <!-- End of Data Statistik card -->
  </div>
</template>

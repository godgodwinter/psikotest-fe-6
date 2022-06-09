<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast.js";
import { useStoreAdminBar } from "@/stores/adminBar";
const storeAdminBar = useStoreAdminBar();
const subMenuActive = computed(() => storeAdminBar.getsubMenuActive);
const pagesActiveClass = ref(
  "border border-primary rounded-lg bg-primary text-primary-content"
);

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const dataAsli = ref([]);
const data = ref([]);

const getData = async () => {
  try {
    const response = await Api.get(`owner/sekolah/${id}`);
    dataAsli.value = response.data;
    data.value = response.data;
    status.value = checkStatus(data.value.status);
    statusKet.value = data.value.status;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();

const checkStatus = (item) => {
  let hasil = item == "Aktif" ? true : false;
  return hasil;
};

const toogleStatus = (status) => {
  let hasil = !status;
  if (status) {
    hasil = "Nonaktif";
  } else {
    hasil = "Aktif";
  }
  return hasil;
};

const doToogleStatus = (item) => {
  if (item) {
    statusKet.value = "Nonaktif";
    status.value = false;
  } else {
    statusKet.value = "Aktif";
    status.value = true;
  }
};

const status = ref(false);
const statusKet = ref("Nonaktif");

const doUpdateStatus = async () => {
  let dataInput = toogleStatus(status.value);

  if (confirm("Apakah anda yakin mengganti Status Sekolah ini?")) {
    try {
      const response = await Api.post(`owner/sekolah/${id}/updatestatus`, {
        status: dataInput,
      });
      Toast.success("Success", "Status Berhasil diupdate!");
      doToogleStatus(status.value);
      return response.data;
    } catch (error) {
      Toast.danger("Info", "Status gagal diupdate!");
      console.error(error);
    }
  }
};
</script>
<template>
  <div>
    <!-- Profile Card -->
    <div class="bg-base-100 p-3 border-t-4 border-green-400">
      <div class="image overflow-hidden">
        <img
          class="h-20 w-20 mx-auto"
          src="@/assets/img/flat/portfolio_2.png"
          alt=""
        />
      </div>
      <p
        class="text-sm text-base-content font-bold text-lg hover:text-gray-600 leading-6 text-center pt-2"
      >
        {{ data.nama }}
      </p>
      <ul
        class="bg-base-200 text-base-content hover:text-base-content hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
      >
        <li class="flex items-center py-3">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Status Sekolah </span>
            </label>
          </div>
          <span class="ml-auto">
            <div class="flex justify-center">
              <div class="form-check form-switch">
                <button
                  class="btn btn-sm text-xs btn-base"
                  :class="{ 'btn-success ': status }"
                  @click="doUpdateStatus()"
                >
                  {{ statusKet }}
                </button>
              </div>
            </div>
          </span>
        </li>
      </ul>
    </div>
    <!-- End of profile card -->
    <div class="my-4"></div>
    <!-- Friends card -->
    <div class="bg-base-100 p-3 hover:shadow">
      <div
        class="flex items-center space-x-3 font-semibold text-base-content text-xl leading-8"
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
            class="bg-base-100 lg:w-full py-2"
            :class="[subMenuActive == 'dashboard' ? pagesActiveClass : '']"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailDashboard', params: { id } }"
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
              <span class="ml-3">Dashboard Sekolah</span>
            </router-link>
          </li>
          <li
            class="bg-base-100 lg:w-full py-0"
            :class="[subMenuActive == 'siswa' ? pagesActiveClass : '']"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailSiswa', params: { id } }"
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
              <span class="ml-3"> Siswa </span>
            </router-link>
          </li>
          <li
            class="bg-base-100 lg:w-full py-0"
            :class="[subMenuActive == 'kelas' ? pagesActiveClass : '']"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailKelas', params: { id } }"
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
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ml-3">Kelas </span>
            </router-link>
          </li>
          <li
            class="bg-base-100 lg:w-full py-0"
            :class="[subMenuActive == 'walikelas' ? pagesActiveClass : '']"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailWalikelas', params: { id } }"
              class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fill-rule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ml-3">Wali Kelas </span>
            </router-link>
          </li>
          <li
            class="bg-base-100 lg:w-full py-0"
            :class="[subMenuActive == 'pengguna' ? pagesActiveClass : '']"
          >
            <router-link
              :to="{ name: 'AdminSekolahDetailPengguna', params: { id } }"
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
                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
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
          class="flex items-center space-x-3 font-semibold text-base-content text-xl leading-8 pt-2"
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
              class="bg-base-100 lg:w-full py-2"
              :class="[
                subMenuActive == 'hasilpsikolgi' ? pagesActiveClass : '',
              ]"
            >
              <router-link
                :to="{
                  name: 'AdminSekolahDetailHasilpsikologi',
                  params: { id },
                }"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span class="ml-3">Hasil Psikologi</span>
              </router-link>
            </li>
            <li
              class="bg-base-100 lg:w-full py-0"
              :class="[
                subMenuActive == 'nilaipsikolgisiswa' ? pagesActiveClass : '',
              ]"
            >
              <router-link
                :to="{
                  name: 'AdminSekolahDetailNilaipsikolgiSiswa',
                  params: { id },
                }"
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span class="ml-3"> Nilai Psikologi Siswa </span>
              </router-link>
            </li>
            <li
              class="bg-base-100 lg:w-full py-0"
              :class="[subMenuActive == 'minatbakat' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailMinatbakat', params: { id } }"
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
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Analisa Minat dan Bakat </span>
              </router-link>
            </li>
            <li
              class="bg-base-100 lg:w-full py-0"
              :class="[subMenuActive == 'penjurusan' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailPenjurusan', params: { id } }"
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
                    d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Analisa Penjurusan </span>
              </router-link>
            </li>
            <li
              class="bg-base-100 lg:w-full py-0"
              :class="[subMenuActive == 'kasus' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailKasus', params: { id } }"
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
              class="bg-base-100 lg:w-full py-0"
              :class="[
                subMenuActive == 'pengembangandiri' ? pagesActiveClass : '',
              ]"
            >
              <router-link
                :to="{
                  name: 'AdminSekolahDetailPengembangandiri',
                  params: { id },
                }"
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
                <span class="ml-3">Catatan Pengembangan Diri Siswa</span>
              </router-link>
            </li>
            <li
              class="bg-base-100 lg:w-full py-0"
              :class="[subMenuActive == 'prestasi' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminSekolahDetailPrestasi', params: { id } }"
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

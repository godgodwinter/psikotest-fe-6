<script setup>
import CardLockedFitur from "@/components/organismes/CardLockedFitur.vue";
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";

import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
// const paket = computed(() => storeGuruBk.getPaket);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(paket.value);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("hasilpsikologi");

const router = useRouter();
const route = useRoute();

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);
const dataDetail = ref([]);
const siswa = ref([]);
const aspekKepribadianRank = ref([]);
const temp = ref([{ nama: "" }]);
const kecerdasan = ref([]);
const tempPositifDiungkap = ref([]);
const paket = ref([]);

const getDataId = async () => {
  try {
    const response = await Api.get(
      `guest/hasilpsikologi/kecerdasanmajemuk/${route.params.id2}`
    );
    dataAsli.value = response.data;
    data.value = response.data;
    siswa.value = response.siswa;
    paket.value = response.siswa.paket;

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data Siswa tidak ditemukan!");
    console.error(error);
  }
};
getDataId();
const triggetData = ref("");

const id = route.params.id;
const id2 = route.params.id2;

const encode = (value) => window.btoa(value);

const doCetak = (id = null, token = moment().format("YYYY-MM-Do")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/kecerdasanmajemuk/${encode(
        id2
      )}?token=${encode(token)}`
    );
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        <!-- {{ dataAsli.nama }} -->
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Kecerdasan Majemuk <BreadCrumbSpace /> Index
        </template>
      </BreadCrumb>
    </div>
  </div>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm px-2"
        >8 KECERDASAN MAJEMUK DENGAN GAYA BELAJAR
      </span>

      <ButtonCetak @click="doCetak(id2)" />
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link :to="{ name: 'AdminHasilPsikologi' }">
        <button
          class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
        >
          <svg
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
          </svg>
          Kembali
        </button></router-link
      >
    </div>
  </div>

  <div v-if="paket.kecerdasanmajemuk != 'Aktif'">
    <CardLockedFitur />
  </div>

  <div v-else>
    <div v-if="siswa">
      <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
          <div class="bg-white shadow rounded-lg px-4 py-4">
            <div class="overflow-x-auto">
              <table class="table table-compact">
                <tbody>
                  <!-- row 1 -->
                  <tr>
                    <td class="whitespace-nowrap w-1/12">No Induk</td>
                    <td class="whitespace-nowrap w-1/12">:</td>
                    <td class="whitespace-nowrap w-10/12">
                      {{ siswa.nomeridentitas }}
                    </td>
                  </tr>
                  <!-- row 2 -->
                  <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{{ siswa.nama }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Umur</td>
                    <td>:</td>
                    <td>{{ siswa.umur }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{{ siswa.jk }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Sekolah</td>
                    <td>:</td>
                    <td>{{ siswa.sekolah_nama }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
          <div class="bg-white shadow rounded-lg px-4 py-4">
            <div class="overflow-x-auto px-4 space-y-10 py-4">
              <div class="space-y-2">
                <h1
                  class="text-lg font-bold text-gray-700 py-2 bg-gray-100 shadow"
                ></h1>
                <div
                  class="space-y-2 border-b-2 py-2"
                  v-for="(item, index) in data"
                >
                  <h1
                    class="text-lg font-bold text-gray-700 py-2 bg-gray-100 capitalize"
                  >
                    {{ index + 1 }}. {{ item.nama }} - {{ item.persen }} -
                    {{ item.kepanjangan }}
                  </h1>
                  <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                    a. VISUAL :
                  </h1>

                  <p class="indent-8 text-gray-700">
                    {{ item.data ? item.data.visual : "" }}
                  </p>
                  <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                    b. Auditif
                  </h1>

                  <p class="indent-8 text-gray-700">
                    {{ item.data ? item.data.auditif : "" }}
                  </p>
                  <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                    c. Kinestetik
                  </h1>
                  <p class="indent-8 text-gray-700">
                    {{ item.data ? item.data.kinestetik : "" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

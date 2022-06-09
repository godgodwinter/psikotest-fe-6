<script setup>
import { ref, computed, watch } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreGuruBk } from "@/stores/guruBk";
import { useRouter, useRoute } from "vue-router";

import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Toast from "@/components/lib/Toast.js";
import Api from "@/axios/axios";

moment.updateLocale("id", localization);
const storeGuruBk = useStoreGuruBk();
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("dashboard");

const router = useRouter();
const route = useRoute();
const getPaket = computed(() => storeGuruBk.getPaket);
const getStats = computed(() => storeGuruBk.getStats);
const getSekolah = computed(() => storeGuruBk.getSekolah);
const getIdentitas = computed(() => storeGuruBk.getIdentitas);
const data = ref([]);
const dataDetail = ref({
  nama: getIdentitas.value.nama,
  nomeridentitas: getIdentitas.value.nomeridentitas,
  alamat: getIdentitas.value.alamat,
  jk: getIdentitas.value.jk,
  tempatlahir: getIdentitas.value.tempatlahir,
  tgllahir: getIdentitas.value.tgllahir,
  usia: getIdentitas.value.usia,
  agama: getIdentitas.value.agama,
  anak: getIdentitas.value.anak,
  kandung: getIdentitas.value.kandung,
  angkat: getIdentitas.value.angkat,
  tiri: getIdentitas.value.tiri,
  statusanak: getIdentitas.value.statusanak,
  bahasa: getIdentitas.value.bahasa,
  tinggal: getIdentitas.value.tinggal,
  jarak: getIdentitas.value.jarak,
  telp: getIdentitas.value.telp,
  kelas_id: {
    label: `${getIdentitas.value.kelas ? getIdentitas.value.kelas.nama : ""}`,
    id: getIdentitas.value.kelas_id,
  },
});

const id = getSekolah.value.id;
// validasi
const validateData = (value) => {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 1) {
    return "This Field must be at least 2 characters";
  }
  return true;
};
const onSubmit = () => {
  // const res = doStoreData();
};

const doStoreData = async (d) => {
  let dataStore = {
    nama: dataDetail.value.nama,
    nomeridentitas: dataDetail.value.nomeridentitas,
    alamat: dataDetail.value.alamat,
    jk: dataDetail.value.jk,
    // kelas_id: dataDetail.value.kelas_id.id,
    tempatlahir: dataDetail.value.tempatlahir,
    tgllahir: dataDetail.value.tgllahir,
    usia: dataDetail.value.usia,
    agama: dataDetail.value.agama,
    anak: dataDetail.value.anak,
    kandung: dataDetail.value.kandung,
    angkat: dataDetail.value.angkat,
    tiri: dataDetail.value.tiri,
    statusanak: dataDetail.value.statusanak,
    bahasa: dataDetail.value.bahasa,
    tinggal: dataDetail.value.tinggal,
    jarak: dataDetail.value.jarak,
    telp: dataDetail.value.telp,
  };
  try {
    const response = await Api.post(`ortu/myprofile/update`, dataStore);
    Toast.success("Success", "Data Berhasil update!");
    router.go();
    // resetForm();

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
// vue pinia watch
storeGuruBk.$subscribe((mutation, state) => {});

const dataKelas = ref([]);
let pilihKelas = ref([]);
// get Kelas
const getDataKelas = async () => {
  try {
    const response = await Api.get(`ortu/datasekolah/${id}/kelas`);
    // console.log(response);
    dataKelas.value = response.data;
    dataKelas.value.forEach((item) => {
      pilihKelas.value.push({
        label: item.nama,
        id: item.id,
      });
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
// getDataKelas();
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
        >Dashboard</span
      >
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Dashboard <BreadCrumbSpace /> Index
        </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="md:px-10 py-4">
    <div class="alert alert-info shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Selamat Datang di Menu Administrator.</span>
      </div>
    </div>
  </div>

  <div class="px-4 py-4">
    <div class="stats shadow stats-vertical md:stats-horizontal">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Yayasan</div>
        <div class="stat-value">{{ getStats.kelas }} Yayasan</div>
        <!-- <div class="stat-desc">Last Updated : 21 Juni 2022</div> -->
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Sekolah</div>
        <div class="stat-value">{{ getStats.kelas }} Sekolah</div>
        <!-- <div class="stat-desc">Last Updated : 21 Juni 2022</div> -->
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Kelas</div>
        <div class="stat-value">{{ getStats.kelas }} Kelas</div>
        <!-- <div class="stat-desc">Last Updated : 21 Juni 2022</div> -->
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Siswa</div>
        <div class="stat-value">{{ getStats.siswa }} Siswa</div>
        <!-- <div class="stat-desc">Last Updated : 21 Juni 2022</div> -->
      </div>
    </div>
  </div>
</template>

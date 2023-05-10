<script setup>
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast.js";
import { useStoreGuruBk } from "@/stores/guruBk";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";
const storeGuruBk = useStoreGuruBk();
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("hasilpsikologi");

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const dataAsli = ref([]);
const data = ref([]);
const dataKelas = ref([]);
let pilihKelas = ref([]);


const inputCariKelas = ref();


const getDataKelas = async () => {
  try {
    const response = await Api.get(`owner/datasekolah/${id}/kelas`);
    // console.log(response);
    dataKelas.value = response.data;
    if (dataKelas.value.length > 0) {
      // console.log(dataKelas.value[0].id);
      if (kelas_id.value == 0) {
        kelas_id.value = dataKelas.value[0].id;
      }
      dataKelas.value.forEach((item) => {
        pilihKelas.value.push({
          label: item.nama,
          id: item.id,
        });
      });
      // console.log(kelas_id.value);
      getData(kelas_id.value);
    }
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataKelas();


const doPilihKelas = () => {
  // console.log(inputCariKelas.value.id);
  if (inputCariKelas.value) {
    router.push({
      name: "AdminHasilPsikologi",
      params: {
        kelas_id: inputCariKelas.value.id,
      },
    });
    fnSetToTempSekolah(id, inputCariKelas.value.id, inputCariKelas.value.label);
    getData(inputCariKelas.value.id);
  } else {
    Toast.danger("Warning", "Pilih Kelas Terlebih Dahulu");
  }
};

const getTempSekolah = computed(() => storeGuruBk.getTempSekolah);

const fnCariDataTempSekolahWhereSekolahId = (id) => {
  let tempSekolah = storeGuruBk.getTempSekolah;
  console.log(id, tempSekolah);
  return tempSekolah ? tempSekolah.filter((item) => item.id == id) : [];
}

const getDataSekolah = fnCariDataTempSekolahWhereSekolahId(id);

const fnSetToTempSekolah = (sekolah_id, kelas_id, nama_kelas) => {
  let obj = {
    id: sekolah_id,
    kelas_id: kelas_id,
    nama_kelas: nama_kelas,
  }
  // console.log("objek", obj);
  let temp = getTempSekolah.value;
  console.log("temp", temp);
  if (temp.length > 0) {
    let periksa = temp.filter((x) => x.id == obj.id);
    console.log("periksa:", periksa)
    if (periksa.length > 0) {
      temp.forEach((x, index) => {
        if (x.id == obj.id) {
          x.kelas_id = obj.kelas_id,
            x.nama_kelas = obj.nama_kelas
        }
      })
    } else {
      temp.push(obj);
    }
  } else {
    temp.push(obj);
  }
  // console.log(temp);
  // console.log(getTempSekolah);
  storeGuruBk.setTempSekolah(temp)
}

const getData = async (kelas_id) => {
  try {
    dataAsli.value = [];
    data.value = [];
    const response = await Api.get(
      `owner/hasilpsikologi/withdetail/${kelas_id}/kelas`
    );
    dataAsli.value = response.data;
    data.value = dataAsli.value;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const columns = [
  {
    label: "Nama Siswa",
    field: "nama",
    type: "String",
  },
  {
    label: "Hasil Deteksi EQ, Sc.Q ,SQ",
    field: "deteksisq",
    type: "String",
  },
  {
    label: "Hasil Deteksi",
    field: "deteksi",
    type: "String",
  },
  {
    label: "Penanganan Masalah Deteksi",
    field: "deteksipenanganan",
    type: "String",
  },
  {
    label: "Sertifikat",
    field: "sertifikat",
    type: "String",
  },
  {
    label: "Kecerdasan Majemuk",
    field: "kecerdasanmajemuk",
    type: "String",
  },
  {
    label: "Terapis Karakter Positif",
    field: "terapis",
    type: "String",
  },
];

const encode = (value) => window.btoa(value);

const doCetakDeteksi = (kelas_id = kelas_id.value, token = moment().format("YYYY-MM-DD")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/deteksisq_perkelas/${encode(kelas_id)}?token=${encode(token)}`
    );
  }
};
const doCetakDeteksiMasalah = (id = null, token = moment().format("YYYY-MM-DD")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/deteksimasalah_perkelas/${id}`
    );
  }
};

</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm space-x-2">Hasil Psikologi kelas {{
        getDataSekolah.length > 0 ? getDataSekolah[0].nama_kelas : null
      }}</span>
      <!-- <button class="btn btn-warning btn-sm tooltip mr-2" data-tip="cetak Deteksi Sq" @click="doCetakDeteksi(kelas_id)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      </button>

      <button class="btn btn-warning btn-sm tooltip" data-tip="cetak Deteksi Masalah"
        @click="doCetakDeteksiMasalah(kelas_id)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>

      </button> -->
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
  </div>
  <div class="w-full bg-base-200 shadow py-4 px-4">
    <div class="flex justify-center">
      <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihKelas" v-model="inputCariKelas"
        v-bind:class="{ disabled: false }"></v-select>
      <div class="py-2">
        <button class="btn btn-sm btn-info p-2" @click="doPilihKelas()">
          Cari
        </button>
      </div>
    </div>
  </div>
  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-base-200 shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
            enabled: true,
          }" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-row="props">
              <span v-if="props.column.field == 'deteksisq'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <!-- {{ props.row.siswadetail.length }} -->
                  <div v-if="props.row.deteksi > 0">
                    <router-link :to="{
                      name: 'AdminSekolahDetailHasilpsikologiDeteksiSq',
                      params: { id, id2: props.row.id },
                    }">
                      <button data-tip="Deteksi" class="tooltip btn btn-success btn-sm text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg></button>
                    </router-link>
                  </div>
                  <button data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'deteksi'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <!-- {{ props.row.siswadetail.length }} -->
                  <div v-if="props.row.deteksi > 0">
                    <router-link :to="{
                      name: 'AdminSekolahDetailHasilpsikologiDeteksi',
                      params: { id, id2: props.row.id },
                    }">
                      <button data-tip="Deteksi" class="tooltip btn btn-success btn-sm text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg></button>
                    </router-link>
                  </div>
                  <button data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'deteksipenanganan'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <div v-if="props.row.deteksi > 0">
                    <router-link :to="{
                      name: 'AdminSekolahDetailHasilpsikologiPenanganan',
                      params: { id, id2: props.row.id },
                    }">
                      <button data-tip="Penanganan Masalah Deteksi"
                        class="tooltip btn btn-success btn-sm text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg></button>
                    </router-link>
                  </div>
                  <button data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'sertifikat'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <div v-if="props.row.sertifikat > 0">
                    <router-link :to="{
                      name: 'AdminSekolahDetailHasilpsikologiSertifikat',
                      params: { id, id2: props.row.id },
                    }">
                      <button data-tip="Sertifikat" class="tooltip btn btn-success btn-sm text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg></button>
                    </router-link>
                  </div>
                  <button data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'kecerdasanmajemuk'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <div v-if="props.row.sertifikat > 0">
                    <router-link :to="{
                      name: 'AdminSekolahDetailHasilpsikologiKecerdasanMajemuk',
                      params: { id, id2: props.row.id },
                    }">
                      <button data-tip="Kecerdasan Majemuk" class="tooltip btn btn-success btn-sm text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg></button>
                    </router-link>
                  </div>
                  <button data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'terapis'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <div v-if="props.row.sertifikat > 0">
                    <router-link :to="{
                      name: 'AdminSekolahDetailHasilpsikologiTerapis',
                      params: { id, id2: props.row.id },
                    }">
                      <button data-tip="Terapis" class="tooltip btn btn-success btn-sm text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg></button>
                    </router-link>
                  </div>
                  <button data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </button>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>

              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

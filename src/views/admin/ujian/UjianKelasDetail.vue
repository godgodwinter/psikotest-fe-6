<script setup>
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import Toast from "@/components/lib/Toast";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(sekolah.value.id);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("ujian");
const router = useRouter();
const route = useRoute();

const ujian_proses_id = route.params.ujian_proses_id;
const proses_kelas_id = route.params.proses_kelas_id;
// const siswa_id = route.params.siswa_id;

const dataAsli = ref([]);
const data = ref([]);

const kelas = ref(null);
const columns = [
  {
    label: "Actions",
    field: "actions",
    sortable: false,
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  {
    label: "Nama Siswa",
    field: "nama",
    type: "String",
  },
  {
    label: "Jumlah Kategori Soal",
    field: "kategori_jml",
    type: "String",
  },
  {
    label: "Proses",
    field: "proses",
    type: "String",
  },
  {
    label: "Selesai",
    field: "selesai",
    type: "String",
  },
  {
    label: "Username Siswa",
    field: "username",
    type: "String",
  },
  {
    label: "PassDefault Siswa",
    field: "passworddefault",
    type: "String",
  },
  {
    label: "Siswa id",
    field: "siswa_id",
    type: "String",
  },
  {
    label: "Status",
    field: "status",
    type: "String",
  },
];

const getData = async () => {
  try {
    const response = await Api.get(
      `admin/menuujian/proseskelas/${ujian_proses_id}/kelas/${proses_kelas_id}`
    );
    dataAsli.value = response.data;
    data.value = response.data;
    kelas.value = response.kelas;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();
const dataProses = ref([]);
const getDataProses = async () => {
  try {
    const response = await Api.get(`admin/menuujian/proses/${ujian_proses_id}`);
    dataProses.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataProses();
const doEditData = async (id, index) => {
  router.push({
    name: "AdminSekolahEdit",
    params: { id: id },
  });
};
const doDeleteData = async (id, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(
        `admin/menuujian/proseskelas/kelas/${id}`
      );
      // let data = dataAsli.value.filter((item) => item.id !== id);
      // storeUjian.setDataPaketsoal(data);
      // getDataId(kategori_id);
      Toast.success("Info", "Data berhasil dihapus!");
      getData();
      return true;
    } catch (error) {
      console.error(error);
    }
  }
};

const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";

const encode = (value) => window.btoa(value);
const doExportPerKelas = async (id = null, token = moment().format("YYYY-MM-DD")) => {
  if (confirm("Apakah anda yakin mengExport data ini?")) {
    // window.location.href = `admin/menuujian/cetak/${proses_kelas_id}`;
    // console.log(id, token);
    window.open(
      `${BASE_URL}api/admin/menuujian/cetak/${encode(id)}?token=${encode(token)}`
    );
    // try {
    //   const response = await Api.get(
    //     `admin / menuujian / cetak / ${ proses_kelas_id }`
    //   );

    //   return true;
    // } catch (error) {
    //   console.error(error);
    // }
  }
};
const doExportPerKelasPerSoal = async (id = null, token = moment().format("YYYY-MM-DD")) => {
  if (confirm("Apakah anda yakin mengExport data ini?")) {
    // window.location.href = `admin/menuujian/cetak/${proses_kelas_id}`;
    // console.log(id, token);
    window.open(
      `${BASE_URL}api/admin/menuujian/cetak_persoal/${encode(id)}?token=${encode(token)}`
    );
    // try {
    //   const response = await Api.get(
    //     `admin / menuujian / cetak / ${ proses_kelas_id }`
    //   );

    //   return true;
    // } catch (error) {
    //   console.error(error);
    // }
  }
};
const doGeneratePerkelas = async (kelas_id = kelas_id.value) => {
  if (confirm("Apakah anda yakin generate data ini?")) {
    try {
      const response = await Api.get(
        `admin/hasil_ujian_lintas/kelas/${kelas_id}`
      );
      Toast.success("Info", "Proses Generate berhasil!")
      return response.data;
    } catch (error) {
      Toast.danger("Warning", "Proses Generate gagal!")
      console.error(error);
    }
  };
};
const doGeneratePerSiswa = async (siswa_id) => {
  if (confirm("Apakah anda yakin generate data ini?")) {
    try {
      const response = await Api.get(
        `admin/hasil_ujian_lintas/siswa/${siswa_id}`
      );
      Toast.success("Info", "Proses Generate berhasil!")
      return response.data;
    } catch (error) {
      Toast.danger("Warning", "Proses Generate gagal!")
      console.error(error);
    }
  };
};

const doCopyClipboard = (item) => {
  navigator.clipboard.writeText(item);
  Toast.babeng("Info", `${item} berhasil disalin`);
};
</script>
<template>
  <h1 class="text-lg font-bold">SEKOLAH : {{ dataProses.nama }}</h1>
  <div v-if="kelas">
    <h1 class="text-lg font-bold">KELAS : {{ proses_kelas_id }} {{ kelas.nama }}</h1>

    <button @click="doGeneratePerkelas(kelas.id)" class="btn btn-danger btn-sm tooltip" data-tip="generate">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>

    </button>
  </div>
  <!-- <h1 class="text-lg font-bold">Berisi SISWA sedang ujian DALAM KELAS INI</h1> -->
  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :sort-options="{
            enabled: true,
            initialSortBy: { field: 'nama', type: 'asc' }
          }" :line-numbers="true" :columns="columns" :rows="data" :search-options="{
  enabled: true,
}" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-actions>
              <div class="space-x-1 space-y-1 gap-1">
                <button class="btn btn-sm btn-secondary tooltip" data-tip="Refresh Data" @click="getData()">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
                <!-- <router-link :to="{
                  name: 'admin.ujian.kelas.create',
                  params: {
                    ujian_proses_id,
                  },
                }">
                  <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah SOAL">
                    TAMBAH KELAS

                  </button>
                </router-link> -->

                <button class="btn btn-sm btn-warning tooltip" data-tip="Export Data KELAS"
                  @click="doExportPerKelas(proses_kelas_id)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </button>
                <button class="btn btn-sm btn-primary tooltip" data-tip="Export Data LENGKAP"
                  @click="doExportPerKelasPerSoal(proses_kelas_id)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </button>
              </div>
            </template>
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                  <router-link :to="{
                    name: 'admin.ujian.kelas.detail.siswa',
                    params: { ujian_proses_id, proses_kelas_id, siswa_id: props.row.id },
                  }">
                    <button class="btn btn-sm btn-primary tooltip" data-tip="Detail">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </router-link>
                  <!-- <button class="btn btn-sm btn-warning tooltip" data-tip="Cetak HASIL UJIAN"
                    @click="doCetakHasilUjian(siswa_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </button> -->

                  <button @click="doGeneratePerSiswa(props.row.siswa_id)" class="btn btn-danger btn-sm tooltip"
                    data-tip="generate">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>

                  </button>

                  <!-- {{ props.row.siswa_id }} -->
                  <!-- <button class="btn btn-sm btn-danger" @click="doDeleteData(props.row.id, props.index)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </button> -->

                  <!-- <button class="btn btn-sm btn-warning tooltip" data-tip="Export Data SISWA">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </button> -->
                </div>
              </span>
              <span v-else-if="props.column.field == 'username'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.username }}</div>
                  <span v-if="props.row.username" @click="doCopyClipboard(props.row.username)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'passworddefault'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.passworddefault }}</div>
                  <span v-if="props.row.passworddefault" @click="doCopyClipboard(props.row.passworddefault)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
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

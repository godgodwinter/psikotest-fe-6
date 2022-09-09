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
    field: "siswa_jml",
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
</script>
<template>
  <h1 class="text-lg font-bold">SEKOLAH : {{ dataProses.nama }}</h1>
  <h1 class="text-lg font-bold">KELAS : {{ proses_kelas_id }}</h1>
  <!-- <h1 class="text-lg font-bold">Berisi SISWA sedang ujian DALAM KELAS INI</h1> -->
  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
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

                <button class="btn btn-sm btn-warning tooltip" data-tip="Export Data KELAS">
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
                  <!-- <button class="btn btn-sm btn-danger" @click="doDeleteData(props.row.id, props.index)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </button> -->

                  <button class="btn btn-sm btn-warning tooltip" data-tip="Export Data SISWA">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </button>
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

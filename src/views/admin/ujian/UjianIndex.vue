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
const sekolah = computed(() => storeGuruBk.getSekolah);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(sekolah.value.id);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("ujian");
const router = useRouter();
const route = useRoute();

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
    label: "Nama",
    field: "nama",
    type: "String",
  },
  {
    label: "Tanggal",
    field: "tgl",
    type: "String",
  },
  {
    label: "Jumlah Siswa",
    field: "jml_siswa",
    type: "String",
  },
  {
    label: "Jumlah Kelas",
    field: "jml_kelas",
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
    const response = await Api.get(`admin/menuujian/proses`);
    dataAsli.value = response.data;
    data.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();
const doEditData = async (id, index) => {
  router.push({
    name: "AdminSekolahEdit",
    params: { id: id },
  });
};

const doDeleteData = async (id, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(`admin/menuujian/proses/${id}`);
      if (response.status) {
        Toast.warning("Berhasil", response.message);
        // Toast.success("Info", "Data berhasil dihapus!");
      } else {
        Toast.warning("Gagal", response.message);
      }
      getData();
      return true;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<template>
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
                <router-link :to="{
                  name: 'admin.ujian.create',
                }">
                  <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah SOAL">
                    TAMBAH SEKOLAH
                    <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clip-rule="evenodd"
                        />
                      </svg> -->
                  </button>
                </router-link>
              </div>
            </template>
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                  <router-link :to="{
                    name: 'admin.ujian.kelas',
                    params: { ujian_proses_id: props.row.id },
                  }">
                    <button class="btn btn-sm btn-primary tooltip" data-tip="Detail">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg></button>
                  </router-link>
                  <button class="btn btn-sm btn-danger" @click="doDeleteData(props.row.id, props.index)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </span>

              <span v-else-if="props.column.field == 'tgl'">
                <div class="text-center">
                  {{ moment(props.row.tgl).format("DD MMMM YYYY") }}
                </div>
              </span>
              <span v-else-if="props.column.field == 'jml_siswa'">
                <div class="text-center">{{ props.row.jml_siswa }} Siswa</div>
              </span>
              <span v-else-if="props.column.field == 'jml_kelas'">
                <div class="text-center">{{ props.row.jml_kelas }} Kelas</div>
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

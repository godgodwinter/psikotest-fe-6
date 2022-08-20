<script setup>
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast.js";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("penjurusan");

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const dataAsli = ref([]);
const data = ref([]);
const dataKelas = ref([]);


// get Kelas
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
// console.log(kelas_id.value);
const inputCariKelas = ref();

let pilihKelas = ref([
  // {
  //   label: "Belum masuk Kelas",
  //   id: "Belum masuk Kelas",
  // },
]);

const doPilihKelas = () => {
  // console.log(inputCariKelas.value.id);
  router.push({
    name: "AdminSekolahDetailPenjurusan",
    params: {
      id: id,
      kelas_id: inputCariKelas.value.id,
    },
  });
  getData(inputCariKelas.value.id);
};


const getData = async (kelas_id) => {
  try {
    dataAsli.value = [];
    data.value = [];
    linkExport.value =
      BASE_URL +
      "api/admin/proses/export/datasiswa/" +
      id +
      "/kelas/" +
      kelas_id +
      "/get?listdata=" +
      listData.value;
    const response = await Api.get(
      `admin/datasekolah/datasiswa/withsertifikat/kelas/${kelas_id}`
    );
    dataAsli.value = response.data;

    dataAsli.value.forEach((item, index) => {
      let tempDataList = {};
      if (item.sertifikat_data) {
        ListTampilkan.value.forEach((listItem) => {
          tempDataList[listItem.id] = item.sertifikat_data[listItem.id];
        });
      }
      // console.log(tempDataList);
      data.value.push({
        ...item,
        nama: item.nama,
        id: item.id,
        kelas: `${item.kelas ? item.kelas.nama : ""}`,
      });

      ListTampilkan.value.forEach((listItem) => {
        data.value[index][listItem.id] = tempDataList[listItem.id];
      });
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// getData();


const columns = ref([
  {
    label: "No",
    field: "no",
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
    label: "Kelas",
    field: "kelas_nama",
    type: "String",
  },
  {
    label: "Tipe Minat - Bakat Rank 1",
    field: "tipe_bakat_1",
    type: "String",
  },
]);
// seleksi yang ditampilkan
const ListTampilkan = ref([
  { label: "Tipe Minat - Bakat Rank 1", id: "tipe_bakat_1", checked: true },
  { label: "Tipe Minat - Bakat Rank 2", id: "tipe_bakat_2", checked: false },
  { label: "Tipe Minat - Bakat Rank 3", id: "tipe_bakat_3", checked: false },
  {
    label: "Studi lanjut dari SMP yg diinginkan",
    id: "mnt_studi_lanjut_smp",
    checked: false,
  },
  {
    label: "Jurusan SMA yg diinginkan",
    id: "mnt_studi_lanjut_sma",
    checked: false,
  },
  {
    label: "Jurusan SMK yg diinginkan 1",
    id: "mnt_studi_lanjut_smk_1",
    checked: false,
  },
  {
    label: "Jurusan SMK yg diinginkan 2",
    id: "mnt_studi_lanjut_smk_2",
    checked: false,
  },
  {
    label: "Jurusan SMK yg diinginkan 3",
    id: "mnt_studi_lanjut_smk_3",
    checked: false,
  },
  {
    label: "Disarankan Jurusan 1",
    id: "saran_fakultas_1",
    checked: false,
  },
  {
    label: "Dipertimbangkan Jurusan 2",
    id: "saran_fakultas_2",
    checked: false,
  },
  {
    label: "Tidak Disarankan Jurusan 3",
    id: "kesimpulan_tambahan",
    checked: false,
  },
  {
    label: "Studi Lanjut SMA/SMK Fakultas 1",
    id: "mnt_studi_lanjut_sma_smk_1_fakultas",
    checked: false,
  },
  {
    label: "Studi Lanjut SMA/SMK Prodi 1",
    id: "mnt_studi_lanjut_sma_smk_1_prodi",
    checked: false,
  },
  {
    label: "Studi Lanjut SMA/SMK Fakultas 2",
    id: "mnt_studi_lanjut_sma_smk_2_fakultas",
    checked: false,
  },
  {
    label: "Studi Lanjut SMA/SMK Prodi 2",
    id: "mnt_studi_lanjut_sma_smk_2_prodi",
    checked: false,
  },
  {
    label: "Studi Lanjut SMA/SMK Kedinasan",
    id: "mnt_studi_lanjut_sma_smk_kedinasan",
    checked: false,
  },
  {
    label: "Sekolah Lanjutan",
    id: "sekolah_lanjutan",
    checked: false,
  },
  {
    label: "Sekolah Jurusan",
    id: "sekolah_jurusan",
    checked: false,
  },
  {
    label: "Saran ke Fakultas 1",
    id: "saran_fakultas_1",
    checked: false,
  },
  {
    label: "Saran ke Fakultas 1 Prodi",
    id: "saran_fakultas_1_prodi",
    checked: false,
  },
  {
    label: "Saran ke Fakultas 2",
    id: "saran_fakultas_2",
    checked: false,
  },
  {
    label: "Saran ke Fakultas 2 Prodi",
    id: "saran_fakultas_2_prodi",
    checked: false,
  },
  {
    label: "Keterangan",
    id: "keterangan",
    checked: false,
  },
]);

const onToggleList = (index) => {
  ListTampilkan.value[index].checked = !ListTampilkan.value[index].checked;

  if (ListTampilkan.value[index].checked) {
    columns.value.push({
      label: ListTampilkan.value[index].label,
      field: ListTampilkan.value[index].id,
      type: ListTampilkan.value[index].type
        ? ListTampilkan.value[index].type
        : "String",
    });
  } else {
    columns.value.forEach((item, index2) => {
      if (item.field === ListTampilkan.value[index].id) {
        columns.value.splice(index2, 1);
      }
    });
  }
};

const listData = ref("kb_persen");
watch(ListTampilkan.value, (newValue, oldValue) => {
  listData.value = [];
  ListTampilkan.value.forEach((item, index) => {
    if (item.checked) {
      listData.value.push(item.id);
    }
  });
  linkExport.value = BASE_URL +
    "api/admin/proses/export/datasiswa/" +
    id +
    "/kelas/" +
    kelas_id.value +
    "/get?listdata=" +
    listData.value;
});
const linkExport = ref(
  BASE_URL +
  "api/admin/proses/export/datasiswa/" +
  id +
  "/kelas/" +
  kelas_id.value +
  "/get?listdata=" +
  listData.value
);
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">
        Analisa Penjurusan</span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
  </div>
  <div class="w-full bg-base-200 shadow py-4 px-4">
    <div class="flex justify-center gap-2">
      <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihKelas" v-model="inputCariKelas"
        v-bind:class="{ disabled: false }"></v-select>
      <div class="py-2">
        <button class="btn btn-sm btn-info p-2" @click="doPilihKelas()">
          Cari
        </button>
      </div>

      <a :href="linkExport" target="_blank">
        <button class="btn hover:shadow-lg btn-success shadow text-white hover:text-gray-100 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Export
        </button>
      </a>
    </div>
  </div>

  <div class="w-full bg-base-200 shadow shadow-md py-4 px-4">
    <div class="flex justify-center gap-2 w-full flex-wrap">
      <div class="collapse">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium bg-gray-300 rounded-lg text-gray-600 text-center">
          List Pilihan Data
        </div>
        <div class="collapse-content">
          <div class="flex justify-center gap-2 w-full lg:w-10/12 2xl:w-full flex-wrap py-2">
            <div v-for="(item, index) in ListTampilkan">
              <div class="form-control">
                <label class="cursor-pointer label" @click="onToggleList(index)">
                  <span class="label-text px-2">{{ item.label }}</span>
                  <input type="checkbox" :checked="item.checked" class="checkbox checkbox-secondary" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-10/12 2xl:w-full">
      <div class="bg-base-200 shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :columns="columns" :rows="data" :search-options="{
            enabled: true,
          }" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-row="props">
              <span v-if="props.column.field == 'deteksi'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <!-- {{ props.row.siswadetail.length }} -->
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link :to="{
                      name: 'AdminSekolah',
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
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link :to="{
                      name: 'AdminSekolah',
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
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link :to="{
                      name: 'AdminSekolah',
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
              <span v-else-if="props.column.field == 'terapis'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link :to="{
                      name: 'AdminSekolah',
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

<script setup>
const BASE_URL = import.meta.env.VITE_API_URL;
import Api from "@/axios/axios";
import axios from "axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast";

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const sekolah = computed(() => storeGuruBk.getSekolah);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(sekolah.value.id);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("apiprobk");
const router = useRouter();
const route = useRoute();
const dataAsli = ref([]);
const data = ref([]);

const getData = async () => {
  try {
    const response = await Api.get(`owner/apiprobk/all`);
    // console.log(response);
    dataAsli.value = response.data;
    data.value = response.data;
    countData.value = data.value.filter(
      (item) => item.sertifikat == "belum"
    ).length;

    countDataSinkron.value = data.value.filter(
      (item) =>
        item.sertifikat == "sudah" &&
        item.deteksi == "sudah" &&
        item.sinkron == "belum"
    ).length;
    diProses.value = 0;
    diProsesSinkron.value = 0;
    // console.log(data.value);
    return response;
  } catch (error) {
    // Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};

getData();
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
    label: "Username",
    field: "username",
    type: "String",
  },
  {
    label: "Sertifikat",
    field: "sertifikat",
    type: "String",
  },
  {
    label: "Status Get Data",
    field: "sertifikat_tgl",
    type: "String",
  },
  {
    label: "Deteksi",
    field: "deteksi",
    type: "String",
  },
  {
    label: "Status Deteksi Data",
    field: "deteksi_tgl",
    type: "String",
  },
  {
    label: "Sinkron",
    field: "sinkron",
    type: "String",
  },
  {
    label: "Status Sinkron Data",
    field: "sinkron_tgl",
    type: "String",
  },
];

const doEditData = async (id, index) => {
  // router.push({
  //   name: "AdminSekolahEdit",
  //   params: { id: id },
  // });
};

const doDeleteData = async (id, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    // try {
    //   const response = await Api.delete(`admin/sekolah/${id}`);
    //   data.value.splice(index, 1);
    //   Toast.success("Success", "Data Berhasil dihapus!");
    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    // }
  }
};

const file = ref(null);
let formData = new FormData();
const doStoreData = async (d) => {
  // console.log(data);
  try {
    // const response = await Api.post("testing/apiprobk/upload", formData);
    const response = await Api.post(`owner/apiprobk/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response.data);
    // Toast.success("Success", "Data Berhasil ditambahkan!");
    getData();
    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const doSubmitFile = async () => {
  formData.append("file", file.value.files[0]);
  doStoreData();
};

const doClearTemp = async (d) => {
  // console.log(data);
  try {
    // const response = await Api.post("testing/apiprobk/upload", formData);
    const response = await Api.post(`owner/proses/cleartemp`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response.data);
    Toast.success("Success", "Clear Temporary File Berhasil dilakukan!");
    // getData();
    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const countData = ref(0);
const diProses = ref(0);
const progressBarValue = ref(0);
let dataForm = {};
let dataFormDeteksi = {};

watch(diProses, async (newQuestion, oldQuestion) => {
  if (newQuestion == oldQuestion) return;
  if (countData.value > 0) {
    progressBarValue.value = (
      (newQuestion / (countData.value * 2)) *
      100
    ).toFixed(2);

    if (progressBarValue.value == 100) {
      Toast.success("Info", "Proses Backup Selesai!");
    }
  }
});

const doStoreDataBackupSertifikat = async (d, index) => {
  try {
    const response = await Api.post("owner/apiprobk/api_backup", d);
    // console.log(response.data);
    // Toast.success("Success", "Data Berhasil ditambahkan!");
    data.value[index].deteksi = "sudah";
    diProses.value++;
    return response.data;
  } catch (error) {
    diProses.value++;
    data.value[index].deteksi = "gagal";
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const doStoreDataBackupDeteksi = async (d, index) => {
  // console.log(d);
  try {
    const response = await Api.post("owner/apiprobk/api_backup_deteksi", d);
    // console.log(response.data);
    // Toast.success("Success", "Data Berhasil ditambahkan!");
    data.value[index].deteksi = "sudah";
    diProses.value++;
    return response.data;
  } catch (error) {
    diProses.value++;
    data.value[index].deteksi = "gagal";
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const doProsesGetApiGagal = async (id, index) => {
  // console.log(d);
  try {
    const response = await Api.post("owner/apiprobk/gagal", {
      id: id,
    });
    // console.log(response.data);
    // Toast.warning("Warning", "Update Proses gagal!");
    data.value[index].sertifikat = "gagal";
    data.value[index].deteksi = "gagal";
    diProses.value++;
    return response.data;
  } catch (error) {
    diProses.value++;
    data.value[index].sertifikat = "gagal";
    data.value[index].deteksi = "gagal";
    // Toast.danger("Warning", "Data gagal diupdate!");
    console.error(error);
  }
};

const getDataFromApiUjianSertifikat = async (
  username,
  apiprobk_id = 0,
  index = 0
) => {
  try {
    const response = await axios.post(
      "http://185.227.135.32:9001/api/probk/DataSertifikat_Get",
      {
        username: username,
      },
      {
        headers: {},
      }
    );
    // console.log(response);
    dataForm = response.data;
    dataForm.apiprobk_id = apiprobk_id;
    // console.log(dataForm);
    doStoreDataBackupSertifikat(dataForm, index);
    data.value[index].sertifikat = "sudah";
    return response;
  } catch (error) {
    doProsesGetApiGagal(apiprobk_id, index);
    // data.value[index].sertifikat = "gagal";
    // Toast.danger("Warning", "Proses gagal");
    console.error(error);
  }
};

const getDataFromApiUjianDeteksi = async (
  username,
  apiprobk_id = 0,
  index = 0
) => {
  try {
    const response = await axios.post(
      "http://185.227.135.32:9001/api/probk/DataDeteksi_Get",
      {
        username: username,
      },
      {
        headers: {},
      }
    );
    // console.log(response);
    dataFormDeteksi = response.data;
    dataFormDeteksi.apiprobk_id = apiprobk_id;
    // console.log(dataFormDeteksi);
    doStoreDataBackupDeteksi(dataFormDeteksi, index);
    data.value[index].sertifikat = "sudah";
    return response;
  } catch (error) {
    doProsesGetApiGagal(apiprobk_id, index);
    // data.value[index].sertifikat = "gagal";
    // Toast.danger("Warning", "Proses gagal");
    console.error(error);
  }
};

const doBackup = async () => {
  if (confirm("Apakah anda yakin melakukan proses ini?")) {
    try {
      getData();
      Toast.success("Info", "Proses backup di mulai, Tunggu hingga selesai!");
      diProses.value = 0;
      // console.log("sync data");
      // foreach then getData then push on datatable
      // 2.async insert data from api to be
      for (let i = 0; i < data.value.length; i++) {
        if (
          data.value[i].sertifikat == "belum" ||
          data.value[i].sertifikat == "gagal"
        ) {
          getDataFromApiUjianSertifikat(
            data.value[i].username,
            data.value[i].id,
            i
          );
        }
        if (
          data.value[i].deteksi == "belum" ||
          data.value[i].deteksi == "gagal"
        ) {
          getDataFromApiUjianDeteksi(
            data.value[i].username,
            data.value[i].id,
            i
          );
        }
        // console.log(data.value[i].username);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const doBackupPerId = async (id, index, username) => {
  if (confirm("Apakah anda yakin melakukan backup data ini?")) {
    Toast.success("Info", "Proses backup di mulai, Tunggu hingga selesai!");
    // console.log(id, index, username);
    getDataFromApiUjianSertifikat(username, id, index);
    getDataFromApiUjianDeteksi(username, id, index);
    getData();
  }
};

const countDataSinkron = ref(0);
const diProsesSinkron = ref(0);
const progressBarValueSinkron = ref(0);

watch(diProsesSinkron, async (newQuestion, oldQuestion) => {
  if (newQuestion == oldQuestion) return;
  if (countDataSinkron.value > 0) {
    progressBarValueSinkron.value = (
      (newQuestion / countDataSinkron.value) *
      100
    ).toFixed(2);
    if (progressBarValueSinkron.value == 100) {
      Toast.success("Info", "Proses Sinkron Selesai!");
    }
  }
});
const doSendSinkronData = async (username, apiprobk_id = 0, index = 0) => {
  try {
    const response = await Api.post("owner/apiprobk/sinkron", {
      username: username,
      apiprobk_id: apiprobk_id,
    });
    // console.log(response.data);
    // Toast.success("Success", "Data Berhasil ditambahkan!");
    data.value[index].sinkron = "sudah";
    diProsesSinkron.value++;
    return response.data;
  } catch (error) {
    diProsesSinkron.value++;
    data.value[index].sinkron = "gagal";
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const doSinkronData = async () => {
  if (confirm("Apakah anda yakin melakukan Sinkron Data ini?")) {
    Toast.success("Info", "Proses Sinkron di mulai, Tunggu hingga selesai!");
    getData();
    // console.log("Sinkron Data");
    for (let i = 0; i < data.value.length; i++) {
      if (
        data.value[i].sertifikat == "sudah" &&
        data.value[i].deteksi == "sudah" &&
        data.value[i].sinkron == "belum"
      ) {
        doSendSinkronData(data.value[i].username, data.value[i].id, i);
      }
      // console.log(data.value[i].username);
    }
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
        >APIPROBK
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> APIPROBK <BreadCrumbSpace /> Index </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="md:pt-6">
    <div class="md:flex justify-between px-10">
      <div class="space-x-1 space-y-1 pt-1 md:pt-0">
        <!-- <router-link :to="{ name: 'AdminSekolahTambah' }">
          <button
            class="btn btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
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
            Tambah
          </button></router-link
        > -->
        <button
          @click="doBackup()"
          class="btn btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
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
          Backup
        </button>
        <button
          @click="doSinkronData()"
          class="btn btn-accent hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
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
          Sikron
        </button>
      </div>
      <div class="space-x-1 space-y-1 pt-1 md:pt-0">
        <label
          for="modalImport"
          class="btn modal-button btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
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
          Import
        </label>
        <!-- <button
          class="btn btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
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
          Export
        </button> -->
        <button
          class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
          @click="doClearTemp()"
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
          Clear Temp
        </button>
      </div>
    </div>
  </div>
  <div class="md:pt-6">
    <div class="md:flex justify-center px-10 gap-4">
      <div class="space-x-1 space-y-1 pt-1 md:pt-0 flex justify-end w-full">
        <div
          class="radial-progress bg-primary text-primary-content border-4 border-primary"
          :style="{ '--value': progressBarValue }"
        >
          {{ progressBarValue }}%
        </div>
      </div>
      <div class="space-x-1 space-y-1 pt-1 md:pt-0 w-full">
        <h1>Proses : {{ diProses }} / {{ countData * 2 }}</h1>
        <h1>Jumlah Data :{{ countData }}</h1>
      </div>

      <div class="space-x-1 space-y-1 pt-1 md:pt-0 flex justify-end w-full">
        <div
          class="radial-progress bg-accent text-accent-content border-4 border-accent"
          :style="{ '--value': progressBarValueSinkron }"
        >
          {{ progressBarValueSinkron }}%
        </div>
      </div>
      <div class="space-x-1 space-y-1 pt-1 md:pt-0 w-full">
        <h1>Proses : {{ diProsesSinkron }} / {{ countDataSinkron }}</h1>
        <h1>Jumlah Data :{{ countDataSinkron }}</h1>
      </div>
    </div>
  </div>

  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table
            :line-numbers="true"
            :columns="columns"
            :rows="data"
            :search-options="{
              enabled: true,
            }"
            :pagination-options="{
              enabled: true,
              perPageDropdown: [10, 20, 50],
            }"
            styleClass="vgt-table striped bordered condensed"
            class="py-0"
          >
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <button
                    @click="
                      doBackupPerId(
                        props.row.id,
                        props.index,
                        props.row.username
                      )
                    "
                    data-tip="Backup"
                    class="tooltip text-orange-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-orange-300 bg-orange-400 rounded-lg"
                  >
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>

              <span v-else-if="props.column.field == 'sertifikat'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <button
                    v-if="props.row.sertifikat == 'sudah'"
                    data-tip="Sukses"
                    class="tooltip text-green-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-green-300 bg-green-400 rounded-lg"
                  >
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </button>
                  <button
                    v-else-if="props.row.sertifikat == 'gagal'"
                    data-tip="Gagal"
                    class="tooltip text-red-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-red-300 bg-red-400 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    v-else
                    data-tip="Belum"
                    class="tooltip text-gray-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-gray-300 bg-gray-400"
                  >
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'deteksi'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <button
                    v-if="props.row.deteksi == 'sudah'"
                    data-tip="Sukses"
                    class="tooltip text-green-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-green-300 bg-green-400"
                  >
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </button>
                  <button
                    v-else-if="props.row.deteksi == 'gagal'"
                    data-tip="Gagal"
                    class="tooltip text-red-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-red-300 bg-red-400 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    v-else
                    data-tip="Belum"
                    class="tooltip text-gray-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-gray-300 bg-gray-400 rounded-lg"
                  >
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'sinkron'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <button
                    v-if="props.row.sinkron == 'sudah'"
                    data-tip="Sukses"
                    class="tooltip text-green-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-green-300 bg-green-400"
                  >
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </button>
                  <button
                    v-else-if="props.row.sinkron == 'gagal'"
                    data-tip="Gagal"
                    class="tooltip text-red-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-red-300 bg-red-400 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    v-else
                    data-tip="Belum"
                    class="tooltip text-gray-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-gray-300 bg-gray-400 rounded-lg"
                  >
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
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

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="modalImport" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <label
        for="modalImport"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="font-bold text-lg">Import data menggunakan .xlx / .xlxs !</h3>
      <div class="py-4">
        <input type="file" ref="file" />
        <button class="btn btn-info text-gray-100" @click="doSubmitFile()">
          Upload
        </button>
      </div>
      <div class="modal-action">
        <!-- <label for="modalImport" class="btn">Done!</label> -->
      </div>
    </div>
  </div>
</template>

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
storeAdminBar.setsubMenuActive("minatbakat");

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const dataAsli = ref([]);
const data = ref([]);

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
    label: "Minat Pekerjaan 1",
    field: "minat_pekerjaan_1",
    type: "String",
  },
]);
const getData = async () => {
  try {
    const response = await Api.get(
      `owner/datasekolah/${id}}/datasiswa/withsertifikat`
    );
    dataAsli.value = response.data;

    dataAsli.value.forEach((item, index) => {
      let tempDataList = {};
      if (item.siswadetailwithsertifikat) {
        ListTampilkan.value.forEach((listItem) => {
          tempDataList[listItem.id] =
            item.siswadetailwithsertifikat.apiprobkwithsertifikat.apiprobk_sertifikat[
              listItem.id
            ];
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
getData();

const dataKelas = ref([]);

const inputCariKelas = ref({
  label: "Semua Kelas",
  id: "Semua Kelas",
});

let pilihKelas = ref([
  {
    label: "Semua Kelas",
    id: "Semua Kelas",
  },
  {
    label: "Belum masuk Kelas",
    id: "Belum masuk Kelas",
  },
]);
// get Kelas
const getDataKelas = async () => {
  try {
    const response = await Api.get(`owner/datasekolah/${id}/kelas`);
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
getDataKelas();

const doPilihKelas = () => {
  if (inputCariKelas.value.id === "Semua Kelas") {
    // data.value = dataAsli.value.map((item, index) => {
    //   return {
    //     ...item,
    //     nama: item.nama,
    //     kelas: `${item.kelas ? item.kelas.nama : ""}`,
    //   };
    // });

    dataAsli.value.forEach((item, index) => {
      let tempDataList = {};
      if (item.siswadetailwithsertifikat) {
        ListTampilkan.value.forEach((listItem) => {
          tempDataList[listItem.id] =
            item.siswadetailwithsertifikat.apiprobkwithsertifikat.apiprobk_sertifikat[
              listItem.id
            ];
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
  } else if (inputCariKelas.value.id === "Belum masuk Kelas") {
    let dataFiltered = dataAsli.value.filter((item) => {
      return item.kelas === null;
    });

    if (dataFiltered.length > 0) {
      dataFiltered.forEach((item, index) => {
        let tempDataList = {};
        if (item.siswadetailwithsertifikat) {
          ListTampilkan.value.forEach((listItem) => {
            tempDataList[listItem.id] =
              item.siswadetailwithsertifikat.apiprobkwithsertifikat.apiprobk_sertifikat[
                listItem.id
              ];
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
    } else {
      data.value = [];
    }
    // data.value = dataFiltered.map((item, index) => {
    //   return {
    //     ...item,
    //     nama: item.nama,
    //     kelas: "Belum Masuk Kelas",
    //   };
    // });
  } else {
    let dataFiltered = dataAsli.value.filter((item) => {
      return item.kelas_id == inputCariKelas.value.id;
    });
    // data.value = dataFiltered.map((item, index) => {
    //   return {
    //     ...item,
    //     nama: item.nama,
    //     kelas: `${item.kelas ? item.kelas.nama : ""}`,
    //   };
    // });

    if (dataFiltered.length > 0) {
      data.value = [];
      dataFiltered.forEach((item, index) => {
        let tempDataList = {};
        if (item.siswadetailwithsertifikat) {
          ListTampilkan.value.forEach((listItem) => {
            tempDataList[listItem.id] =
              item.siswadetailwithsertifikat.apiprobkwithsertifikat.apiprobk_sertifikat[
                listItem.id
              ];
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
    } else {
      data.value = [];
    }
  }
};

// seleksi yang ditampilkan
const ListTampilkan = ref([
  { label: "Minat Pekerjaan 1", id: "minat_pekerjaan_1", checked: true },
  { label: "Minat Pekerjaan 2", id: "minat_pekerjaan_2", checked: false },
  { label: "Minat Pekerjaan 3", id: "minat_pekerjaan_3", checked: false },
  { label: "Cita Cita 1", id: "mnt_cita2_1", checked: false },
  { label: "Cita Cita 2", id: "mnt_cita2_2", checked: false },
  { label: "Cita Cita 3", id: "mnt_cita2_3", checked: false },
  { label: "Hobi", id: "hobi", checked: false },
  { label: "Pekerjaan Bapak", id: "pekerjaanbapak", checked: false },
  { label: "Pekerjaan Ibu", id: "pekerjaanibu", checked: false },
  { label: "Pekerjaan Kakek", id: "pekerjaankakek", checked: false },
  { label: "Analisa Pekerjaan", id: "analisapekerjaan", checked: false },
]);
const onToggleList = (index) => {
  ListTampilkan.value[index].checked = !ListTampilkan.value[index].checked;

  if (ListTampilkan.value[index].checked) {
    columns.value.push({
      label: ListTampilkan.value[index].label,
      field: ListTampilkan.value[index].id,
      type: "String",
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
});
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        Analisa Minat dan Bakat</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
  </div>
  <div class="w-full bg-base-200 shadow py-4 px-4">
    <div class="flex justify-center">
      <v-select
        class="py-2 px-3 w-72 mx-auto md:mx-0"
        :options="pilihKelas"
        v-model="inputCariKelas"
        v-bind:class="{ disabled: false }"
      ></v-select>
      <div class="py-2">
        <button class="btn btn-sm btn-info p-2" @click="doPilihKelas()">
          Cari
        </button>
      </div>
    </div>
  </div>

  <div class="w-full bg-base-200 shadow shadow-md py-4 px-4">
    <div class="flex justify-center gap-2 w-full flex-wrap">
      <div class="collapse">
        <input type="checkbox" />
        <div
          class="collapse-title text-xl font-medium bg-gray-300 rounded-lg text-gray-600 text-center"
        >
          List Pilihan Data
        </div>
        <div class="collapse-content">
          <div class="flex justify-center gap-2 w-full flex-wrap py-2">
            <div v-for="(item, index) in ListTampilkan">
              <div class="form-control">
                <label
                  class="cursor-pointer label"
                  @click="onToggleList(index)"
                >
                  <span class="label-text px-2">{{ item.label }}</span>
                  <input
                    type="checkbox"
                    :checked="item.checked"
                    class="checkbox checkbox-secondary"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-base-200 shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table
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
              <span v-if="props.column.field == 'deteksi'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <!-- {{ props.row.siswadetail.length }} -->
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link
                      :to="{
                        name: 'AdminSekolah',
                        params: { id, id2: props.row.id },
                      }"
                    >
                      <button
                        data-tip="Deteksi"
                        class="tooltip btn btn-success btn-sm text-base-content"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg></button
                    ></router-link>
                  </div>
                  <button
                    data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content"
                    v-else
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'deteksipenanganan'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link
                      :to="{
                        name: 'AdminSekolah',
                        params: { id, id2: props.row.id },
                      }"
                    >
                      <button
                        data-tip="Penanganan Masalah Deteksi"
                        class="tooltip btn btn-success btn-sm text-base-content"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg></button
                    ></router-link>
                  </div>
                  <button
                    data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content"
                    v-else
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'sertifikat'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link
                      :to="{
                        name: 'AdminSekolah',
                        params: { id, id2: props.row.id },
                      }"
                    >
                      <button
                        data-tip="Sertifikat"
                        class="tooltip btn btn-success btn-sm text-base-content"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg></button
                    ></router-link>
                  </div>
                  <button
                    data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content"
                    v-else
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'terapis'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <div v-if="props.row.siswadetail.length > 0">
                    <router-link
                      :to="{
                        name: 'AdminSekolah',
                        params: { id, id2: props.row.id },
                      }"
                    >
                      <button
                        data-tip="Terapis"
                        class="tooltip btn btn-success btn-sm text-base-content"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg></button
                    ></router-link>
                  </div>
                  <button
                    data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-base-content"
                    v-else
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
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

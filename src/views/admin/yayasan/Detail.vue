<script setup>
const BASE_URL = import.meta.env.VITE_API_URL;
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast.js";
import { Field, Form } from "vee-validate";

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const sekolah = computed(() => storeGuruBk.getSekolah);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(sekolah.value.id);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("yayasan");
const router = useRouter();
const route = useRoute();

// get params id
const id = route.params.id;
const dataAsli = ref([]);
const dataDetail = ref([]);
const data = ref([]);

const getDataDetail = async () => {
  try {
    const response = await Api.get(`owner/yayasan/${id}`);
    dataDetail.value = response.data;
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataDetail();

const columns = [
  {
    label: "No",
    field: "no",
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
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
    label: "Status",
    field: "status",
    type: "String",
  },
  {
    label: "Paket",
    field: "paket_nama",
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
];

const getData = async () => {
  try {
    const response = await Api.get(`owner/yayasan/${id}/detail`);
    dataAsli.value = response.data;
    data.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();

let pilihSelect = ref([]);
const inputPilihSekolah = ref({
  label: "Pilih Sekolah",
  id: null,
});
const getDataSekolah = async () => {
  try {
    const response = await Api.get(`owner/yayasan/${id}/detail/getsekolah`);
    pilihSelect.value = response.data.map((item, index) => {
      return {
        label: item.nama,
        id: item.id,
      };
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataSekolah();

const onSubmit = () => {
  if (inputPilihSekolah.value.id) {
    const res = doStoreData();
  } else {
    Toast.warning("Warning", "Pilih Sekolah Terlebih Dahulu");
  }
};
const doStoreData = async (d) => {
  let dataStore = {
    sekolah_id: inputPilihSekolah.value.id,
  };
  try {
    const response = await Api.post(`owner/yayasan/${id}/detail`, dataStore);
    Toast.success("Success", "Data Berhasil diupdate!");
    // resetForm();
    // router.push({ name: "AdminYayasanDetail", params: { id: id } });
    getData();
    getDataSekolah();
    resetForm();

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const resetForm = () => {
  inputPilihSekolah.value.id = null;
  inputPilihSekolah.value.label = "Pilih Sekolah";
  dataDetail.value = {
    sekolah_id: "",
  };
};

const doDeleteData = async (kode, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(`owner/yayasan/${id}/detail/${kode}`);
      data.value.splice(index, 1);
      Toast.success("Success", "Data Berhasil dihapus!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        {{ dataDetail.nama }}
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Yayasan <BreadCrumbSpace /> Index </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      ></span>
    </div>
    <div class="md:py-0 py-2 space-x-2 space-y-2">
      <span @click="router.go(-1)">
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
        </button></span
      >
    </div>
  </div>

  <div class="px-4 py-4">
    <div class="w-full">
      <div class="bg-white shadow rounded-lg px-0 py-0">
        <div class="w-full lg:w-full mx-4">
          <div class="p-0 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmit">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Pilih Sekolah</label
                        >
                        <v-select
                          class="py-2 px-3 w-72 mx-auto md:mx-0"
                          :options="pilihSelect"
                          v-model="inputPilihSekolah"
                          v-bind:class="{ disabled: false }"
                        ></v-select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.sekolah_id }}
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-start mt-4 px-4">
                      <button class="btn btn-active btn-lg btn-primary">
                        Tambahkan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
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
              <span v-if="props.column.field == 'actions'">
                <div
                  class="text-sm font-medium text-center flex justify-center space-x-0"
                >
                  <ButtonDelete
                    @click="doDeleteData(props.row.id, props.index)"
                  />
                  <router-link
                    :to="{
                      name: 'AdminSekolahDetailDashboard',
                      params: { id: props.row.id },
                    }"
                  >
                    <button
                      class="btn btn-sm btn-primary tooltip"
                      data-tip="Detail"
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
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg></button
                  ></router-link>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>
              <span v-else-if="props.column.field == 'jml_siswa'">
                <div class="text-center">{{ props.row.jml_siswa }} Siswa</div>
              </span>
              <span v-else-if="props.column.field == 'jml_kelas'">
                <div class="text-center">{{ props.row.jml_siswa }} Kelas</div>
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

<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import ButtonMore from "@/components/atoms/ButtonMore.vue";
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";

import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDel from "@/components/atoms/ButtonDel.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast.js";
import ButtonKembali from "@/components/atoms/ButtonKembali.vue";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("prestasi");

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const id2 = route.params.id2;
const id3 = route.params.id3;
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
    label: "Prestasi",
    field: "prestasi",
    type: "String",
  },
];
const getData = async () => {
  try {
    const response = await Api.get(
      `owner/datasekolah/${id}/siswa/${id2}/catatanprestasisiswa`
    );
    dataAsli.value = response.data;

    data.value = dataAsli.value;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();

const dataSiswa = ref([]);
const getDataSiswa = async () => {
  try {
    const response = await Api.get(`owner/datasekolah/${id}/siswa/${id2}`);

    dataSiswa.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataSiswa();

const encode = (value) => window.btoa(value);

const doCetak = (id = null, token = moment().format("YYYY-MM-DD")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/catatankasus/${encode(id)}?token=${encode(
        token
      )}`
    );
  }
};

const doDeleteData = async (dataId, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(
        `owner/datasekolah/${id}/siswa/${id2}/catatanprestasisiswa/${dataId}`
      );
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
        {{ dataSiswa.nama }}
      </span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link
        :to="{
          name: 'AdminSekolahDetailPrestasiDetailTambah',
          params: { id: id, id2: id2 },
        }"
      >
        <button class="btn btn-primary">Tambah</button>
      </router-link>
      <ButtonKembali />
    </div>
  </div>

  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-base-200 shadow rounded-lg px-4 py-4">
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
                  class="text-sm font-medium text-center flex justify-center space-x-1"
                >
                  <router-link
                    :to="{
                      name: 'AdminSekolahDetailPrestasiDetailEdit',
                      params: { id: id, id2: id2, id3: props.row.id },
                    }"
                  >
                    <ButtonEdit />
                  </router-link>
                  <ButtonDel @click="doDeleteData(props.row.id, props.index)" />
                </div>
              </span>
              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">
                  {{ props.index + 1 }}
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

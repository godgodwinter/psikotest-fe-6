<script setup>
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
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
storeAdminBar.setPagesActive("sekolah");
const router = useRouter();
const route = useRoute();

const ujian_proses_id = route.params.ujian_proses_id;

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
    label: "Nama Kelas",
    field: "kelas_nama",
    type: "String",
  },
  {
    label: "Jumlah Siswa",
    field: "siswa_jml",
    type: "String",
  },
  {
    label: "Nama PaketSoal",
    field: "paketsoal_nama",
    type: "String",
  },
  {
    label: "Jumlah Kategori",
    field: "kategori_jml",
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
      `admin/menuujian/proseskelas/${ujian_proses_id}/kelas`
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
</script>
<template>
  <h1 class="text-lg font-bold">DETAIL : {{ dataProses.nama }}</h1>
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
                  class="text-sm font-medium text-center flex justify-center space-x-1"
                >
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
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                      </svg></button
                  ></router-link>
                </div>
              </span>

              <span v-else-if="props.column.field == 'tgl'">
                <div class="text-center">
                  {{ moment(props.row.tgl).format("DD MMMM YYYY") }}
                </div>
              </span>
              <span v-else-if="props.column.field == 'siswa_jml'">
                <div class="text-center">{{ props.row.siswa_jml }} Siswa</div>
              </span>
              <span v-else-if="props.column.field == 'kategori_jml'">
                <div class="text-center">
                  {{ props.row.kategori_jml }} Kategori
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

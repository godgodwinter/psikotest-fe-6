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
const siswa_id = route.params.siswa_id;

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
    label: "Nama Kategori",
    field: "nama",
    type: "String",
  },
  {
    label: "Jumlah Soal",
    field: "jumlah_soal",
    type: "String",
  },
  {
    label: "Skor",
    field: "skor",
    type: "String",
  },
  {
    label: "Sisa Waktu",
    field: "sisa_waktu",
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
      `admin/menuujian/proseskelas/${ujian_proses_id}/kelas/${proses_kelas_id}/siswa/${siswa_id}`
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
  <h1 class="text-lg font-bold">Berisi Kategori per SiSWA </h1>
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
              </div>
            </template>
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                  <!-- <router-link
                      :to="{
                        name: 'AdminSekolahDetailDashboard',
                        params: { id: props.row.id },
                      }"
                    > -->
                  <button class="btn btn-sm btn-primary tooltip" data-tip="Reset Data">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>

                  </button>
                  <!-- </router-link> -->
                  <!-- <button class="btn btn-sm btn-danger" @click="doDeleteData(props.row.id, props.index)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd" />
                      </svg>
                    </button> -->
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
  
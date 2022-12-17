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
import { Field, Form } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
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
const siswa = ref([]);
const kelas = ref([]);

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
    type: "number",
  },
  {
    label: "Skor",
    field: "skor",
    type: "number",
  },
  {
    label: "Nilai Akhir",
    field: "nilaiAkhir",
    type: "number",
  },
  {
    label: "Nilai Revisi",
    field: "nilaiAkhir_revisi",
    type: "number",
  },
  {
    label: "Sisa Waktu",
    field: "sisa_waktu_dalam_menit",
    type: "number",
  },
  {
    label: "Status",
    field: "status",
    type: "number",
  },
];

const getData = async () => {
  try {
    const response = await Api.get(
      `admin/menuujian/proseskelas/${ujian_proses_id}/kelas/${proses_kelas_id}/siswa/${siswa_id}`
    );
    dataAsli.value = response.data;
    data.value = response.data;
    siswa.value = response.siswa;
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

const doResetWaktu = async (kelas_siswa_id) => {
  if (confirm("Apakah anda mereset waktu data ini?")) {
    // console.log(kelas_siswa_id);
    try {
      const response = await Api.post(`admin/menuujian/proesssiswa/${kelas_siswa_id}/reset_waktu`);
      console.log(response);
      Toast.babeng('Reset waktu berhasil!',)
      // return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
const doResetAll = async (kelas_siswa_id) => {
  if (confirm("Apakah anda mereset waktu dan jawaban data ini?")) {
    // console.log(kelas_siswa_id);
    try {
      const response = await Api.post(`admin/menuujian/proesssiswa/${kelas_siswa_id}/reset_all`);
      console.log(response);
      Toast.babeng('Hard Reset berhasil!',)
      // return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const doGeneratePerSiswa = async (siswa_id = siswa.value.id) => {
  if (confirm("Apakah anda yakin generate data ini?")) {
    try {
      const response = await Api.get(
        `admin/hasil_ujian_lintas/siswa/${siswa_id}`
      );
      Toast.success("Info", "Proses Generate berhasil!")
      getData();
      getDataProses();
      return response.data;
    } catch (error) {
      Toast.danger("Warning", "Proses Generate gagal!")
      console.error(error);
    }
  };
};

const dataForm = ref([]);
const form = ref(false);
const nama = ref(null);

const doEditForm = (id, n, nilai) => {
  form.value = id;
  nama.value = n;
  dataForm.value.nilaiAkhir_revisi = nilai ? nilai : 0;

}

const onSubmit = async (values) => {
  let dataStore = {
    nilaiAkhir_revisi: dataForm.value.nilaiAkhir_revisi,
  };
  // console.log(dataForm);
  try {
    const response = await Api.put(`admin/menuujian/proseskelas_revisi_nilai/siswa/${siswa.value.id}/ujian_paketsoal_kategori/${form.value}`, dataStore);
    console.log(response);
    // data.id = response.id;
    Toast.success("Info", "Data berhasil revisi!");
    // router.push({ name: "admin-pengumuman-index" });
    getData();
    getDataProses();
    form.value = false;
    nama.value = null;

    return true;
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <h1 class="text-lg font-bold">SEKOLAH : {{ dataProses.nama }}</h1>
  <div v-if="siswa">
    <h1 class="text-lg font-bold">KELAS : {{ kelas.nama }}</h1>
    <h1 class="text-lg font-bold">Siswa : {{ siswa.nama }}</h1>
    <button @click="doGeneratePerSiswa(siswa.id)" class="btn btn-danger btn-sm tooltip" data-tip="generate">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
    </button>
  </div>
  <div v-if="form" class="w-full px-10 lg:w-1/2">
    <!-- Form Revisi Nilai -->
    <Form v-slot="{ errors }" @submit="onSubmit">
      <div class="py-2 lg:py-4 px-4">
        <div class="space-y-4">
          <div class="flex flex-col">
            <label>Nilai Baru <span class="font-bold">{{ nama }}</span> :</label>
            <div>
              <Field :rules="fnValidasi.validateDataNumber" v-model="dataForm.nilaiAkhir_revisi"
                name="nilaiAkhir_revisi" type="text" max="100" min="0" class="input input-bordered w-11/12" />
              <div class="text-xs text-red-600 mt-1">
                {{ errors.nilaiAkhir_revisi }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end py-10 px-10 gap-4">
        <!-- <button class="btn btn-warning">Draft</button> -->
        <span class="btn btn-secondary" @click="(form = false)">Batal</span>
        <button class="btn btn-primary">Simpan</button>
      </div>
    </Form>
  </div>
  <!-- <h1 class="text-lg font-bold">Berisi Kategori per SiSWA </h1> -->
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

                <button class="btn btn-sm btn-warning tooltip" data-tip="Export Data SISWA">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
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
                  <button class="btn btn-sm btn-primary tooltip" data-tip="Reset Waktu"
                    @click="doResetWaktu(props.row.id)">
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

                  <button class="btn btn-sm btn-warning tooltip" data-tip="Reset All" @click="doResetAll(props.row.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>
                  <button class="btn btn-sm btn-danger tooltip" data-tip="Ubah Nilai"
                    @click="doEditForm(props.row.ujian_paketsoal_kategori_id, props.row.nama, props.row.nilaiAkhir_revisi)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
  
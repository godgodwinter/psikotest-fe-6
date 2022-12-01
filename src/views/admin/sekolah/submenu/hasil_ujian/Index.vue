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
import { useStoreGuruBk } from "@/stores/guruBk";
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const storeGuruBk = useStoreGuruBk();
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("hasil_ujian");

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const dataAsli = ref(null);
const data = ref(null);
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
    name: "AdminSekolahDetail.hasil_ujian",
    params: {
      id: id,
      kelas_id: inputCariKelas.value.id,
    },
  });
  fnSetToTempSekolah(id, inputCariKelas.value.id, inputCariKelas.value.label);
  getData(inputCariKelas.value.id);
};

const getTempSekolah = computed(() => storeGuruBk.getTempSekolah);

const fnCariDataTempSekolahWhereSekolahId = (id) => {
  let tempSekolah = storeGuruBk.getTempSekolah;
  console.log(id, tempSekolah);
  return tempSekolah ? tempSekolah.filter((item) => item.id == id) : [];
}

const getDataSekolah = fnCariDataTempSekolahWhereSekolahId(id);

const fnSetToTempSekolah = (sekolah_id, kelas_id, nama_kelas) => {
  let obj = {
    id: sekolah_id,
    kelas_id: kelas_id,
    nama_kelas: nama_kelas,
  }
  // console.log("objek", obj);
  let temp = getTempSekolah.value;
  console.log("temp", temp);
  if (temp.length > 0) {
    let periksa = temp.filter((x) => x.id == obj.id);
    console.log("periksa:", periksa)
    if (periksa.length > 0) {
      temp.forEach((x, index) => {
        if (x.id == obj.id) {
          x.kelas_id = obj.kelas_id,
            x.nama_kelas = obj.nama_kelas
        }
      })
    } else {
      temp.push(obj);
    }
  } else {
    temp.push(obj);
  }
  // console.log(temp);
  // console.log(getTempSekolah);
  storeGuruBk.setTempSekolah(temp)
}

const getData = async (kelas_id) => {
  try {
    dataAsli.value = [];
    data.value = [];
    const response = await Api.get(
      `admin/menuujian/hasil_ujian_perkelas/${kelas_id}`
    );
    dataAsli.value = response.data;
    data.value = dataAsli.value;

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
    label: "Hasil",
    field: "ujian_siswa",
    type: "String",
  },
  {
    label: "Status",
    field: "selesai",
    type: "String",
  },
]);


const encode = (value) => window.btoa(value);

const doCetak = (kelas_id = null, token = moment().format("YYYY-MM-DD")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/hasilujian/lintasbidangstudi_perkelas/${encode(kelas_id)}?token=${encode(token)}`
    );
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <div class="pt-4 px-10 md:flex justify-between">
        <div> <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">
            Hasil Ujian kelas {{
                getDataSekolah.length > 0 ? getDataSekolah[0].nama_kelas : null
            }}</span>
          <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm px-4" v-if="dataAsli">
            <ButtonCetak @click="doCetak(kelas_id)" />
          </span>
        </div>
        <!-- <div class="md:py-0 py-4 space-x-2 space-y-2">
      <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
        @click="doBackToKelas()">Kembali</button>

    </div> -->
      </div>

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


    </div>
  </div>



  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4" v-if="dataAsli">
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
              <span v-if="props.column.field == 'ujian_siswa'">
                <router-link :to="{
                  name: 'AdminSekolahDetail.hasil_ujian.persiswa',
                  params: { id, kelas_id, siswa_id: props.row.id },
                }" v-if="props.row.selesai == 'Selesai'">
                  <button data-tip="DATA UJIAN" class="tooltip btn btn-success btn-sm text-base-content">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </button>
                </router-link>
                <router-link :to="{
                  name: 'AdminSekolahDetail.hasil_ujian.persiswa',
                  params: { id, kelas_id, siswa_id: props.row.id },
                }" v-else-if="props.row.selesai == 'Belum diselesaikan'">
                  <button data-tip="DATA UJIAN" class="tooltip btn btn-warning btn-sm text-base-content">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </button>
                </router-link>
                <button v-else class="btn btn-danger tooltip btn-sm" data-tip="Belum Ada Data"> <svg
                    xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg></button>

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

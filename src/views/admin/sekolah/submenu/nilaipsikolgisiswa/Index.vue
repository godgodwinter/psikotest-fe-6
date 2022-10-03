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
const storeGuruBk = useStoreGuruBk();
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("nilaipsikolgisiswa");

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const dataAsli = ref([]);
const data = ref([]);

const dataKelas = ref([]);

// console.log(kelas_id.value);
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
    name: "AdminSekolahDetailNilaipsikolgiSiswa",
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


const columns = ref([
  // {
  //   label: "No",
  //   field: "no",
  //   width: "50px",
  //   tdClass: "text-center",
  //   thClass: "text-center",
  // },
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
    label: "Intelligence Quotient",
    field: "iq",
    type: "number",
  },
]);
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

// seleksi yang ditampilkan
const ListTampilkan = ref([
  { label: "Intelligence Quotient", id: "iq", checked: true, type: "number" },
  {
    label: "Prosentase Gaya Belajar Auditif",
    id: "prosentase_auditif",
    checked: false,
    type: "number",
  },
  {
    label: "Prosentase Gaya Belajar Visual",
    id: "prosentase_visual",
    checked: false,
    type: "number",
  },
  {
    label: "Prosentase Gaya Belajar Kinestetik",
    id: "prosentase_kinestetik",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Gaya Belajar Auditif",
    id: "keterangan_auditif",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Gaya Belajar Visual",
    id: "keterangan_visual",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Gaya Belajar Kinestetik",
    id: "keterangan_kinestetik",
    checked: false,
    type: "number",
  },
  {
    label: "Rank Gaya Belajar Auditif",
    id: "rank_auditif",
    checked: false,
    type: "number",
  },
  {
    label: "Rank Gaya Belajar Visual",
    id: "rank_visual",
    checked: false,
    type: "number",
  },
  {
    label: "Rank Gaya Belajar Kinestetik",
    id: "rank_kinestetik",
    checked: false,
    type: "number",
  },
  {
    label: "Kecerdasan Bahasa/Lingustik",
    id: "kb_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Kecerdasan Bahasa/Lingustik",
    id: "kbh",
    checked: false,
  },
  {
    label: "Kecerdasan Logis-Matematis",
    id: "lm_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Kecerdasan Logis-Matematis", id: "lmh", checked: false },
  {
    label: "Kecerdasan Spasial",
    id: "ks_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Kecerdasan Spasial", id: "ksh", checked: false },
  {
    label: "Kecerdasan Musikal",
    id: "km_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Kecerdasan Musikal", id: "kmh", checked: false },
  {
    label: "Kecerdasan Kinestik",
    id: "kk_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Kecerdasan Kinestik", id: "kkh", checked: false },
  {
    label: "Kecerdasan Interpersonal",
    id: "ki_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Kecerdasan Interpersonal", id: "kih", checked: false },
  {
    label: "Kecerdasan Intrapersonal",
    id: "ka_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Kecerdasan Intrapersonal", id: "kah", checked: false },
  {
    label: "Kecerdasan Natural",
    id: "kn_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Kecerdasan Natural", id: "knh", checked: false },
  {
    label: "Persentase Intelligence Quotient",
    id: "iq_persen",
    checked: false,
    type: "number",
  },
  { label: "Keterangan Intelligence Quotient", id: "iqh", checked: false },
  {
    label: "Persentase Emotional Quotient",
    id: "eq_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Emotional Quotient",
    id: "eq_persen_keterangan",
    checked: false,
  },
  {
    label: "Persentase Spiritual Quotient",
    id: "sq_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Spiritual Quotient",
    id: "sq_persen_keterangan",
    checked: false,
  },
  {
    label: "Persentase Social Quotient",
    id: "scq_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Social Quotient",
    id: "scq_persen_keterangan",
    checked: false,
  },
  {
    label: "Sikap Hangat",
    id: "hspq_a_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Hangat",
    id: "hspq_a_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Dingin",
    id: "hspq_a_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Dingin",
    id: "hspq_a_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Emosi Stabil",
    id: "hspq_c_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Emosi Stabil",
    id: "hspq_c_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Emosi Labil",
    id: "hspq_c_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Emosi Labil",
    id: "hspq_c_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Bergairah",
    id: "hspq_d_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Bergairah",
    id: "hspq_d_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Sulit Bergairah",
    id: "hspq_d_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Sulit Bergairah",
    id: "hspq_d_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Dominasi",
    id: "hspq_e_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Dominasi",
    id: "hspq_e_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Patuh Tunduk",
    id: "hspq_e_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Patuh Tunduk",
    id: "hspq_e_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Keceriaan",
    id: "hspq_f_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Keceriaan",
    id: "hspq_f_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Sungguh-sungguh",
    id: "hspq_f_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Sungguh-sungguh",
    id: "hspq_f_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Taat Peraturan",
    id: "hspq_g_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Taat Peraturan",
    id: "hspq_g_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Menolak Peraturan",
    id: "hspq_g_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Menolak Peraturan",
    id: "hspq_g_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Lembuht Hati/Peka",
    id: "hspq_h_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Lembuht Hati/Peka",
    id: "hspq_h_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Keras Hati",
    id: "hspq_h_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Keras Hati",
    id: "hspq_h_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Pemberani",
    id: "hspq_i_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Pemberani",
    id: "hspq_i_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Pemalu",
    id: "hspq_i_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Pemalu",
    id: "hspq_i_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Menarik Diri",
    id: "hspq_j_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Menarik Diri",
    id: "hspq_j_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Bersemangat",
    id: "hspq_j_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Bersemangat",
    id: "hspq_j_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Ketakutan",
    id: "hspq_o_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Ketakutan",
    id: "hspq_o_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Percaya Diri",
    id: "hspq_o_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Percaya Diri",
    id: "hspq_o_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Mandiri",
    id: "hspq_q2_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Mandiri",
    id: "hspq_q2_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Kurang Mandiri",
    id: "hspq_q2_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Kurang Mandiri",
    id: "hspq_q2_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Disiplin",
    id: "hspq_q3_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Disiplin",
    id: "hspq_q3_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Kurang Disiplin",
    id: "hspq_q3_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Kurang Disiplin",
    id: "hspq_q3_kr_keterangan",
    checked: false,
  },
  {
    label: "Sikap Tegang",
    id: "hspq_q4_kn_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Tegang",
    id: "hspq_q4_kn_keterangan",
    checked: false,
  },
  {
    label: "Sikap Rileks/Santai",
    id: "hspq_q4_kr_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Keterangan Sikap Rileks/Santai",
    id: "hspq_q4_kr_keterangan",
    checked: false,
  },
  { label: "Kepribadian Terkuat Rank 1", id: "hspq_rank_1", checked: false },
  { label: "Kepribadian Terkuat Rank 2", id: "hspq_rank_2", checked: false },
  { label: "Kepribadian Terkuat Rank 3", id: "hspq_rank_3", checked: false },
  { label: "Kepribadian Terkuat Rank 4", id: "hspq_rank_4", checked: false },
  { label: "Kepribadian Terkuat Rank 5", id: "hspq_rank_5", checked: false },
  {
    label: "Rank 1 Faktor Kepribadian Terkuat Positif",
    id: "hspq_rank_1_positif",
    checked: false,
  },
  {
    label: "Rank 2 Faktor Kepribadian Terkuat Positif",
    id: "hspq_rank_2_positif",
    checked: false,
  },
  {
    label: "Rank 3 Faktor Kepribadian Terkuat Positif",
    id: "hspq_rank_3_positif",
    checked: false,
  },
  {
    label: "Rank 4 Faktor Kepribadian Terkuat Positif",
    id: "hspq_rank_4_positif",
    checked: false,
  },
  {
    label: "Rank 5 Faktor Kepribadian Terkuat Positif",
    id: "hspq_rank_5_positif",
    checked: false,
  },
  {
    label: "Rank 1 Faktor Kepribadian Terkuat Negatif",
    id: "hspq_rank_1_negatif",
    checked: false,
  },
  {
    label: "Rank 2 Faktor Kepribadian Terkuat Negatif",
    id: "hspq_rank_2_negatif",
    checked: false,
  },
  {
    label: "Rank 3 Faktor Kepribadian Terkuat Negatif",
    id: "hspq_rank_3_negatif",
    checked: false,
  },
  {
    label: "Rank 4 Faktor Kepribadian Terkuat Negatif",
    id: "hspq_rank_4_negatif",
    checked: false,
  },
  {
    label: "Rank 5 Faktor Kepribadian Terkuat Negatif",
    id: "hspq_rank_5_negatif",
    checked: false,
  },
  {
    label: "Minat Pekerjaan Rank 1",
    id: "minat_pekerjaan_1_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Minat Pekerjaan Rank 2",
    id: "minat_pekerjaan_2_persen",
    checked: false,
    type: "number",
  },
  {
    label: "Minat Pekerjaan Rank 3",
    id: "minat_pekerjaan_3_persen",
    checked: false,
    type: "number",
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
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Hasil Psikologi kelas {{
      getDataSekolah.length>0?getDataSekolah[0].nama_kelas:null }}
      </span>
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
          <vue-good-table :columns="columns" :rows="data" :line-numbers="true" :search-options="{
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

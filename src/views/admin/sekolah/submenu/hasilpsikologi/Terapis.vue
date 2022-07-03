<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";

import CardLockedFitur from "@/components/organismes/CardLockedFitur.vue";
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const paket = computed(() => storeGuruBk.getPaket);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(paket.value);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("hasilpsikologi");

const router = useRouter();
const route = useRoute();

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);
const dataDetail = ref([]);
const siswa = ref();
const aspekKepribadianRank = ref([]);
const temp = ref([{ nama: "" }]);
const kecerdasan = ref([]);
const tempPositifDiungkap = ref([]);

const getDataId = async () => {
  try {
    const response = await Api.get(
      `owner/hasilpsikologi/detail/${route.params.id2}`
    );
    dataAsli.value = response.data;
    dataDetail.value = response.data;
    data.value = response.data.sertifikat;
    siswa.value = response.data;

    if (response.status == "failed") {
      Toast.danger("Warning", "Anda tidak memiliki Akses siswa ini!");
      return response.data;
    }
    if (response.data.sertifikat == null || response.data.deteksi == null) {
      Toast.danger("Warning", "Data Api Siswa tidak ditemukan!");
      return response.data;
    }

    aspekKepribadianRank.value = [
      {
        nama: "Faktor Sikap Dingin",
        rank: data.value.hspq_a_kr_rank,
        persen: data.value.hspq_a_kr_persen,
        ket: data.value.hspq_a_kr_keterangan,
        positif_diungkap: data.value.hspq_a_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_a_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Emosi Labil",
        rank: data.value.hspq_c_kr_rank,
        persen: data.value.hspq_c_kr_persen,
        ket: data.value.hspq_c_kr_keterangan,
        positif_diungkap: data.value.hspq_c_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_c_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Sulit Bergairah",
        rank: data.value.hspq_d_kr_rank,
        persen: data.value.hspq_d_kr_persen,
        ket: data.value.hspq_d_kr_keterangan,
        positif_diungkap: data.value.hspq_d_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Patuh atau Tunduk",
        rank: data.value.hspq_e_kr_rank,
        persen: data.value.hspq_e_kr_persen,
        ket: data.value.hspq_e_kr_keterangan,
        positif_diungkap: data.value.hspq_e_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sungguh-sungguh",
        rank: data.value.hspq_f_kr_rank,
        persen: data.value.hspq_f_kr_persen,
        ket: data.value.hspq_f_kr_keterangan,
        positif_diungkap: data.value.hspq_f_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_f_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Menolak Peraturan",
        rank: data.value.hspq_g_kr_rank,
        persen: data.value.hspq_g_kr_persen,
        ket: data.value.hspq_g_kr_keterangan,
        positif_diungkap: data.value.hspq_g_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_g_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Keras Hati",
        rank: data.value.hspq_h_kr_rank,
        persen: data.value.hspq_h_kr_persen,
        ket: data.value.hspq_h_kr_keterangan,
        positif_diungkap: data.value.hspq_h_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_h_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Pemalu",
        rank: data.value.hspq_i_kr_rank,
        persen: data.value.hspq_i_kr_persen,
        ket: data.value.hspq_i_kr_keterangan,
        positif_diungkap: data.value.hspq_i_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_i_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Bersemangat",
        rank: data.value.hspq_j_kr_rank,
        persen: data.value.hspq_j_kr_persen,
        ket: data.value.hspq_j_kr_keterangan,
        positif_diungkap: data.value.hspq_j_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_j_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Percaya Diri",
        rank: data.value.hspq_o_kr_rank,
        persen: data.value.hspq_o_kr_persen,
        ket: data.value.hspq_o_kr_keterangan,
        positif_diungkap: data.value.hspq_o_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_o_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Kurang Mandiri",
        rank: data.value.hspq_q2_kr_rank,
        persen: data.value.hspq_q2_kr_persen,
        ket: data.value.hspq_q2_kr_keterangan,
        positif_diungkap: data.value.hspq_q2_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q2_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Kurang Disiplin",
        rank: data.value.hspq_q3_kr_rank,
        persen: data.value.hspq_q3_kr_persen,
        ket: data.value.hspq_q3_kr_keterangan,
        positif_diungkap: data.value.hspq_q3_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q3_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Rileks atau santai",
        rank: data.value.hspq_q4_kr_rank,
        persen: data.value.hspq_q4_kr_persen,
        ket: data.value.hspq_q4_kr_keterangan,
        positif_diungkap: data.value.hspq_q4_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q4_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Hangat",
        rank: data.value.hspq_a_kn_rank,
        persen: data.value.hspq_a_kn_persen,
        ket: data.value.hspq_a_kn_keterangan,
        positif_diungkap: data.value.hspq_a_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_a_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Emosi Stabil",
        rank: data.value.hspq_c_kn_rank,
        persen: data.value.hspq_c_kn_persen,
        ket: data.value.hspq_c_kn_keterangan,
        positif_diungkap: data.value.hspq_c_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_c_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Bergairah",
        rank: data.value.hspq_d_kn_rank,
        persen: data.value.hspq_d_kn_persen,
        ket: data.value.hspq_d_kn_keterangan,
        positif_diungkap: data.value.hspq_d_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Dominasi",
        rank: data.value.hspq_e_kn_rank,
        persen: data.value.hspq_e_kn_persen,
        ket: data.value.hspq_e_kn_keterangan,
        positif_diungkap: data.value.hspq_e_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_e_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Keceriaan",
        rank: data.value.hspq_f_kn_rank,
        persen: data.value.hspq_f_kn_persen,
        ket: data.value.hspq_f_kn_keterangan,
        positif_diungkap: data.value.hspq_f_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_f_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Taat Peraturan",
        rank: data.value.hspq_g_kn_rank,
        persen: data.value.hspq_g_kn_persen,
        ket: data.value.hspq_g_kn_keterangan,
        positif_diungkap: data.value.hspq_g_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_g_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Lembut Hati / Peka",
        rank: data.value.hspq_h_kn_rank,
        persen: data.value.hspq_h_kn_persen,
        ket: data.value.hspq_h_kn_keterangan,
        positif_diungkap: data.value.hspq_h_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_h_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Pemberani",
        rank: data.value.hspq_i_kn_rank,
        persen: data.value.hspq_i_kn_persen,
        ket: data.value.hspq_i_kn_keterangan,
        positif_diungkap: data.value.hspq_i_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_i_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Menarik Diri",
        rank: data.value.hspq_j_kn_rank,
        persen: data.value.hspq_j_kn_persen,
        ket: data.value.hspq_j_kn_keterangan,
        positif_diungkap: data.value.hspq_j_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_j_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Ketakutan",
        rank: data.value.hspq_o_kn_rank,
        persen: data.value.hspq_o_kn_persen,
        ket: data.value.hspq_o_kn_keterangan,
        positif_diungkap: data.value.hspq_o_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_o_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Mandiri",
        rank: data.value.hspq_q2_kn_rank,
        persen: data.value.hspq_q2_kn_persen,
        ket: data.value.hspq_q2_kn_keterangan,
        positif_diungkap: data.value.hspq_q2_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q2_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Disiplin",
        rank: data.value.hspq_q3_kn_rank,
        persen: data.value.hspq_q3_kn_persen,
        ket: data.value.hspq_q3_kn_keterangan,
        positif_diungkap: data.value.hspq_q3_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q3_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Tegang",
        rank: data.value.hspq_q4_kn_rank,
        persen: data.value.hspq_q4_kn_persen,
        ket: data.value.hspq_q4_kn_keterangan,
        positif_diungkap: data.value.hspq_q4_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q4_kn_aspek_negatif_di_ungkap,
      },
    ];
    aspekKepribadianRank.value.sort(function (a, b) {
      return a.rank - b.rank;
    });

    kecerdasan.value = [
      {
        nama: "Kecerdasan Linguistik",
        persen: data.value.kb_persen,
        ket: data.value.kbh,
      },
      {
        nama: "Kecerdasan Logis - Matematis",
        persen: data.value.lm_persen,
        ket: data.value.lmh,
      },
      {
        nama: "Kecerdasan Spasial",
        persen: data.value.ks_persen,
        ket: data.value.ksh,
      },
      {
        nama: "Kecerdasan Musikal",
        persen: data.value.km_persen,
        ket: data.value.kmh,
      },
      {
        nama: "Kecerdasan Kinetik",
        persen: data.value.kk_persen,
        ket: data.value.kkh,
      },
      {
        nama: "Kecerdasan Interpersonal",
        persen: data.value.ki_persen,
        ket: data.value.kih,
      },
      {
        nama: "Kecerdasan Intrapersonal",
        persen: data.value.ka_persen,
        ket: data.value.kah,
      },
      {
        nama: "Kecerdasan Natural",
        persen: data.value.kn_persen,
        ket: data.value.knh,
      },
    ];
    temp.value = kecerdasan.value.slice(0);
    temp.value.sort(function (a, b) {
      return b.persen - a.persen;
    });

    for (let i = 0; i < 5; i++) {
      let kalimat = aspekKepribadianRank.value[i].positif_diungkap;
      let arrPerKalimat = kalimat.split(",");

      for (let j = 0; j < arrPerKalimat.length; j++) {
        let kata = arrPerKalimat[j];
        let kataBaru = kata
          .replace(/[^a-z0-9\s\-]/gi, "")
          .replace("Sikap", "")
          .trim()
          .toLowerCase();
        // let kataBaru = kata2.replace("Sikap", "").trim().toLowerCase();
        // let kataBaru = kata3.trim().toLowerCase();
        arrPerKalimat[j] = kataBaru;
      }
      // res.value = getTerapisPerKalimat(arrPerKalimat);
      // resTemp.value = {
      //   label: aspekKepribadianRank.value[i].positif_diungkap,
      //   data: res.value,
      // };
      let tempData = {
        label: aspekKepribadianRank.value[i].positif_diungkap,
        dataSend: arrPerKalimat,
        data: [],
      };
      // array push
      tempPositifDiungkap.value.push(tempData);
      triggetData.value = tempData;
      // console.log(tempPositifDiungkap.value.length);
    }
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data Siswa tidak ditemukan!");
    console.error(error);
  }
};
getDataId();
const triggetData = ref("");

const id = route.params.id;
const id2 = route.params.id2;

const getTerapisPerKalimat = async (arrPerKalimat, index) => {
  let dataStore = {
    kalimat: arrPerKalimat,
  };
  try {
    const response = await Api.post(
      `admin/fungsi/terapis/perkalimat`,
      dataStore
    );
    tempPositifDiungkap.value[index].data = response.data;
    // Toast.success("Success", "Data Berhasil update!");
    // resetForm();

    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

watch(triggetData, async (newData, oldData) => {
  // console.log(tempPositifDiungkap.value);
  for (let i = 0; i < tempPositifDiungkap.value.length; i++) {
    getTerapisPerKalimat(tempPositifDiungkap.value[i].dataSend, i);
  }
});

const encode = (value) => window.btoa(value);

const doCetak = (id = null, token = moment().format("YYYY-MM-DD")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/terapis/${encode(id)}?token=${encode(token)}`
    );
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        <!-- {{ dataAsli.nama }} -->
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Siswa <BreadCrumbSpace /> Edit </template>
      </BreadCrumb>
    </div>
  </div>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm px-2"
        >Terapis Karakter Positif
      </span>

      <ButtonCetak @click="doCetak(id2)" />
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link :to="{ name: 'AdminHasilPsikologi' }">
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
        </button></router-link
      >
    </div>
  </div>

  <div>
    <div v-if="siswa">
      <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
          <div class="bg-white shadow rounded-lg px-4 py-4">
            <div class="overflow-x-auto">
              <table class="table table-compact">
                <tbody>
                  <!-- row 1 -->
                  <tr>
                    <td class="whitespace-nowrap w-1/12">No Induk</td>
                    <td class="whitespace-nowrap w-1/12">:</td>
                    <td class="whitespace-nowrap w-10/12">
                      {{ siswa.nomeridentitas }}
                    </td>
                  </tr>
                  <!-- row 2 -->
                  <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{{ siswa.nama }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Umur</td>
                    <td>:</td>
                    <td>{{ siswa.deteksi.umur }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{{ siswa.jk }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Sekolah</td>
                    <td>:</td>
                    <td>{{ siswa.sekolah_nama }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="md:py-2 px-4 lg:flex flex-wrap gap-4"
        v-for="(item, index) in tempPositifDiungkap"
      >
        <div class="w-full lg:w-full">
          <div class="bg-white shadow rounded-lg px-4 py-4">
            <div class="overflow-x-auto px-4 space-y-10 py-4">
              <div class="space-y-2">
                <h1
                  class="text-lg font-bold text-gray-700 py-2 bg-gray-100 shadow"
                >
                  {{ item.label }}
                </h1>

                <div
                  class="space-y-2 border-b-2 py-2"
                  v-for="(it, index) in item.data"
                >
                  <h1
                    class="text-lg font-bold text-gray-700 py-2 bg-gray-100 capitalize"
                  >
                    {{ index + 1 }}. {{ it.nama }}
                  </h1>
                  <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                    a. Pemahaman dan Pengertian
                  </h1>

                  <p class="indent-8 text-gray-700">
                    {{ it.pemahaman }}
                  </p>
                  <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                    b. Tujuan dan Manfaat
                  </h1>

                  <p class="indent-8 text-gray-700">
                    {{ it.tujuandanmanfaat }}
                  </p>
                  <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                    c. Pembiasaan Sikap dan Penerapan
                  </h1>
                  <p class="indent-8 text-gray-700">
                    {{ it.pembiasaansikap }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

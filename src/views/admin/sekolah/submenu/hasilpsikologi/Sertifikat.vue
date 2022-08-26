<script setup>
import Api from "@/axios/axios";
import { ref, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import Fungsi from "@/components/lib/Psikotest.js";
import CardSertifikat1 from "@/components/organismes/sertifikat/CardSertifikat1.vue"; // paket premuin
import CardSertifikat2 from "@/components/organismes/sertifikat/CardSertifikat2.vue"; //gold and above

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
// const paket = computed(() => storeGuruBk.getPaket);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(paket.value);
});

const paket = ref([]);

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
const kelas = ref(null);
const getDataId = async () => {
  try {
    const response = await Api.get(
      `owner/hasilpsikologi/detail/${route.params.id2}`
    );
    dataAsli.value = response.data;
    dataDetail.value = response.data;
    kelas.value = Fungsi.getKelas(response.data.kelas_nama);
    data.value = response.data.sertifikat;
    siswa.value = response.data;
    // console.log(paket.value.id);

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

    // aspekKepribadianRank map args params

    aspekKepribadianRank.value = aspekKepribadianRank.value.map(
      (item, index) => {
        return {
          ...item,
          keterangan: Fungsi.kepanjangan(item.ket),
        };
      }
    );

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
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data Siswa tidak ditemukan!");
    console.error(error);
  }
};
getDataId();

const id = route.params.id;
const id2 = route.params.id2;

const kecerdasanList = ref([
  {
    label: "Sangat Kurang Sekali",
    code: "SKS",
  },
  {
    label: "Kurang Sekali",
    code: "KS",
  },
  {
    label: "Kurang",
    code: "K",
  },
  {
    label: "Hampir Cukup",
    code: "HC",
  },
  {
    label: "Cukup",
    code: "C",
  },
  {
    label: "Cukup Baik",
    code: "CB",
    // altCode: "CB",
  },
  {
    label: "Baik",
    code: "B",
  },
  {
    label: "Sangat Baik", //Baik sekali
    code: "BS",
    // altCode: "BS",
  },
  {
    label: "Sangat Baik Sekali",
    code: "SBS",
  },
]);

const dataKetNegativ = ref([
  {
    label: "91-99",
    ket: "Sangat Tinggi Sekali / Sangat Mengganggu Sekali",
    kode: "STS",
  },
  {
    label: "81-90",
    ket: "Tinggi Sekali / Mengganggu Sekali",
    kode: "TS",
  },
  {
    label: "71-80",
    ket: "Tinggi / Mengganggu",
    kode: "T",
  },
  {
    label: "61-70",
    ket: "Cukup Tinggi / Cukup Mengganggu",
    kode: "CT",
  },
  {
    label: "41-60",
    ket: "Cukup / Terkendali",
    kode: "C",
  },
  {
    label: "31-40",
    ket: "Agak Rendah / Cukup Terkendali",
    kode: "AR",
  },
  {
    label: "21-30",
    ket: "Rendah / Terkendali Baik",
    kode: "R",
  },
  {
    label: "11-20",
    ket: "Rendah Sekali / Terkendali Baik Sekali",
    kode: "RS",
  },
  {
    label: "01-10",
    ket: "Sangat Rendah Sekali / Sangat Terkendali Baik Sekali",
    kode: "SRS",
  },
]);

function kepanjangan(item = null) {
  let hasil = item;
  if (item == "SBS") {
    hasil = "Sangat Baik Sekali";
  } else if (item == "BS") {
    hasil = "Baik Sekali";
  } else if (item == "B") {
    hasil = "Baik";
  } else if (item == "CB") {
    hasil = "Cukup Baik";
  } else if (item == "C") {
    hasil = "Cukup";
  } else if (item == "HC") {
    hasil = "Hampir Cukup";
  } else if (item == "K") {
    hasil = "Kurang";
  } else if (item == "KS") {
    hasil = "Kurang Sekali";
  } else if (item == "SKS") {
    hasil = "Sangat Kurang Sekali";
    //tambahan
  } else if (item == "STS") {
    hasil = "Sangat Tinggi Sekali";
  } else if (item == "TS") {
    hasil = "Tinggi Sekali";
  } else if (item == "T") {
    hasil = "Tinggi";
  } else if (item == "CT") {
    hasil = "Cukup Tinggi";
  } else if (item == "C") {
    hasil = "Cukup";
  } else if (item == "CR") {
    hasil = "Cukup Rendah";
  } else if (item == "AR") {
    hasil = "Agak Rendah";
  } else if (item == "R") {
    hasil = "Rendah";
  } else if (item == "RS") {
    hasil = "Rendah Sekali";
  } else if (item == "SRS") {
    hasil = "Sangat Rendah Sekali";
  }
  return hasil;
}

function iqket(item = null) {
  let hasil = "Moron";
  if (item > 139) {
    hasil = "Genius";
  } else if (140 > item && item >= 130) {
    hasil = "Berbakat";
  } else if (130 > item && item >= 120) {
    hasil = "Superior";
  } else if (120 > item && item >= 110) {
    hasil = "Di Atas Rata - Rata";
  } else if (110 > item && item >= 105) {
    hasil = "Rata - Rata Atas";
  } else if (105 > item && item >= 100) {
    hasil = "Rata - Rata";
  } else if (100 > item && item >= 90) {
    hasil = "Rata - Rata Bawah";
  } else if (90 > item && item >= 80) {
    hasil = "Lambat Belajar";
  } else if (80 > item && item >= 60) {
    hasil = "Borderline";
  } else {
    hasil = "Moron";
  }
  return hasil;
}

function getKesimpulanIq(item = null) {
  let hasil = "Kurang Lancar";
  if (item > 119) {
    hasil = "Sangat Lancar Sekali";
  } else if (120 > item && item >= 110) {
    hasil = "Lancar Sekali";
  } else if (110 > item && item >= 105) {
    hasil = "Lancar";
  } else if (105 > item && item >= 90) {
    hasil = "Cukup Lancar";
  } else if (90 > item && item >= 80) {
    hasil = "Kurang Lancar";
  } else {
    hasil = "Sangat Kurang Lancar";
  }
  return hasil;
}

function getKesimpulanEqSq(item = null) {
  let hasil = "Lebih Tinggi";
  if (item > 119) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (120 > item && item >= 110) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (110 > item && item >= 105) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (105 > item && item >= 90) {
    hasil = "Lebih Tinggi";
  } else if (90 > item && item >= 80) {
    hasil = "Lebih Tinggi";
  } else {
    hasil = "Lebih Tinggi";
  }
  return hasil;
}

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">
        <!-- {{ dataAsli.nama }} -->
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Siswa
          <BreadCrumbSpace /> Edit
        </template>
      </BreadCrumb>
    </div>
  </div>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Sertifikat Psikologis
      </span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link :to="{ name: 'AdminHasilPsikologi' }">
        <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Kembali
        </button>
      </router-link>
    </div>
  </div>
  <!-- {{ siswa.paket_nama }} -->
  <div v-if="siswa">
    <CardSertifikat2 v-if="siswa.paket_nama != 'Premium'" :siswa="siswa" :aspekKepribadianRank="aspekKepribadianRank"
      :temp="temp" :kelas="kelas" />
    <CardSertifikat1 v-else :siswa="siswa" :aspekKepribadianRank="aspekKepribadianRank" :temp="temp" :kelas="kelas" />
  </div>
</template>

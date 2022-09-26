<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("sekolah");
storeAdminBar.setsubMenuActive("hasilpsikologi");

const router = useRouter();
const route = useRoute();

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);
const dataDetail = ref([]);
const siswa = ref();

const getDataId = async () => {
  try {
    const response = await Api.get(
      `owner/hasilpsikologi/detail/${route.params.id2}`
    );
    dataAsli.value = response.data;
    dataDetail.value = response.data;
    siswa.value = response.data;
    // console.log(dataAsli.value.deteksi.apiprobk_deteksi_list);
    dataEq.value.forEach(item => {
      console.log(item);
      dataAsli.value.deteksi.apiprobk_deteksi_list.forEach(itemDeteksi => {
        // console.log(item.nama, itemDeteksi.deteksi_nama);
        if (item.nama == itemDeteksi.deteksi_nama) {
          item.deteksi_nama = itemDeteksi.deteksi_nama
          item.deteksi_score = itemDeteksi.deteksi_score
          item.deteksi_rank = itemDeteksi.deteksi_rank
          item.deteksi_keterangan = itemDeteksi.deteksi_keterangan
          // console.log(item.nama, itemDeteksi.nama);
        }
      });
      // }
    });
    dataScq.value.forEach(item => {
      console.log(item);
      dataAsli.value.deteksi.apiprobk_deteksi_list.forEach(itemDeteksi => {
        // console.log(item.nama, itemDeteksi.deteksi_nama);
        if (item.nama == itemDeteksi.deteksi_nama) {
          item.deteksi_nama = itemDeteksi.deteksi_nama
          item.deteksi_score = itemDeteksi.deteksi_score
          item.deteksi_rank = itemDeteksi.deteksi_rank
          item.deteksi_keterangan = itemDeteksi.deteksi_keterangan
          // console.log(item.nama, itemDeteksi.nama);
        }
      });
      // }
    });
    dataSq.value.forEach(item => {
      console.log(item);
      dataAsli.value.deteksi.apiprobk_deteksi_list.forEach(itemDeteksi => {
        // console.log(item.nama, itemDeteksi.deteksi_nama);
        if (item.nama == itemDeteksi.deteksi_nama) {
          item.deteksi_nama = itemDeteksi.deteksi_nama
          item.deteksi_score = itemDeteksi.deteksi_score
          item.deteksi_rank = itemDeteksi.deteksi_rank
          item.deteksi_keterangan = itemDeteksi.deteksi_keterangan
          // console.log(item.nama, itemDeteksi.nama);
        }
      });
      // }
    });

    dataAsli.value.deteksi.apiprobk_deteksi_list.forEach(itemDeteksi => {
      // console.log(item.nama, itemDeteksi.deteksi_nama);
      if (itemDeteksi.deteksi_nama == "TOTAL EQ") {
        total_eq.value.deteksi_nama = itemDeteksi.deteksi_nama;
        total_eq.value.deteksi_keterangan = itemDeteksi.deteksi_keterangan;
        total_eq.value.deteksi_score = itemDeteksi.deteksi_score;
        total_eq.value.deteksi_rank = itemDeteksi.deteksi_rank;
        // console.log(item.nama, itemDeteksi.nama);
      }
      if (itemDeteksi.deteksi_nama == "TOTAL SCQ") {
        total_scq.value.deteksi_nama = itemDeteksi.deteksi_nama;
        total_scq.value.deteksi_keterangan = itemDeteksi.deteksi_keterangan;
        total_scq.value.deteksi_score = itemDeteksi.deteksi_score;
        total_scq.value.deteksi_rank = itemDeteksi.deteksi_rank;
        // console.log(item.nama, itemDeteksi.nama);
      }
      if (itemDeteksi.deteksi_nama == "TOTAL SQ") {
        total_sq.value.deteksi_nama = itemDeteksi.deteksi_nama;
        total_sq.value.deteksi_keterangan = itemDeteksi.deteksi_keterangan;
        total_sq.value.deteksi_score = itemDeteksi.deteksi_score;
        total_sq.value.deteksi_rank = itemDeteksi.deteksi_rank;
        // console.log(item.nama, itemDeteksi.nama);
      }
      if (itemDeteksi.deteksi_nama == "TOTAL") {
        total.value.deteksi_nama = itemDeteksi.deteksi_nama;
        total.value.deteksi_keterangan = itemDeteksi.deteksi_keterangan;
        total.value.deteksi_score = itemDeteksi.deteksi_score;
        total.value.deteksi_rank = itemDeteksi.deteksi_rank;
        // console.log(item.nama, itemDeteksi.nama);
      }
    });

    if (response.status == "failed") {
      Toast.danger("Warning", "Anda tidak memiliki Akses siswa ini!");
      return response.data;
    }
    if (response.data.sertifikat == null || response.data.deteksi == null) {
      Toast.danger("Warning", "Data Api Siswa tidak ditemukan!");
      return response.data;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataId();

const id = route.params.id;
const id2 = route.params.id2;

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
const dataEq = ref([
  { id: 1, nama: "KESADARAN EMOSI DIRI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 2, nama: "EKSPRESI EMOSI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 3, nama: "KESADARAN EMOSI ORANG LAIN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 4, nama: "KREATIVITAS EMOSI DIRI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 5, nama: "KETANGGUHAN ATAU KEGIGIHAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 6, nama: "HUBUNGAN ANTAR PRIBADI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 7, nama: "KETIDAK PUASAN KONSTRUKTIF", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 8, nama: "SUDUT PANDANG", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 9, nama: "BELAS KASIHAN ATAU EMPATI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 10, nama: "INSTUISI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 11, nama: "INTENSIONALITAS", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 12, nama: "RADIUS KEPERCAYAAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 13, nama: "DAYA PRIBADI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
]);
//! "TOTAL EQ"
const total_eq = ref({ id: 1, nama: "TOTAL EQ", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null });
const dataScq = ref([
  { id: 1, nama: "MEMAHAMI ORANG LAIN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 2, nama: "KEMAMPUAN SOSIAL", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 3, nama: "KETRAMPILAN MENJALIN HUBUNGAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 4, nama: "KEBERSAMAAN DAN KERJASAMA", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 5, nama: "KEPEDULIAN DAN TOLONG-MENOLONG", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 6, nama: "TOLERANSI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 7, nama: "KEMAMPUAN KOMUNIKASI INTERAKTIF", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 8, nama: "HUBUNGAN INTERAKTIF", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 9, nama: "KESERASIAN DAN KEHARMONISAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
]);
//! "TOTAL SCQ"
const total_scq = ref({ id: 1, nama: "TOTAL SCQ", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null });
const dataSq = ref([
  { id: 1, nama: "PERCAYA DIRI DAN YAKIN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 2, nama: "HARGA DIRI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 3, nama: "TANGGUNG JAWAB", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 4, nama: "KEADILAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 5, nama: "KEBIJAKSANAAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 6, nama: "JUJUR DAN TERBUKA", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 7, nama: "KEBERSAMAAN DAN KESETIAKAWANAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 8, nama: "RENDAH HATI", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 9, nama: "KEJERNIHAN HATI DAN PIKIRAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 10, nama: "KEBAIKAN DAN KEBAJIKAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 11, nama: "KETULUSAN DAN KEIKHLASAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 12, nama: "PENGORBANAN DAN MAAF", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },
  { id: 13, nama: "KETENTRAMAN DAN KEDAMAIAN", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null },

]);
//! "TOTAL SQ"
const total_sq = ref({ id: 1, nama: "TOTAL SQ", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null });
//! "TOTAL"
const total = ref({ id: 1, nama: "TOTAL", deteksi_nama: null, deteksi_rank: null, deteksi_score: null, deteksi_keterangan: null });

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
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Deteksi Kecerdasan Emosi, Sosial
        dan Spiritual <br> (EQ; Sc.Q; SQ)</span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <span @click="router.go(-1)">
        <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">

          Kembali
        </button></span>
    </div>
  </div>
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
                <tr>
                  <td>Kelas</td>
                  <td>:</td>
                  <td>{{ siswa.kelas_nama }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm">1. EQ (Emotional
          Quotient) : {{ total_eq.deteksi_score }} : {{ total_eq.deteksi_keterangan }} </span>
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">No</th>
                  <th class="whitespace-nowrap w-5/12">Gangguan Karakter</th>
                  <th class="whitespace-nowrap w-1/100">Rank</th>
                  <th class="whitespace-nowrap w-1/100">%</th>
                  <th class="whitespace-nowrap w-1/100">ket</th>
                  <th class="whitespace-nowrap w-5/12"></th>
                </tr>
                <!-- row 1 -->
                <tr class="hover" v-for="(
                    item, index
                  ) in dataEq" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.nama }}</td>
                  <td>{{ item.deteksi_rank }}</td>
                  <td>{{ item.deteksi_score }}</td>
                  <td>{{ item.deteksi_keterangan }}</td>
                  <td>
                    <progress class="progress progress-info w-full" :value="item.deteksi_score" max="100"></progress>
                  </td>
                </tr>
                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm">2. ScQ (Social
          Quotient) : {{ total_scq.deteksi_score }} : {{ total_scq.deteksi_keterangan }} </span>
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">No</th>
                  <th class="whitespace-nowrap w-5/12">Gangguan Karakter</th>
                  <th class="whitespace-nowrap w-1/100">Rank</th>
                  <th class="whitespace-nowrap w-1/100">%</th>
                  <th class="whitespace-nowrap w-1/100">ket</th>
                  <th class="whitespace-nowrap w-5/12"></th>
                </tr>
                <!-- row 1 -->
                <tr class="hover" v-for="(
                    item, index
                  ) in dataScq" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.nama }}</td>
                  <td>{{ item.deteksi_rank }}</td>
                  <td>{{ item.deteksi_score }}</td>
                  <td>{{ item.deteksi_keterangan }}</td>
                  <td>
                    <progress class="progress progress-info w-full" :value="item.deteksi_score" max="100"></progress>
                  </td>
                </tr>
                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm">3. SQ (Spiritual
          Quotient) : {{ total_sq.deteksi_score }} : {{ total_sq.deteksi_keterangan }} </span>
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">No</th>
                  <th class="whitespace-nowrap w-5/12">Gangguan Karakter</th>
                  <th class="whitespace-nowrap w-1/100">Rank</th>
                  <th class="whitespace-nowrap w-1/100">%</th>
                  <th class="whitespace-nowrap w-1/100">ket</th>
                  <th class="whitespace-nowrap w-5/12"></th>
                </tr>
                <!-- row 1 -->
                <tr class="hover" v-for="(
                    item, index
                  ) in dataSq" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.nama }}</td>
                  <td>{{ item.deteksi_rank }}</td>
                  <td>{{ item.deteksi_score }}</td>
                  <td>{{ item.deteksi_keterangan }}</td>
                  <td>
                    <progress class="progress progress-info w-full" :value="item.deteksi_score" max="100"></progress>
                  </td>
                </tr>
                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm">TOTAL : {{ total.deteksi_score
        }} : {{ total.deteksi_keterangan }} </span>
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

  </div>
</template>

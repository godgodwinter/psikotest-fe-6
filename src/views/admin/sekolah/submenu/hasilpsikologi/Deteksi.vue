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
      `owner/hasilpsikologi/detail/${route.params.id}`
    );
    dataAsli.value = response.data;
    dataDetail.value = response.data;
    siswa.value = response.data;

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
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Deteksi Psikologis</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
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

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm"
          >1.Deteksi Gangguan Masalah</span
        >
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
                <tr
                  class="hover"
                  v-for="(item, index) in siswa.deteksi.apiprobk_deteksi_list"
                  :key="item.id"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.deteksi_nama }}</td>
                  <td>{{ item.deteksi_rank }}</td>
                  <td>{{ item.deteksi_score }}</td>
                  <td>{{ item.deteksi_keterangan }}</td>
                  <td>
                    <progress
                      class="progress progress-info w-full"
                      :value="item.deteksi_score"
                      max="100"
                    ></progress>
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
        <span
          class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm"
          >KETERANGAN NEGATIF</span
        >
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
                  <th class="whitespace-nowrap w-1/100">Range</th>
                  <th class="whitespace-nowrap w-1/100">:</th>
                  <th class="whitespace-nowrap w-full">Keterangan</th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in dataKetNegativ">
                  <td class="text-center">{{ item.label }}</td>
                  <td>:</td>
                  <td>{{ item.ket }} ({{ item.kode }})</td>
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
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >KESIMPULAN DAN SARAN</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >II. EQ (Emotional Quotient):
          {{ siswa.deteksi.deteksi_eq_total_persen }}
          {{ siswa.deteksi.deteksi_eq_total_keterangan }}</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >III. SCQ (Social Quotient):
          {{ siswa.deteksi.deteksi_scq_total_persen }}
          {{ siswa.deteksi.deteksi_scq_total_keterangan }}
        </span>
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>
    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >Saat ini anda memiliki Gangguan Karakter :{{
            siswa.deteksi.deteksi_total_persen
          }}
          {{ siswa.deteksi.deteksi_total_keterangan }} yang dapat menimbulkan
          masalah dan mengganggu aktivitas usaha anda dalam mencapai
          keberhasilan. Sedangkan karakter negatif yang perlu anda kendalikan
          dan bersifat merugikan di antaranya yaitu dalam Posisi Nilai Cukup
          Tinggi ke atas sampai nilai Sangat Tinggi Sekali, nilai Cukup perlu
          diperhatikan dikhawatirkan suatu saat akan mengalami perubahan
          meningkat.</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>
  </div>
</template>

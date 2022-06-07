<script setup>
import { ref } from "vue";
import Fungsi from "@/components/lib/Psikotest.js";
const props = defineProps({
  siswa: Object,
  default() {
    return null;
  },
  aspekKepribadianRank: Object,
  default() {
    return null;
  },
  temp: Object,
  default() {
    return null;
  },
  paket: Object,
  default() {
    return null;
  },
});
const siswa = ref(props.siswa);
const aspekKepribadianRank = ref(props.aspekKepribadianRank);
const temp = ref(props.temp);
const paket = ref(props.paket);

siswa.value.iq_ket = Fungsi.iqKet(props.siswa.sertifikat.iq);
siswa.value.eq_persen_keterangan = Fungsi.kepanjangan(
  props.siswa.sertifikat.eq_persen_keterangan
);
siswa.value.scq_persen_keterangan = Fungsi.kepanjangan(
  props.siswa.sertifikat.scq_persen_keterangan
);
siswa.value.iqh = Fungsi.kepanjangan(props.siswa.sertifikat.iqh);
siswa.value.eq_persen_keterangan = Fungsi.kepanjangan(
  props.siswa.sertifikat.eq_persen_keterangan
);
siswa.value.scq_persen_keterangan = Fungsi.kepanjangan(
  props.siswa.sertifikat.scq_persen_keterangan
);
siswa.value.iq_kesimpulan = Fungsi.getKesimpulanIq(props.siswa.sertifikat.iq);
siswa.value.eqsq_kesimpulan = Fungsi.getKesimpulanEqSq(
  props.siswa.sertifikat.iq
);

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
    altCode: "CB",
  },
  {
    label: "Kurang Baik",
    code: "KB",
  },
  {
    label: "Baik",
    code: "B",
  },
  {
    label: "Sangat Baik",
    code: "SB",
  },
  {
    label: "Sangat Baik Sekali",
    code: "SBS",
  },
]);
</script>
<template>
  <div v-if="siswa">
    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
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
          >ASPEK PSIKOLOGIS YANG DIUNGKAP</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <!-- row 1 -->
                <tr>
                  <td class="whitespace-nowrap w-1/100">I.</td>
                  <td class="whitespace-nowrap w-1/100">
                    IQ (Intelegence Quotient) / IST
                  </td>
                  <td class="whitespace-nowrap w-1/100">:</td>
                  <td class="whitespace-nowrap w-1/100">
                    {{ siswa.sertifikat.iq }}
                  </td>
                  <td>/ {{ siswa.iq_ket }}</td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">II.</td>
                  <td class="whitespace-nowrap w-1/100">
                    EQ (Emotional Quotient)
                  </td>
                  <td class="whitespace-nowrap w-1/100">:</td>
                  <td class="whitespace-nowrap w-1/100">
                    {{ siswa.sertifikat.eq_persen }}
                  </td>
                  <td>/ {{ siswa.eq_persen_keterangan }}</td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">III.</td>
                  <td class="whitespace-nowrap w-1/100">
                    Sc.Q (Social Quotient)
                  </td>
                  <td class="whitespace-nowrap w-1/100">:</td>
                  <td class="whitespace-nowrap w-1/100">
                    {{ siswa.sertifikat.scq_persen }}
                  </td>
                  <td>/ {{ siswa.scq_persen_keterangan }}</td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap">
      <div class="w-full lg:w-3/6">
        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table
              class="table table-compact table-zebra w-full shadow shadow-sm"
            >
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">IV.</th>
                  <th class="whitespace-nowrap w-1/12">ASPEK KEPRIBADIAN</th>
                  <th class="whitespace-nowrap w-1/100">%</th>
                  <th class="whitespace-nowrap w-1/100">Keterangan</th>
                  <th class="whitespace-nowrap w-1/100">Rank</th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank">
                  <td>{{ index + 1 }}</td>
                  <td class="whitespace-nowrap w-1/12">{{ item.nama }}</td>
                  <td>{{ item.persen }}</td>
                  <td class="whitespace-pre-wrap">
                    {{ item.keterangan }}
                  </td>
                  <td>{{ item.rank }}</td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-3/6">
        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100"></th>
                  <th class="whitespace-nowrap w-5/12">
                    ANALISA KEPRIBADIAN TERKUAT
                  </th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank.slice(0, 5)">
                  <td>{{ index + 1 }}.</td>
                  <td>{{ item.nama }}</td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100"></th>
                  <th class="whitespace-nowrap w-5/12">
                    Faktor Kepribadian Subyek Terkuat Positif (+)
                  </th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank.slice(0, 5)">
                  <td>{{ index + 1 }}.</td>
                  <td class="whitespace-pre-wrap">
                    {{ item.positif_diungkap }}
                  </td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100"></th>
                  <th class="whitespace-nowrap w-5/12">
                    Faktor Kepribadian Subyek Terkuat Negatif (-)
                  </th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank.slice(0, 5)">
                  <td>{{ index + 1 }}.</td>
                  <td class="whitespace-pre-wrap">
                    {{ item.negatif_diungkap }}
                  </td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- card -->
        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">IX.</th>
                  <th class="whitespace-nowrap w-5/12">
                    TIPE BAKAT YANG DISUKAI
                  </th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>{{ siswa.sertifikat.tipe_bakat_1 }}</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>{{ siswa.sertifikat.tipe_bakat_2 }}</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>{{ siswa.sertifikat.tipe_bakat_3 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- card -->

        <!-- card -->
        <div class="bg-base-100 shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">X.</th>
                  <th class="whitespace-nowrap w-5/12">
                    MINAT PEKERJAAN TERKUAT
                  </th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>{{ siswa.sertifikat.minat_pekerjaan_1 }}</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>{{ siswa.sertifikat.minat_pekerjaan_2 }}</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>{{ siswa.sertifikat.minat_pekerjaan_3 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- card -->
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >V. KESIMPULAN DAN SARAN</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <div
          class="text-lg sm:text-lg leading-1 font-md text-gray-600 shadow-sm space-y-2"
        >
          <p class="indent-8">
            Potensi kecerdasan subyek yang dapat digunakan saat ini
            <b> {{ siswa.iq }}</b
            >,(IQ=<b>{{ siswa.iq }}</b
            >, IST KM=<b>{{ siswa.sertifikat.iq_persen }}%)</b> artinya dengan
            tingkat kemampuan menggunakan kecerdasan majemuk tergolong
            <b>{{ siswa.iqh }}</b
            >.
          </p>
          <p class="indent-8" v-if="temp.length > 7">
            Dalam belajar subyek disarankan menggunakan
            <b>{{ temp[0].nama }},{{ temp[1].nama }}, {{ temp[2].nama }} </b>,
            sedangkan yang perlu dilatih dan dibiasakan yaitu
            <b> {{ temp[6].nama }} dan {{ temp[7].nama }}</b
            >.
          </p>

          <p class="indent-8" v-if="temp.length > 7">
            Kecerdasan Emosi nya
            <b
              >{{ siswa.eq_persen_keterangan }},({{
                siswa.sertifikat.eq_persen
              }}%)</b
            >. Kecerdasan Sosialnya
            <b
              >{{ siswa.scq_persen_keterangan }} (ScQ=
              {{ siswa.sertifikat.scq_persen }}%)</b
            >. Karakter kepribadian subyek yang terkuat dan mempengaruhi
            aktivitas sehari-hari yaitu
            <b>
              {{ aspekKepribadianRank[0].nama }},
              {{ aspekKepribadianRank[1].nama }},
              {{ aspekKepribadianRank[2].nama }},
              {{ aspekKepribadianRank[3].nama }},
              {{ aspekKepribadianRank[4].nama }}
            </b>
            terdiri dari aspek positif dan perlu ditingkatkan, dikembangkan, dan
            dipertahankan, sedangkan aspek negatif perlu dirubah dan
            dikendalikan supaya tidak menghambat prestasi subyek.
          </p>
          <!-- kesimpulan -->
          <div v-if="paket.ist == 'Aktif'">
            <p class="indent-8">
              Dalam kelanjutan studi
              <b>{{ siswa.iq_kesimpulan }} </b> tapi perlu ditunjang oleh EQ dan
              SQ <b> {{ siswa.eqsq_kesimpulan }}</b> dari potensi kecerdasan
              yang dimiliki subyek dan menunjukkan adanya upaya keseimbangan
              antara potensi kecerdasan koqnitif - usaha / semangat didukung
              oleh emosi positif - kematangan kemampuan sosialnya.
            </p>
            <!-- jika kelas 9  -->
            <p
              class="indent-8"
              v-if="kelas == 'IX' || kelas == 'ix' || kelas == '9'"
            >
              Kelanjutan studi disarankan masuk Sekolah
              <b> {{ siswa.sertifikat.saran_fakultas_1 }} </b> dengan Jurusan
              <b> {{ siswa.sertifikat.saran_fakultas_1_prodi }}</b
              >, Sekolah <b> {{ siswa.sertifikat.saran_fakultas_2 }}</b> dengan
              Jurusan <b> {{ siswa.sertifikat.saran_fakultas_2_prodi }}</b
              >.
            </p>
            <!-- jika  kelas 12 -->

            <p
              class="indent-8"
              v-else-if="
                kelas == 'XI' || kelas == 'xi' || kelas == '11' || kelas == '12'
              "
            >
              Kelanjutan studi disarankan masuk Fakultas
              <b> {{ siswa.sertifikat.saran_fakultas_1 }} </b> dengan Prodi
              <b> {{ siswa.sertifikat.saran_fakultas_1_prodi }}</b
              >, Fakultas
              <b> {{ siswa.sertifikat.saran_fakultas_2 }} </b> dengan Prodi
              <b> {{ siswa.sertifikat.saran_fakultas_2_prodi }}</b>
            </p>
          </div>
        </div>
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Api from "@/axios/axios";
import ApiPaketsoal from "@/services/api/apiPaketsoal";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const router = useRouter();
const route = useRoute();
const ujian_proses_id = route.params.ujian_proses_id;

const dataProses = ref([]);
const getDataProses = async () => {
  try {
    const response = await Api.get(`admin/menuujian/proses/${ujian_proses_id}`);
    dataProses.value = response.data;
    getdataKelas();

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataProses();

const dataForm = ref({
  prefix: "Sekolah",
  tgl: moment().format("YYYY-MM-DD"),
});
const dataKelas = ref([]);
let pilihKelas = ref([]);
// get Kelas
const getdataKelas = async () => {
  try {
    const response = await Api.get(
      `admin/datasekolah/${dataProses.value.sekolah_id}/kelas`
    );
    // console.log(response);
    dataKelas.value = response.data;
    dataKelas.value.forEach((item) => {
      pilihKelas.value.push({
        label: item.nama,
        id: item.id,
      });
    });

    dataForm.value.kelas_id = {
      id: pilihKelas.value[0].id,
      label: pilihKelas.value[0].label,
    };
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};

const dataPaketsoal = ref([]);
let pilihPaketsoal = ref([]);
// get Kelas
const getdataPaketsoal = async () => {
  try {
    const response = await Api.get(`admin/menuujian/paketsoal`);
    // console.log(response);
    dataPaketsoal.value = response.data;
    dataPaketsoal.value.forEach((item) => {
      pilihPaketsoal.value.push({
        label: item.nama,
        id: item.id,
      });
    });

    dataForm.value.paketsoal_id = {
      id: pilihPaketsoal.value[0].id,
      label: pilihPaketsoal.value[0].label,
    };
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getdataPaketsoal();

const onSubmit = async (values) => {
  // console.log(values);
  let dataFormSend = {
    kelas_id: dataForm.value.kelas_id.id,
    paketsoal_id: dataForm.value.paketsoal_id.id,
    ujian_proses_id,
  };
  // console.log(dataForm);
  try {
    const response = await Api.post(
      `admin/menuujian/proseskelas/${ujian_proses_id}/kelas`,
      dataFormSend
    );
    console.log(response);
    // data.id = response.id;
    Toast.success("Info", "Data berhasil ditambahkan!");
    router.push({ name: "admin.ujian.kelas", params: { ujian_proses_id } });

    return true;
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div>
    <RouterLink
      :to="{ name: 'admin.ujian.kelas', params: { ujian_proses_id } }"
    >
      <button class="btn btn-sm btn-secondary">Kembali</button></RouterLink
    >
  </div>

  <h1 class="text-lg font-bold">DETAIL : {{ dataProses.nama }}</h1>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <div class="py-2 lg:py-4 px-4">
      <div class="space-y-4">
        <div class="flex flex-col">
          <label> Kelas : </label>
          <div>
            <v-select
              class="py-2 px-3 w-72 mx-auto md:mx-0"
              :options="pilihKelas"
              v-model="dataForm.kelas_id"
              v-bind:class="{ disabled: false }"
            ></v-select>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.kelas_id }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label> Paket Soal : </label>
          <div>
            <v-select
              class="py-2 px-3 w-72 mx-auto md:mx-0"
              :options="pilihPaketsoal"
              v-model="dataForm.paketsoal_id"
              v-bind:class="{ disabled: false }"
            ></v-select>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.paketsoal_id }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-end py-10 px-10 gap-4">
      <!-- <span class="btn btn-secondary">Batal</span> -->
      <button class="btn btn-primary">Simpan</button>
    </div>
  </Form>
  <!-- <div>
    <h1 class="font-bold text-2xl">jika sekolah</h1>
    <div class="py-2 lg:py-4 px-4">Pilih Sekolah : dari Tabel Sekolah</div>
    <div class="py-2 lg:py-4 px-4">
      Pilih Kelas : dari Tabel Kelas [array] => pilih siswa | all
    </div>
    atau
    <div class="py-2 lg:py-4 px-4">
      Pilih Siswa : dari Tabel Siswa [array] // generate dari pilih kelas
    </div>
  </div>

  <div>
    <h1 class="font-bold text-2xl">jika Umum</h1>
    <div class="py-2 lg:py-4 px-4">
      Pilih Perserta : dari Tabel Umum [array]
    </div>
  </div>
  <div class="py-2 lg:py-4 px-4">
    <button class="btn btn-primary">Buat Jadwal</button>
  </div> -->
</template>

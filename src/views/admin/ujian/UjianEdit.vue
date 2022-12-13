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
const id = route.params.id;
const dataForm = ref({
  prefix: "Sekolah",
  tgl: moment().format("YYYY-MM-DD"),
});
const dataSekolah = ref([]);
let pilihSekolah = ref([]);
// get Kelas
const getdataSekolah = async () => {
  try {
    const response = await Api.get(`admin/sekolah`);
    // console.log(response);
    dataSekolah.value = response.data;
    dataSekolah.value.forEach((item) => {
      pilihSekolah.value.push({
        label: item.nama,
        id: item.id,
      });
    });

    dataForm.value.sekolah_id = {
      id: pilihSekolah.value[0].id,
      label: pilihSekolah.value[0].label,
    };
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getdataSekolah();
const getDataDetail = async () => {
  try {
    const response = await Api.get(`admin/menuujian/proses/${id}`);

    dataForm.value.tgl = response.data.tgl;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataDetail();

const onSubmit = async (values) => {
  // console.log(values);
  let dataFormSend = {
    // sekolah_id: dataForm.value.sekolah_id.id,
    tgl: dataForm.value.tgl,
    // prefix: dataForm.value.prefix,
  };
  // console.log(dataForm);
  try {
    const response = await Api.put(`admin/menuujian/proses/${id}`, dataFormSend);
    console.log(response);
    // data.id = response.id;
    Toast.success("Info", "Data berhasil ditambahkan!");
    router.push({ name: "admin.ujian" });

    return true;
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <div class="py-2 lg:py-4 px-4">
      <div class="space-y-4">
        <!-- <div class="flex flex-col">
          <label> Peserta : </label>
          <div>
            <Field :rules="fnValidasi.validateSelect" v-model="dataForm.prefix" name="prefix"
              class="select select-bordered w-11/12" as="select">
              <option value="Sekolah" selected>Sekolah</option>
            </Field>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.prefix }}
            </div>
          </div>
        </div> -->
        <!-- <div class="flex flex-col">
          <label> Sekolah : </label>
          <div>
            <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihSekolah" v-model="dataForm.sekolah_id"
              v-bind:class="{ disabled: false }"></v-select>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.sekolah_id }}
            </div>
          </div>
        </div> -->
        <div class="flex flex-col">
          <label>Batas Tanggal Pengerjaan : </label>
          <div>
            <Field :rules="fnValidasi.validateData" v-model="dataForm.tgl" name="tgl" type="date"
              class="input input-bordered w-11/12" />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.tgl }}
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

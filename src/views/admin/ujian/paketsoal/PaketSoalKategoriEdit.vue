<script setup>
import TabLinkPaketSoal from "./TabLinkPaketSoal.vue";
import { ref } from "vue";
import Api from "@/axios/axios";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import ToolBar from "@/components/atoms/editor/ToolBar.vue";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
import Toast from "@/components/lib/Toast";
import { useRoute, useRouter } from "vue-router";
import ApiPaketsoalKategori from "@/services/api/apiPaketsoalKategori";

const router = useRouter();
const route = useRoute();
const paketsoal_id = route.params.paketsoal_id;
const kategori_id = route.params.kategori_id;
const dataDetail = ref([]);
const getDataDetail = async () => {
  try {
    const response = await Api.get(`admin/menuujian/menupaketsoal/${paketsoal_id}/kategori/${kategori_id}`);
    dataDetail.value = response.data;
    dataForm.value.ujian_kategori_id = dataDetail.value.ujian_kategori_id;
    dataForm.value.nama = dataDetail.value.nama;
    dataForm.value.instruksiStatus = dataDetail.value.instruksi_status == 'Aktif' ? true : false;
    dataForm.value.lembar_prasoalStatus = dataDetail.value.lembar_prasoal_status == 'Aktif' ? true : false;
    dataForm.value.instruksi_pengerjaanStatus = dataDetail.value.instruksi_pengerjaan_status == 'Aktif' ? true : false;
    dataForm.value.instruksi = dataDetail.value.instruksi;
    dataForm.value.lembar_prasoal = dataDetail.value.lembar_prasoal;
    dataForm.value.instruksi_pengerjaan = dataDetail.value.instruksi_pengerjaan;
    dataForm.value.waktu = dataDetail.value.waktu;
    dataForm.value.randomSoal = dataDetail.value.random_soal == 'Aktif' ? true : false;
    dataForm.value.randomPilihanJawaban = dataDetail.value.random_pilihanjawaban == 'Aktif' ? true : false;
    // console.log(dataDetail.value);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataDetail();

const dataForm = ref({
  ujian_kategori_id: "",
  nama: "",
  instruksiStatus: false,
  lembar_prasoalStatus: false,
  instruksi_pengerjaanStatus: false,
});
const dataKategori = ref([]);
let pilihKategori = ref([]);
// get Kelas
const getDataKategori = async () => {
  try {
    const response = await Api.get(`admin/menuujian/kategori`);
    // console.log(response);
    dataKategori.value = response.data;
    dataKategori.value.forEach((item) => {
      pilihKategori.value.push({
        label: item.nama,
        id: item.id,
      });
    });

    dataForm.value.ujian_kategori_id = {
      id: pilihKategori.value[0].id,
      label: pilihKategori.value[0].label,
    };
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataKategori();

const onSubmit = async (values) => {
  values.ujian_kategori_id = dataForm.value.ujian_kategori_id.id;
  values.random_soal = dataForm.value.randomSoal
    ? "Aktif"
    : "Nonaktif";
  values.random_pilihanjawaban = dataForm.value.randomPilihanJawaban
    ? "Aktif"
    : "Nonaktif";
  values.instruksi_status = dataForm.value.instruksiStatus
    ? "Aktif"
    : "Nonaktif";
  values.lembar_prasoal_status = dataForm.value.lembar_prasoalStatus
    ? "Aktif"
    : "Nonaktif";
  values.instruksi_pengerjaan_status = dataForm.value.instruksi_pengerjaanStatus
    ? "Aktif"
    : "Nonaktif";
  // console.log(values);
  values.instruksi = dataForm.value.instruksi;
  values.lembar_prasoal = dataForm.value.lembar_prasoal;
  values.instruksi_pengerjaan = dataForm.value.instruksi_pengerjaan;
  const resSubmit = await ApiPaketsoalKategori.doUpdate(
    paketsoal_id,
    kategori_id,
    values
  );
  if (resSubmit) {
    Toast.success("Info", "Data berhasil ditambahkan!");
    router.push({
      name: "admin.ujian.paketsoal.kategori",
      params: { paketsoal_id },
    });
  }
};
</script>
<template>
  <TabLinkPaketSoal />
  <div class="p-4">
    <span class="btn btn-secondary btn-sm" @click="router.go(-1)">Kembali</span>
  </div>
  <!-- <div class="py-2 lg:py-4 px-4">Form Buat Paket Kategori Soal</div>
  <div>
    <h1>Judul</h1>
    <h1>Pilih Kategori</h1>
    <h1>Waktu pengerjaan</h1>
    <h1>Instruksi</h1>
    <h1>Lembar Prasoal</h1>
    <h1>Instruksi Pengerjaan</h1>
    <h1>Pilih Soal []</h1>
  </div> -->

  <Form v-slot="{ errors }" @submit="onSubmit" v-if="dataDetail">
    <div class="py-2 lg:py-4 px-4">
      <div class="space-y-4">
        <div class="flex flex-col">
          <label> Edit Kategori : </label>
          <div>
            <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihKategori"
              v-model="dataForm.ujian_kategori_id" v-bind:class="{ disabled: false }"></v-select>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.select }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Judul : Ex: IPA 2022 A</label>
          <div>
            <Field :rules="fnValidasi.validateData" v-model="dataForm.nama" name="nama" type="text"
              class="input input-bordered w-11/12" />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.nama }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Waktu : (menit)</label>
          <div>
            <Field :rules="fnValidasi.validateDataNumber" v-model="dataForm.waktu" name="waktu" type="text" max="100"
              min="0" class="input input-bordered w-11/12" />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.waktu }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="max-w-xs py-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Random Soal</span>
                <input type="checkbox" class="toggle" v-model="dataForm.randomSoal" name="randomSoal" />
              </label>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="max-w-xs py-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Random Pilihan Jawaban</span>
                <input type="checkbox" class="toggle" v-model="dataForm.randomPilihanJawaban"
                  name="randomPilihanJawaban" />
              </label>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="max-w-xs py-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Instruksi</span>
                <input type="checkbox" class="toggle" v-model="dataForm.instruksiStatus" name="instruksiStatus" />
              </label>
            </div>
          </div>
          <div>
            <!-- <Field v-if="dataForm.instruksiStatus" :rules="fnValidasi.validateData" v-model="dataForm.instruksi"
              name="instruksi" type="text" placeholder="Instruksi" class="input input-bordered w-11/12" /> -->
            <textarea v-if="dataForm.instruksiStatus" v-model="dataForm.instruksi" :rules="fnValidasi.validateData"
              name="instruksi" ref="instruksi" class="textarea textarea-bordered md:w-full  w-11/12" placeholder="">
            </textarea>
            <div class="text-xs text-red-600 mt-1">
              {{ errors.instruksi }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="max-w-xs py-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Lembar Prasoal </span>
                <input type="checkbox" class="toggle" v-model="dataForm.lembar_prasoalStatus"
                  name="lembar_prasoalStatus" />
              </label>
            </div>
          </div>
          <div>
            <!-- <Field v-if="dataForm.lembar_prasoalStatus" :rules="fnValidasi.validateData"
              v-model="dataForm.lembar_prasoal" name="lembar_prasoal" type="text"
              class="input input-bordered w-11/12" /> -->
            <textarea v-if="dataForm.lembar_prasoalStatus" v-model="dataForm.lembar_prasoal"
              :rules="fnValidasi.validateData" name="lembar_prasoal" ref="lembar_prasoal"
              class="textarea textarea-bordered md:w-full  w-11/12" placeholder="">
            </textarea>
            <div class="text-xs text-red-600 mt-1">
              {{ errors.lembar_prasoal }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="max-w-xs py-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Instruksi Pengerjaan</span>
                <input type="checkbox" class="toggle" v-model="dataForm.instruksi_pengerjaanStatus"
                  name="instruksi_pengerjaanStatus" />
              </label>
            </div>
          </div>
          <div>
            <!-- <Field v-if="dataForm.instruksi_pengerjaanStatus" :rules="fnValidasi.validateData"
              v-model="dataForm.instruksi_pengerjaan" name="instruksi_pengerjaan" type="text"
              class="input input-bordered w-11/12" /> -->
            <textarea v-if="dataForm.instruksi_pengerjaanStatus" v-model="dataForm.instruksi_pengerjaan"
              :rules="fnValidasi.validateData" name="instruksi_pengerjaan" ref="instruksi_pengerjaan"
              class="textarea textarea-bordered md:w-full  w-11/12" placeholder="">
            </textarea>
            <div class="text-xs text-red-600 mt-1">
              {{ errors.instruksi_pengerjaan }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-end py-10 px-10 gap-4">
      <!-- <button class="btn btn-warning">Draft</button> -->
      <span class="btn btn-secondary" @click="router.go(-1)">Batal</span>
      <button class="btn btn-primary">Simpan</button>
    </div>
  </Form>
</template>

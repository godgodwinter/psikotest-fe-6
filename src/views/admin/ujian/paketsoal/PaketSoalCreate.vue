<script setup>
import { ref } from "vue";
import Api from "@/axios/axios";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import ToolBar from "@/components/atoms/editor/ToolBar.vue";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
import Toast from "@/components/lib/Toast";

const dataForm = ref({
  ujian_kategori_id: "",
  nama: "",
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
  console.log(values);
  // const resSubmit = await ApiBanksoal.doStoreData(values);
  // if (resSubmit) {
  //   Toast.success("Info", "Data berhasil ditambahkan!");
  //   // router.push({ name: "AdminKategori" });
  // }
};
</script>
<template>
  <div class="py-2 lg:py-4 px-4">Form Buat Paket Kategori Soal</div>
  <div>
    <h1>Judul</h1>
    <h1>Pilih Kategori</h1>
    <h1>Waktu pengerjaan</h1>
    <h1>Instruksi</h1>
    <h1>Lembar Prasoal</h1>
    <h1>Instruksi Pengerjaan</h1>
    <h1>Pilih Soal []</h1>
  </div>

  <Form v-slot="{ errors }" @submit="onSubmit">
    <div class="py-2 lg:py-4 px-4">
      <div class="space-y-4">
        <div class="flex flex-col">
          <label> Kategori : </label>
          <div>
            <v-select
              class="py-2 px-3 w-72 mx-auto md:mx-0"
              :options="pilihKategori"
              v-model="dataForm.ujian_kategori_id"
              v-bind:class="{ disabled: false }"
            ></v-select>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.select }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Nama / Kode Kategori : </label>
          <div>
            <Field
              :rules="fnValidasi.validateData"
              v-model="dataForm.nama"
              name="nama"
              type="text"
              class="input input-bordered w-11/12"
            />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.nama }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Waktu : (menit)</label>
          <div>
            <Field
              :rules="fnValidasi.validateDataNumber"
              v-model="dataForm.waktu"
              name="waktu"
              type="text"
              max="100"
              min="0"
              class="input input-bordered w-11/12"
            />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.waktu }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Instruksi: </label>
          <div>
            <Field
              :rules="fnValidasi.validateData"
              v-model="dataForm.instruksi"
              name="instruksi"
              type="text"
              class="input input-bordered w-11/12"
            />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.instruksi }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Lembar Prasoal : </label>
          <div>
            <Field
              :rules="fnValidasi.validateData"
              v-model="dataForm.lembar_prasoal"
              name="lembar_prasoal"
              type="text"
              class="input input-bordered w-11/12"
            />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.lembar_prasoal }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Instruksi Pengerjaan : </label>
          <div>
            <Field
              :rules="fnValidasi.validateData"
              v-model="dataForm.instruksi_pengerjaan"
              name="instruksi_pengerjaan"
              type="text"
              class="input input-bordered w-11/12"
            />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.instruksi_pengerjaan }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-end py-10 px-10 gap-4">
      <!-- <button class="btn btn-warning">Draft</button> -->
      <button class="btn btn-primary">Simpan</button>
    </div>
  </Form>
</template>

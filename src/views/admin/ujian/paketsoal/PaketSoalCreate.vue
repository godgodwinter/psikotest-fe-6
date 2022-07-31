<script setup>
import TabLinkPaketSoal from "./TabLinkPaketSoal.vue";
import { ref } from "vue";
import Api from "@/axios/axios";
import ApiPaketsoal from "@/services/api/apiPaketsoal";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import ToolBar from "@/components/atoms/editor/ToolBar.vue";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
import Toast from "@/components/lib/Toast";

const dataForm = ref({
  nama: "",
  prefix: "Sekolah",
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
  // console.log(values);
  const resSubmit = await ApiPaketsoal.doStoreData(values);
  if (resSubmit) {
    Toast.success("Info", "Data berhasil ditambahkan!");
    // router.push({ name: "AdminKategori" });
  }
};
</script>
<template>
  <TabLinkPaketSoal />
  <!-- <div class="py-2 lg:py-4 px-4">Form Buat Paket Soal</div>
  <div>
    <h1>Judul</h1>
    <h1>Pilih Prefix //Umum atau siswa</h1>
    <h1>Pilih Paket Kategori []</h1>
  </div> -->

  <Form v-slot="{ errors }" @submit="onSubmit">
    <div class="py-2 lg:py-4 px-4">
      <div class="space-y-4">
        <div class="flex flex-col">
          <label>Nama Paket Soal : </label>
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
          <label> Peserta : </label>
          <div>
            <Field
              :rules="fnValidasi.validateSelect"
              v-model="dataForm.prefix"
              name="prefix"
              class="select select-bordered w-11/12"
              as="select"
            >
              <option value="Sekolah" selected>Sekolah</option>
              <option value="Umum">Umum</option>
            </Field>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.prefix }}
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
</template>

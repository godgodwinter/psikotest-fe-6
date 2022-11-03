<script setup>
import ApiKategori from "@/services/api/apiKategori";
import { ref } from "vue";
import { useStoreKategori } from "@/stores/data/kategori";
import { Form, Field } from "vee-validate";
const storeKategori = useStoreKategori();
storeKategori.setPagesActive("create");
import fnValidasi from "@/components/lib/babengValidasi";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast";
import Api from "@/axios/axios.js";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const dataForm = ref({});

const resData = ref(null);
const getDataId = async () => {
  resData.value = await ApiKategori.getDataId(id);
  if (resData.value) {
    dataForm.value = resData.value;
    // console.log(dataForm.value.ujian_banksoal_aspek);
    inputPilihAspek.value = { label: dataForm.value.ujian_banksoal_aspek ? dataForm.value.ujian_banksoal_aspek.nama : null, id: dataForm.value.ujian_banksoal_aspek ? dataForm.value.ujian_banksoal_aspek.id : null };

  } else {
    Toast.warning("Info", "Data tidak ditemukan");
    router.push({ name: "admin.banksoal.kategori" });
  }
};
getDataId();
const onSubmit = async (values) => {
  values.ujian_banksoal_aspek_id = inputPilihAspek.value.id ? inputPilihAspek.value.id : null;
  // console.log(values);
  const resSubmit = await ApiKategori.doUpdate(id, values);
  if (resSubmit) {
    Toast.success("Info", "Data berhasil ditambahkan!");
    router.push({ name: "admin.banksoal.kategori" });
  }
};
const dataAspek = ref(null);
const inputPilihAspek = ref();

let pilihAspek = ref([
  // {
  //   label: "Belum masuk Kelas",
  //   id: "Belum masuk Kelas",
  // },
]);
const getDataAspek = async () => {
  try {
    const response = await Api.get(`admin/ujian_banksoal_aspek_tanpa_all`);
    // console.log(response);
    dataAspek.value = response.data;
    dataAspek.value.forEach(element => {
      // console.log(element);
      let temp = {
        label: element.nama,
        id: element.id,
      }
      pilihAspek.value.push(temp);
    })
    // console.log(pilihKepalaJurusan.value);
    return true;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataAspek();
</script>
<template>
  <div class="px-4 py-4" v-if="dataForm">
    <div class="w-full">
      <div class="shadow rounded-lg px-0">
        <div class="w-full lg:w-fi mx-4">
          <div class="p-2 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmit">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="rounded-lg">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label for="kategori" class="text-sm font-medium block mb-2">Nama Kategori
                        </label>

                        <Field :rules="fnValidasi.validateData2" v-model="dataForm.nama" name="nama" type="text"
                          class="input input-bordered w-11/12" />

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                    </div>
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label for="kategori" class="text-sm font-medium block mb-2">Aspek
                        </label>

                        <!-- <Field :rules="fnValidasi.validateData2" v-model="dataForm.nama" name="nama" type="text"
                          class="input input-bordered w-11/12" /> -->

                        <v-select class="py-2 px-3 w-11/12 mx-auto md:mx-0" :options="pilihAspek"
                          v-model="inputPilihAspek" v-bind:class="{ disabled: false }"></v-select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.pilihAspek }}
                        </div>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-end mt-4 px-20">
                      <button class="btn btn-active btn-lg btn-primary">
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

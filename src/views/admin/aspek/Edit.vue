<script setup>
const BASE_URL = import.meta.env.VITE_API_URL;
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import { Field, Form } from "vee-validate";
import Toast from "@/components/lib/Toast";
import fnValidasi from "@/components/lib/babengValidasi.js"

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const sekolah = computed(() => storeGuruBk.getSekolah);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(sekolah.value.id);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("aspek");
const router = useRouter();
const route = useRoute();

// get params id
const id = route.params.id;
const dataAsli = ref([]);
const dataDetail = ref([]);
const data = ref([]);

const getDataDetail = async () => {
  try {
    const response = await Api.get(`admin/ujian_banksoal_aspek/${id}`);
    dataDetail.value = response.data;
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataDetail();

const dataPaket = ref([]);
const getPaket = async () => {
  try {
    const response = await Api.get(`owner/paket`);
    // console.log(response);
    // dataDetail.value = response.data;
    dataPaket.value = response.data;

    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};

getPaket();

// validasi
const validateData = (value) => {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 1) {
    return "This Field must be at least 2 characters";
  }
  return true;
};
const onSubmit = () => {
  const res = doStoreData();
  // Toast.babeng("Info", "Fitur belum tersedia!");
};
const doStoreData = async (d) => {
  let dataStore = {
    nama: dataDetail.value.nama,
    tipe: dataDetail.value.tipe,
    status: dataDetail.value.status,
    urutan: dataDetail.value.urutan,
  };
  try {
    const response = await Api.put(`admin/ujian_banksoal_aspek/${id}`, dataStore);
    Toast.success("Success", "Data Berhasil ditambahkan!");
    // resetForm();
    router.push({ name: "admin.aspek" });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">
        {{ dataDetail.nama }}
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Aspek
          <BreadCrumbSpace /> Edit
        </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"></span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <span @click="router.go(-1)">
        <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Kembali
        </button></span>
    </div>
  </div>

  <div class="px-4 py-4">
    <div class="w-full">
      <div class="bg-white shadow rounded-lg px-0 py-4">
        <div class="w-full lg:w-fi mx-4">
          <div class="p-2 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmit">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div class="grid col-span-2">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Judul</label>
                        <Field v-model="dataDetail.nama" :rules="validateData" type="text" name="nama" ref="nama"
                          class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Status</label>
                        <!-- <select class="select select-bordered w-full max-w-xs" v-model="dataDetail.status" name="status"
                          ref="status" :rules="validateData">
                          <option>Aktif</option>
                          <option>Nonaktif</option>
                        </select> -->
                        <Field v-slot="{ value }" name="status" as="select"
                          class="select select-bordered w-full max-w-xs" v-model="dataDetail.status">
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                        </Field>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.status }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tipe</label>
                        <!-- <select class="select select-bordered w-full max-w-xs" v-model="dataDetail.tipe" name="tipe"
                          ref="tipe" :rules="validateData">
                          <option>Sendiri</option>
                          <option>Semua</option>
                        </select> -->
                        <Field v-slot="{ value }" name="tipe" as="select" class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.tipe">
                          <!-- <option v-for="drink in drinks" :key="drink" :value="drink"
                            :selected="value && value.includes(drink)">{{ drink }}</option> -->
                          <option value="Sendiri">Sendiri</option>
                          <option value="Semua">Semua</option>
                        </Field>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tipe }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Urutan</label>

                        <Field v-model="dataDetail.urutan" :rules="fnValidasi.validateDataNumber" type="text"
                          name="urutan" ref="urutan" class="input input-bordered md:w-full max-w-2xl" required />

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.urutan }}
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

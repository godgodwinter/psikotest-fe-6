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

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const sekolah = computed(() => storeGuruBk.getSekolah);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(sekolah.value.id);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("yayasan");
const router = useRouter();
const route = useRoute();

// get params id
const id = route.params.id;
const dataAsli = ref([]);
const dataDetail = ref([
  { batasbawah: 54.5, batasatas: 70.0, keterangan: "" },
  { batasbawah: 71.0, batasatas: 80.0, keterangan: "" },
  { batasbawah: 81.0, batasatas: 99.0, keterangan: "" },
]);
const data = ref([]);

const getDataDetail = async () => {
  try {
    const response = await Api.get(
      `owner/penanganandeteksimasalah/masterdeteksi/${id}`
    );
    data.value = response.data;
    if (response.data.penanganandeteksimasalah.length == 3) {
      dataDetail.value[0].keterangan =
        response.data.penanganandeteksimasalah[0].keterangan;
      dataDetail.value[1].keterangan =
        response.data.penanganandeteksimasalah[1].keterangan;
      dataDetail.value[2].keterangan =
        response.data.penanganandeteksimasalah[2].keterangan;
    }
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
};
const doStoreData = async (d) => {
  let dataStore = {
    dataForm: [
      {
        batasbawah: 54.5,
        batasatas: 70.0,
        keterangan: dataDetail.value[0].keterangan,
      },
      {
        batasbawah: 71.0,
        batasatas: 80.0,
        keterangan: dataDetail.value[1].keterangan,
      },
      {
        batasbawah: 81.0,
        batasatas: 99.0,
        keterangan: dataDetail.value[2].keterangan,
      },
    ],
  };
  try {
    const response = await Api.post(
      `owner/penanganandeteksimasalah/masterdeteksi/${id}`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil diupdate!");
    // resetForm();
    router.push({ name: "AdminPenanganan" });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const resetForm = () => {
  dataDetail.value = [
    { batasbawah: 54.5, batasatas: 70.0, keterangan: "" },
    { batasbawah: 71.0, batasatas: 80.0, keterangan: "" },
    { batasbawah: 81.0, batasatas: 99.0, keterangan: "" },
  ];
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        {{ data.nama }}
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Klasifikasi <BreadCrumbSpace /> Edit
        </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      ></span>
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
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Keterangan 1 (54,5 - 70)</label
                        >
                        <!-- <Field
                          v-model="dataDetail[0].keterangan"
                          :rules="validateData"
                          type="text"
                          name="keterangan1"
                          ref="keterangan1"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        /> -->
                        <textarea
                          v-model="dataDetail[0].keterangan"
                          :rules="validateData"
                          name="keterangan1"
                          ref="keterangan1"
                          class="textarea textarea-bordered md:w-full max-w-2xl h-52"
                          placeholder=""
                        ></textarea>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.keterangan1 }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Keterangan 2 (71 - 80)</label
                        >
                        <textarea
                          v-model="dataDetail[1].keterangan"
                          :rules="validateData"
                          name="keterangan2"
                          ref="keterangan2"
                          class="textarea textarea-bordered md:w-full max-w-2xl h-52"
                          placeholder=""
                        ></textarea>
                        <!-- <Field
                          v-model="dataDetail[1].keterangan"
                          :rules="validateData"
                          type="text"
                          name="keterangan2"
                          ref="keterangan2"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        /> -->
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.keterangan2 }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Keterangan 3 (81 - 99)</label
                        >
                        <textarea
                          v-model="dataDetail[2].keterangan"
                          :rules="validateData"
                          name="keterangan2"
                          ref="keterangan2"
                          class="textarea textarea-bordered md:w-full max-w-2xl h-52"
                          placeholder=""
                        ></textarea>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.keterangan3 }}
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

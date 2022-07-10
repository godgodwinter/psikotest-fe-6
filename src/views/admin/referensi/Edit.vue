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
storeAdminBar.setPagesActive("referensi");
const router = useRouter();
const route = useRoute();

// get params id
const id = route.params.id;
const dataAsli = ref([]);
const dataDetail = ref([]);
const data = ref([]);

const getDataDetail = async () => {
  try {
    const response = await Api.get(`owner/referensi/${id}`);
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
  if (dataDetail.value.tipe == "Upload") {
    if (fnValidateFile(fileUpload.value)) {
      // const res = doStoreData();
      fnDoUploadFile(fileUpload.value, "logo");
      // Toast.babeng("Info", "Fitur belum tersedia!");
    }
  } else {
    const res = doStoreData();
    // Toast.babeng("Info", "Fitur belum tersedia!");
  }
};
const doStoreData = async (d) => {
  let dataStore = {
    nama: dataDetail.value.nama,
    tipe: dataDetail.value.tipe,
    link: dataDetail.value.link,
    file: dataDetail.value.file,
    jenis: dataDetail.value.jenis,
  };
  try {
    const response = await Api.put(`owner/referensi/${id}`, dataStore);
    Toast.success("Success", "Data Berhasil ditambahkan!");
    // resetForm();
    router.push({ name: "AdminReferensi" });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const fileUpload = ref(null);
const filePreview = ref(null);
const onChangeFileUpload = (e) => {
  let file = e.target.files[0];
  fileUpload.value = file;
  filePreview.value = URL.createObjectURL(file);
  console.log(file, filePreview.value);
};

const fnValidateFile = (file) => {
  if (file) {
    if (file.size > 5048576) {
      Toast.danger("Warning", "File harus kurang dari 5mb!");
      return false;
    }
    // if (
    //   file.type != "application/pdf" &&
    //   file.type != "application/msword" &&
    //   file.type !=
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // ) {
    //   Toast.danger("Warning", "File harus .pdf/.doc/.docx!");
    //   return false;
    // }
    return true;
  } else {
    Toast.danger("Info", "Pilih File terlebih dahulu!");
    return false;
  }
};
const fnDoUploadFile = async (file, jenis) => {
  let link = `owner/referensi/${id}`;
  let formData = new FormData();
  formData.append("nama", dataDetail.value.nama);
  formData.append("tipe", dataDetail.value.tipe);
  formData.append("link", dataDetail.value.link);
  formData.append("jenis", dataDetail.value.jenis);
  formData.append("file", file);
  try {
    // const response = await Api.post(link, dataStore);

    const response = await Api.post(link, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Toast.success("Success", "Data Berhasil update!");
    // router.go();
    // resetForm();
    console.log(response);
    router.push({ name: "AdminReferensi" });
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
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        {{ dataDetail.nama }}
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
                      <div class="grid col-span-2">
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Judul</label
                        ><textarea
                          v-model="dataDetail.nama"
                          :rules="validateData"
                          name="nama"
                          ref="nama"
                          class="textarea textarea-bordered md:w-full max-w-2xl"
                          placeholder=""
                        ></textarea>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Jenis</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.jenis"
                          :rules="validateData"
                        >
                          <option disabled selected>Pilih ?</option>
                          <option>Studi</option>
                          <option>Kerja</option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.jenis }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Tipe</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.tipe"
                          :rules="validateData"
                        >
                          <option disabled selected>Pilih ?</option>
                          <option>Link</option>
                          <option>Upload</option>
                        </select>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tipe }}
                        </div>
                      </div>
                      <div v-if="dataDetail.tipe == 'Link'">
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Link</label
                        >
                        <Field
                          v-model="dataDetail.link"
                          type="text"
                          name="link"
                          ref="link"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.link }}
                        </div>
                      </div>
                      <div v-if="dataDetail.tipe == 'Upload'">
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >File</label
                        >

                        <p class="text-sm font-bold">
                          Pilih file :
                          <code class="text-red-400"
                            >.doc/docx/pdf - max 5 MB</code
                          >
                        </p>
                        <input
                          type="file"
                          name="fileUpload"
                          @change="onChangeFileUpload($event)"
                          class="input md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.file }}
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

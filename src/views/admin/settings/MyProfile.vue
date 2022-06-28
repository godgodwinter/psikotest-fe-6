<script setup>
import { ref, computed, watch } from "vue";
import BreadCrumb from "../../../components/atoms/BreadCrumb.vue";
import { Field, Form } from "vee-validate";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast.js";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreGuruBk } from "@/stores/guruBk";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

moment.updateLocale("id", localization);
const storeGuruBk = useStoreGuruBk();
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("profile");

const getPaket = computed(() => storeGuruBk.getPaket);
const getStats = computed(() => storeGuruBk.getStats);
const getIdentitas = computed(() => storeGuruBk.getIdentitas);
const getSekolah = computed(() => storeGuruBk.getSekolah);
const data = ref([]);
const dataDetail = ref({
  nama: getIdentitas.value.nama,
});

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

// vue pinia watch
storeGuruBk.$subscribe((mutation, state) => {});

const onSubmit = () => {
  const res = doStoreData();
};

const doStoreData = async (d) => {
  let dataStore = {
    nama: dataDetail.value.nama,
  };
  try {
    const response = await Api.post(`owner/myprofile/update`, dataStore);
    Toast.success("Success", "Data Berhasil update!");
    // router.go();
    // resetForm();

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const isPasswordSama = ref(false);
const doAlertPasswordTidakSama = () => {
  Toast.warning("Info", "Gagal! Password tidak sama!");
};

const dataForm2 = ref({
  password: "",
  password_confirmation: "",
});
const periksaPassword = () => {
  //   Toast.success("Info", `tes ${dataForm2.value.password}`);
  if (dataForm2.value.password != "") {
    if (dataForm2.value.password != dataForm2.value.password_confirmation) {
      isPasswordSama.value = false;
      //   doAlertPasswordTidakSama();
    } else {
      //   Toast.success("Info", "Password sama!");
      isPasswordSama.value = true;
    }
  }
};

const validateDataForm2 = (value) => {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 3) {
    return "This Field must be at least 2 characters";
  }
  return true;
};
const onSubmitForm2 = () => {
  const res = doStoreDataForm2();
};

const doStoreDataForm2 = async (d) => {
  let dataStore = {
    password: dataForm2.value.password,
  };
  try {
    const response = await Api.post(
      `owner/myprofile/updatepassword`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil update!");
    // router.go();
    // resetForm();

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const fnValidateFile = (file) => {
  if (file) {
    if (file.size > 1048576) {
      Toast.danger("Warning", "File harus kurang dari 1mb!");
      return false;
    }
    if (file.type != "image/jpeg" && file.type != "image/png") {
      Toast.danger("Warning", "File harus jpg/png!");
      return false;
    }

    return true;
  } else {
    Toast.danger("Info", "Pilih File terlebih dahulu!");
    return false;
  }
};
const fnDoUploadFile = async (file, jenis) => {
  let link = "";
  if (jenis == "logo") {
    link = `yayasan/myprofile/upload/logo`;
  } else if (jenis == "kepala") {
    link = `yayasan/myprofile/upload/kepala`;
  } else {
    link = `yayasan/myprofile/upload/user`;
  }

  let formData = new FormData();
  formData.append("file", file);
  //   formData.append("file", file.value.files[0]);
  //   let dataStore = {
  //     file: file,
  //   };
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
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const photoLogoSekolah = ref(null);
const photoLogoSekolahFile = ref(null);
const doUploadLogoSekolah = () => {
  if (fnValidateFile(photoLogoSekolahFile.value)) {
    fnDoUploadFile(photoLogoSekolahFile.value, "logo");
    // Toast.babeng("Info", "Fitur belum tersedia!");
  }
};
const onChangePhotoLogoSekolah = (e) => {
  let file = e.target.files[0];
  photoLogoSekolahFile.value = file;
  photoLogoSekolah.value = URL.createObjectURL(file);
  console.log(file, photoLogoSekolah.value);
};

const photoKepalaSekolah = ref(null);
const photoKepalaSekolahFile = ref(null);
const doUploadPhotoKepalaSekolah = () => {
  if (fnValidateFile(photoKepalaSekolahFile.value)) {
    fnDoUploadFile(photoKepalaSekolahFile.value, "kepala");
    // Toast.babeng("Info", "Fitur belum tersedia!");
  }
};
const onChangePhotoKepalaSekolah = (e) => {
  let file = e.target.files[0];
  photoKepalaSekolahFile.value = file;
  photoKepalaSekolah.value = URL.createObjectURL(file);
  console.log(file, photoKepalaSekolah.value);
};

const getDataPhoto = async () => {
  try {
    const response = await Api.get(`yayasan/myprofile/upload/getphoto`);

    photoLogoSekolah.value = response.data.logo;
    photoKepalaSekolah.value = response.data.kepala;
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

getDataPhoto();
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
        >Profile</span
      >
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Profile <BreadCrumbSpace /> Index </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="px-4 pt-10">
    <h3 class="font-bold">UPDATE DATA YAYASAN</h3>
  </div>
  <div class="px-4 py-0">
    <div class="w-full">
      <div class="bg-base-100 shadow-lg rounded-lg px-0 py-0">
        <div class="w-full lg:w-fi mx-0">
          <div class="p-2 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-base-content block mb-2"
                          >Nama</label
                        >
                        <Field
                          v-model="dataDetail.nama"
                          :rules="validateData"
                          type="text"
                          name="nama"
                          ref="nama"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-base-content block mb-2"
                          >Alamat</label
                        >
                        <Field
                          v-model="dataDetail.alamat"
                          :rules="validateData"
                          type="text"
                          name="alamat"
                          ref="alamat"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.alamat }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-base-content block mb-2"
                          >Status</label
                        >
                        <select class="select select-bordered w-full" disabled>
                          <!-- <option disabled selected>Pilih Status ?</option> -->
                          <option>Aktif</option>
                          <option>Nonaktif</option>
                        </select>
                        <!-- <div class="text-xs text-red-600 mt-1">
                          {{ errors.status }}
                        </div> -->
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-base-content block mb-2"
                          >Nama Kepala Yayasan</label
                        >
                        <Field
                          v-model="dataDetail.kepala"
                          :rules="validateData"
                          type="text"
                          name="kepala"
                          ref="kepala"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kepala }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-base-content block mb-2"
                          >No Telp</label
                        >
                        <Field
                          v-model="dataDetail.telp"
                          :rules="validateData"
                          type="text"
                          name="telp"
                          ref="telp"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.telp }}
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-end mt-4 px-20">
                      <button class="btn btn-lg btn-primary">Simpan</button>
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

  <div class="px-4 py-10">
    <h3 class="font-bold">UPDATE PASSWORD</h3>
  </div>
  <div class="px-4 py-0 shadow-lg">
    <div class="w-full">
      <div class="bg-base-100 shadow rounded-lg px-0 py-0">
        <div class="w-full lg:w-fi mx-0">
          <div class="p-2 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmitForm2" v-if="data">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label
                          for="password"
                          class="text-sm font-medium text-base-content block mb-2"
                          >Password</label
                        >
                        <Field
                          v-model="dataForm2.password"
                          :rules="validateDataForm2"
                          type="password"
                          name="password"
                          ref="password"
                          class="input input-bordered md:w-full max-w-2xl"
                          @keyup="periksaPassword()"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.password }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="password2"
                          class="text-sm font-medium text-base-content block mb-2"
                          >Konfirmasi Password</label
                        >
                        <Field
                          v-model="dataForm2.password_confirmation"
                          :rules="validateDataForm2"
                          type="password"
                          name="password_confirmation"
                          ref="password_confirmation"
                          @keyup="periksaPassword()"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.password_confirmation }}
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-end mt-4 px-20 gap-4">
                      <div
                        class="collapse collapse-arrow shadow-sm border border-spacing-1"
                      >
                        <input type="checkbox" />
                        <div class="collapse-title text-md font-bold">
                          Catatan :
                        </div>
                        <div class="collapse-content text-sm">
                          <p># Minimal 3 Karakter</p>
                        </div>
                      </div>
                      <button
                        class="btn btn-lg btn-primary"
                        v-if="isPasswordSama"
                      >
                        Simpan
                      </button>
                      <span
                        class="btn btn-lg btn-dark"
                        v-else
                        @click="doAlertPasswordTidakSama()"
                      >
                        Simpan
                      </span>
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

  <div class="px-4 py-4">
    <h3 class="font-bold">UPDATE PHOTO</h3>
  </div>
  <div class="w-full flex justify-center flex-wrap">
    <div
      class="xl:flex felx-wrap gap-10 xl:w-full px-4 justify-center space-y-4"
    >
      <div class="card xl:w-2/5 bg-base-100 shadow-xl">
        <div class="w-full flex justify-center">
          <label
            class="avatar hover:scale-110 transition-all duration-500"
            for="my-modal-1"
          >
            <div class="w-52 mask mask-squircle">
              <img v-if="photoLogoSekolah" :src="photoLogoSekolah" />
              <img v-else src="@/assets/img/logo/github-copilot.svg" />
            </div>
          </label>
        </div>

        <!-- modal -->
        <input type="checkbox" id="my-modal-1" class="modal-toggle" />
        <label for="my-modal-1" class="modal cursor-pointer">
          <label class="modal-box relative" for="">
            <img v-if="photoLogoSekolah" :src="photoLogoSekolah" />
            <img v-else src="@/assets/img/logo/github-copilot.svg" />
          </label>
        </label>

        <!-- modal -->

        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ getSekolah.nama }}</h2>
          <div class="card-actions">
            <!-- <button class="btn btn-primary">Update Logo Sekolah</button> -->
          </div>
        </div>
        <div class="px-10 pt-2">
          <p class="text-sm font-bold">Pilih Logo :</p>
          <input
            type="file"
            name="photoLogoSekolah"
            @change="onChangePhotoLogoSekolah($event)"
            class="input md:w-full max-w-2xl"
            required
          />
        </div>
        <div class="flex justify-end px-10 pb-4">
          <button class="btn btn-lg btn-primary" @click="doUploadLogoSekolah()">
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="collapse collapse-arrow shadow-sm border border-spacing-1">
    <input type="checkbox" />
    <div class="collapse-title text-md font-bold">Catatan Upload PHOTO:</div>
    <div class="collapse-content text-sm">
      <p># Extensi : .jpg / .png</p>
      <p># Max Size : 1 MB<br /></p>
    </div>
  </div>
</template>

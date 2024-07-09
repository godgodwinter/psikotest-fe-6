<script setup>
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
const BASE_URL = import.meta.env.VITE_API_URL;
const storeGuruBk = useStoreGuruBk();
const sekolah = computed(() => storeGuruBk.getSekolah);
// const settings = computed(() => storeGuruBk.getSettings);
// const superadmin = ref(false);
// storeGuruBk.$subscribe((mutation, state) => {
//   superadmin.value = settings.value?.superadmin;
// });
// superadmin.value = settings.value?.superadmin;

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("sekolah");
const router = useRouter();
const route = useRoute();

// get params id
const id = route.params.id;
const dataAsli = ref([]);
const dataDetail = ref([]);
const data = ref([]);

const dataDetailTemp = ref({});
// const getDataDetail = async () => {
//   try {
//     const response = await Api.get(`owner/sekolah/${id}`);
//     dataDetail.value = response.data;
//     dataDetailTemp.value = {
//       kecamatan: dataDetail.value.kecamatan,
//       kabupaten: dataDetail.value.kabupaten,
//       provinsi: dataDetail.value.provinsi,
//     };
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// getDataDetail();

const dataPaket = ref([]);
const getPaket = async () => {
  try {
    // console.log(Api.get(`owner/paket`));
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
    nama: dataDetail.value.nama,
    alamat: dataDetail.value.alamat,
    status: dataDetail.value.status,
    kepsek_nama: dataDetail.value.kepsek_nama,
    tahunajaran_nama: dataDetail.value.tahunajaran_nama,
    semester_nama: dataDetail.value.semester_nama,
    kecamatan: dataDetail.value.kecamatan,
    kabupaten: dataDetail.value.kabupaten,
    provinsi: dataDetail.value.provinsi,
    paket_id: dataDetail.value.paket_id,
  };
  try {
    const response = await Api.post(`owner/sekolah`, dataStore);
    Toast.success("Success", "Data Berhasil ditambahkan!");
    // resetForm();
    router.push({ name: "AdminSekolah" });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const listProvinsi = ref([]);

const listKabupaten = ref([]);

const listKecamatan = ref([]);

// https://dev.farizdotid.com/api/daerahindonesia/provinsi
const getProvinsi = async () => {
  try {
    const response = await Api.get(
      `https://dev.farizdotid.com/api/daerahindonesia/provinsi`
    );
    response.provinsi.forEach((element) => {
      let tempDAta = {
        code: element.id,
        label: element.nama,
      };
      listProvinsi.value.push(tempDAta);
    });
    // console.log(response, listProvinsi.value);
    return response.provinsi;
  } catch (error) {
    console.error(error);
  }
};

const fnGetLabelProvinci = (id) => {
  let label = "";
  listProvinsi.value.forEach((element) => {
    if (element.code == id) {
      label = element.label;
    }
  });
  return label;
};
const fnGetLabelKabupaten = (id) => {
  let label = "";
  listKabupaten.value.forEach((element) => {
    if (element.code == id) {
      label = element.label;
    }
  });
  return label;
};
const fnGetLabelKecamatan = (id) => {
  let label = "";
  listKecamatan.value.forEach((element) => {
    if (element.code == id) {
      label = element.label;
    }
  });
  return label;
};

const getKabupaten = async (e) => {
  dataDetail.value.provinsi = fnGetLabelProvinci(e.target.value);
  //   console.log(fnGetLabelProvinci(e.target.value));
  //   console.log(e.target.value);
  let id = e.target.value;
  try {
    const response = await Api.get(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    // console.log(response.kota_kabupaten);
    listKabupaten.value = [
      {
        code: "0",
        label: "-",
      },
    ];

    response.kota_kabupaten.forEach((element) => {
      let tempDAta = {
        code: element.id,
        label: element.nama,
      };
      listKabupaten.value.push(tempDAta);
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
// https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}
const getKecamatan = async (e) => {
  dataDetail.value.kabupaten = fnGetLabelKabupaten(e.target.value);
  //   console.log(fnGetLabelKabupaten(e.target.value));
  //   console.log(e.target.value);
  let id = e.target.value;
  try {
    const response = await Api.get(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    );
    // console.log(response.kecamatan);

    listKecamatan.value = [
      {
        code: "0",
        label: "-",
      },
    ];

    response.kecamatan.forEach((element) => {
      let tempDAta = {
        code: element.id,
        label: element.nama,
      };
      listKecamatan.value.push(tempDAta);
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const setKecamatan = async (e) => {
  dataDetail.value.kecamatan = fnGetLabelKecamatan(e.target.value);
  //   console.log(dataDetail.value.kecamatan, fnGetLabelKecamatan(e.target.value));
  //   console.log(e.target.value, listKecamatan.value);
  //   let id = e.target.value;
};

getProvinsi();
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">
        {{ dataDetail.nama }}
        <!-- {{ superadmin }} -->
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Sekolah
          <BreadCrumbSpace /> Tambah
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
            <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nama</label>
                        <Field v-model="dataDetail.nama" :rules="validateData" type="text" name="nama" ref="nama"
                          class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Alamat</label>
                        <Field v-model="dataDetail.alamat" :rules="validateData" type="text" name="alamat" ref="alamat"
                          class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.alamat }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Status</label>
                        <select class="select select-bordered w-full max-w-xs" v-model="dataDetail.status">
                          <option disabled selected>Pilih Status ?</option>
                          <option>Aktif</option>
                          <option>Nonaktif</option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.status }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Paket</label>
                        <select class="select select-bordered w-full max-w-xs" v-model="dataDetail.paket_id">
                          <option disabled selected>Pilih Paket ?</option>
                          <option v-for="item in dataPaket" :value="item.id">
                            {{ item.nama }}
                          </option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.paket_id }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nama Kepala
                          Sekolah</label>
                        <Field v-model="dataDetail.kepsek_nama" :rules="validateData" type="text" name="kepsek_nama"
                          ref="kepsek_nama" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kepsek_nama }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tahun Ajaran</label>
                        <Field v-model="dataDetail.tahunajaran_nama" :rules="validateData" type="text"
                          name="tahunajaran_nama" ref="tahunajaran_nama"
                          class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tahunajaran_nama }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Semester</label>
                        <Field v-model="dataDetail.semester_nama" :rules="validateData" type="text" name="semester_nama"
                          ref="semester_nama" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.semester_nama }}
                        </div>
                      </div>

                      <div>
                        <label for="name" class="text-sm font-medium text-base-content block mb-2">Provinsi</label>

                        <select class="select select-bordered w-full" v-model="dataDetail.provinsi"
                          @change="getKabupaten($event)">
                          <option selected>
                            {{ dataDetail.provinsi }}
                          </option>
                          <option v-for="item in listProvinsi" :key="item.code" :value="item.code">
                            {{ item.label }}
                          </option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.provinsi }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-base-content block mb-2">Kabupaten</label>

                        <select class="select select-bordered w-full" v-model="dataDetail.kabupaten"
                          @change="getKecamatan($event)">
                          <!-- <option disabled selected>Pilih Kabupaten</option> -->
                          <option selected>
                            {{ dataDetail.kabupaten }}
                          </option>
                          <option v-for="item in listKabupaten" :key="item.code" :value="item.code">
                            {{ item.label }}
                          </option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kabupaten }}
                        </div>
                      </div>
                      <div>
                        <label for="name" class="text-sm font-medium text-base-content block mb-2">Kecamatan</label>

                        <select class="select select-bordered w-full" v-model="dataDetail.kecamatan"
                          @change="setKecamatan($event)">
                          <!-- <option disabled selected>Pilih Kecamatan</option> -->
                          <option selected>
                            {{ dataDetail.kecamatan }}
                          </option>
                          <option v-for="item in listKecamatan" :key="item.code" :value="item.code">
                            {{ item.label }}
                          </option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kecamatan }}
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

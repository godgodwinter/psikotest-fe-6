<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import ButtonMore from "@/components/atoms/ButtonMore.vue";
import ButtonKembali from "@/components/atoms/ButtonKembali.vue";
import { Field, Form } from "vee-validate";
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";

import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast.js";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("prestasi");

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const id2 = route.params.id2;
const id3 = route.params.id3;
const dataAsli = ref([]);
const dataDetail = ref([]);
const data = ref([]);

const getData = async () => {
  try {
    const response = await Api.get(
      `owner/datasekolah/${id}/catatanprestasisiswa/siswa`
    );
    dataAsli.value = response.data;

    data.value = dataAsli.value;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();

const dataSiswa = ref([]);
const getDataSiswa = async () => {
  try {
    const response = await Api.get(`owner/datasekolah/${id}/siswa/${id2}`);

    dataSiswa.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataSiswa();
const encode = (value) => window.btoa(value);

const doCetak = (id = null, token = moment().format("YYYY-MM-Do")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/catatanprestasisiswa/${encode(
        id
      )}?token=${encode(token)}`
    );
  }
};

const onSubmit = () => {
  const res = doStoreData();
};

const doStoreData = async (d) => {
  let dataStore = {
    tanggal: dataDetail.value.tanggal,
    prestasi: dataDetail.value.prestasi,
    teknikbelajar: dataDetail.value.teknikbelajar,
    saranabelajar: dataDetail.value.saranabelajar,
    penunjangbelajar: dataDetail.value.penunjangbelajar,
    kesimpulandansaran: dataDetail.value.kesimpulandansaran,
  };
  try {
    const response = await Api.put(
      `owner/datasekolah/${id}/siswa/${id2}/catatanprestasisiswa/${id3}`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil ditambahkan!");
    // resetForm();
    router.push({
      name: "AdminSekolahDetailPrestasiDetail",
      params: { id, id2 },
    });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const getDataId = async () => {
  try {
    const response = await Api.get(
      `owner/datasekolah/${id}/siswa/${id2}/catatanprestasisiswa/${id3}`
    );
    dataDetail.value = {
      tanggal: response.data.tanggal,
      prestasi: response.data.prestasi,
      teknikbelajar: response.data.teknikbelajar,
      saranabelajar: response.data.saranabelajar,
      penunjangbelajar: response.data.penunjangbelajar,
      kesimpulandansaran: response.data.kesimpulandansaran,
    };
    // console.log(data.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};

getDataId();
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        {{ dataSiswa.nama }}
      </span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <ButtonKembali />
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
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Tanggal</label
                        >
                        <Datepicker
                          v-model="dataDetail.tanggal"
                          format="yyyy/MM/dd"
                          value-format="yyyy-MM-dd"
                          :rules="validateData"
                          required
                        >
                          <template #calendar-header="{ index, day }">
                            <div
                              :class="
                                index === 5 || index === 6 ? 'red-color' : ''
                              "
                            >
                              {{ day }}
                            </div>
                          </template>
                        </Datepicker>
                        <!-- <Field
                          v-model="dataDetail.tanggal"
                          :rules="validateData"
                          type="text"
                          name="tanggal"
                          ref="tanggal"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        /> -->
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tanggal }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Prestasi</label
                        >
                        <Field
                          v-model="dataDetail.prestasi"
                          :rules="validateData"
                          type="text"
                          name="prestasi"
                          ref="prestasi"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.prestasi }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Teknik Belajar</label
                        >
                        <Field
                          v-model="dataDetail.teknikbelajar"
                          :rules="validateData"
                          type="text"
                          name="teknikbelajar"
                          ref="teknikbelajar"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.teknikbelajar }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Saran Belajar</label
                        >
                        <Field
                          v-model="dataDetail.saranabelajar"
                          :rules="validateData"
                          type="text"
                          name="saranabelajar"
                          ref="saranabelajar"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.saranabelajar }}
                        </div>
                      </div>

                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Penunjang Belajar</label
                        >
                        <Field
                          v-model="dataDetail.penunjangbelajar"
                          :rules="validateData"
                          type="text"
                          name="penunjangbelajar"
                          ref="penunjangbelajar"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.penunjangbelajar }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Kesimpulan dan Saran</label
                        >
                        <textarea
                          v-model="dataDetail.kesimpulandansaran"
                          class="textarea textarea-accent md:w-full max-w-2xl"
                          placeholder=""
                        ></textarea>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kesimpulandansaran }}
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

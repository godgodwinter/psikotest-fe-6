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
storeAdminBar.setsubMenuActive("kasus");

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
      `owner/datasekolah/${id}/catatankasussiswa/siswa`
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
      `${BASE_URL}api/guest/cetak/catatankasus/${encode(id)}?token=${encode(
        token
      )}`
    );
  }
};

const onSubmit = () => {
  const res = doStoreData();
};

const doStoreData = async (d) => {
  let dataStore = {
    kasus: dataDetail.value.kasus,
    tanggal: dataDetail.value.tanggal,
    pengambilandata: dataDetail.value.pengambilandata,
    sumberkasus: dataDetail.value.sumberkasus,
    golkasus: dataDetail.value.golkasus,
    penyebabtimbulkasus: dataDetail.value.penyebabtimbulkasus,
    teknikkonseling: dataDetail.value.teknikkonseling,
    keberhasilanpenanganankasus: dataDetail.value.keberhasilanpenanganankasus,
    keterangan: dataDetail.value.keterangan,
  };
  try {
    const response = await Api.post(
      `owner/datasekolah/${id}/siswa/${id2}/catatankasussiswa`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil ditambahkan!");
    // resetForm();
    router.push({
      name: "AdminSekolahDetailKasusDetail",
      params: { id, id2 },
    });

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
                          >Kasus</label
                        >
                        <Field
                          v-model="dataDetail.kasus"
                          :rules="validateData"
                          type="text"
                          name="kasus"
                          ref="kasus"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kasus }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Pengambilan data</label
                        >
                        <Field
                          v-model="dataDetail.pengambilandata"
                          :rules="validateData"
                          type="text"
                          name="pengambilandata"
                          ref="pengambilandata"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.pengambilandata }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Sumber kasus</label
                        >
                        <Field
                          v-model="dataDetail.sumberkasus"
                          :rules="validateData"
                          type="text"
                          name="sumberkasus"
                          ref="sumberkasus"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.sumberkasus }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Golongan kasus</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.golkasus"
                          name="golkasus"
                          ref="golkasus"
                        >
                          <option disabled selected>Pilih ?</option>
                          <option>Sedang</option>
                          <option>Ringan</option>
                        </select>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.golkasus }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Penyebab timbul kasus</label
                        >
                        <Field
                          v-model="dataDetail.penyebabtimbulkasus"
                          :rules="validateData"
                          type="text"
                          name="penyebabtimbulkasus"
                          ref="penyebabtimbulkasus"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.penyebabtimbulkasus }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Teknik Konseling</label
                        >
                        <Field
                          v-model="dataDetail.teknikkonseling"
                          :rules="validateData"
                          type="text"
                          name="teknikkonseling"
                          ref="teknikkonseling"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.teknikkonseling }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Keberhasilan Penanganan kasus</label
                        >
                        <Field
                          v-model="dataDetail.keberhasilanpenanganankasus"
                          :rules="validateData"
                          type="text"
                          name="keberhasilanpenanganankasus"
                          ref="keberhasilanpenanganankasus"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.keberhasilanpenanganankasus }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Keterangan</label
                        >

                        <textarea
                          v-model="dataDetail.keterangan"
                          class="textarea textarea-accent md:w-full max-w-2xl"
                          placeholder=""
                        ></textarea>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.keterangan }}
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

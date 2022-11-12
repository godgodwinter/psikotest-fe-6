<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/";

import CardLockedFitur from "@/components/organismes/CardLockedFitur.vue";
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";

const router = useRouter();
const route = useRoute();


const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const siswa_id = route.params.siswa_id;
const dataAsli = ref([]);
const dataSiswa = ref([]);
const data = ref([]);
const dataKelas = ref([]);

const doBackToKelas = () => {
    // console.log(inputCariKelas.value.id);
    router.push({
        name: "AdminSekolahDetail.hasil_ujian",
        params: {
            id: id,
            kelas_id: kelas_id.value,
        },
    });
};


const getDataSiswa = async () => {
    try {
        data.value = [];
        const response = await Api.get(
            `owner/datasekolah/${id}/siswa/${siswa_id}}`
        );
        dataSiswa.value = response.data;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataSiswa();
const getDataUjian = async () => {
    try {
        dataAsli.value = [];
        data.value = [];
        const response = await Api.get(
            `admin/menuujian/hasil_ujian/${siswa_id}`
        );
        dataAsli.value = response.data;
        data.value = dataAsli.value;
        console.log(data.value);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataUjian();

const sort = (items) => {
    return items.sort((a, b) => {
        return a.nilaiku < b.nilaiku ? 1 : -1;
    });
}
</script>
<template>

    <button class="btn btn-sm btn-info" @click="doBackToKelas()">Kembali</button>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
            <div class="bg-white shadow rounded-lg px-4 py-4">
                <div class="overflow-x-auto">
                    <table class="table table-compact">
                        <tbody>
                            <!-- row 1 -->
                            <tr>
                                <td class="whitespace-nowrap w-1/12">No Induk</td>
                                <td class="whitespace-nowrap w-1/12">:</td>
                                <td class="whitespace-nowrap w-10/12">
                                    {{ dataSiswa.nomeridentitas }}
                                </td>
                            </tr>
                            <!-- row 2 -->
                            <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>{{ dataSiswa.nama }}</td>
                            </tr>
                            <!-- row 3 -->
                            <tr>
                                <td>Umur</td>
                                <td>:</td>
                                <td>{{ dataSiswa.umur }}</td>
                            </tr>
                            <!-- row 3 -->
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>:</td>
                                <td>{{ dataSiswa.jk }}</td>
                            </tr>
                            <!-- row 3 -->
                            <tr>
                                <td>Sekolah</td>
                                <td>:</td>
                                <td>{{ dataSiswa.sekolah_nama }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4" v-for="item, index in data" :key="item.id">
        {{ index + 1 }}. {{ item.nama }}
        <div class="w-full lg:w-full">
            <div class="bg-white shadow rounded-lg px-4 py-4">
                <div class="overflow-x-auto">
                    <table class="table table-compact">
                        <tbody>
                            <!-- row 1 -->
                            <tr v-for="mapel, i in sort(item.detail) " :key="mapel.id">
                                <td class="whitespace-nowrap w-1/12">{{ i + 1 }}</td>
                                <td class="whitespace-nowrap w-1/12">
                                    {{ mapel.ujian_paketsoal_kategori?.kategori?.nama }}
                                    <!-- {{ mapel }} -->
                                </td>
                                <td class="whitespace-nowrap w-1/12">:</td>
                                <td class="whitespace-nowrap w-1/12">{{ mapel.nilaiku }}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- <ul>
        <li v-for="item in data" :key="item.id">
            {{ item.nama }}
        </li>
    </ul> -->
</template>
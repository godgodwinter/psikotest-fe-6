<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
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
import fnValidasi from "@/components/lib/babengValidasi";
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/";
const router = useRouter();
const route = useRoute();


const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const siswa_id = route.params.siswa_id;
const dataAsli = ref(null);
const dataMessage = ref(null);
const dataSiswa = ref([]);
const dataJurusan = ref([]);
const dataMinatbidangstudi = ref([]);
const dataKesimpulan = ref([]);
const dataTidakDisukai = ref([]);
const data = ref([]);
const dataKelas = ref([]);
const dataForm = ref([]);

const doBackToKelas = () => {
    // console.log(inputCariKelas.value.id);
    router.push({
        name: "admin.skolastik.submenu.proses",
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
            `owner/hasilpsikologi/detail/${siswa_id}}`
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
            `admin/ujian/skolastik/hasil/siswa/${siswa_id}/hasil`
        );
        // console.log(response.data);
        dataAsli.value = response.data;
        data.value = dataAsli.value;
        // console.log(data.value);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataUjian();

// const sort = (items) => {
//     return items.sort((a, b) => {
//         return a.nilaiAkhir < b.nilaiAkhir ? 1 : -1;
//     });
// }
const encode = (value) => window.btoa(value);

const doCetak = (id = null, token = moment().format("YYYY-MM-DD")) => {
    if (id === null) {
        Toast.danger("Warning", "Data tidak valid!");
    } else {
        window.open(
            `${BASE_URL}api/admin/ujian/skolastik/hasil/siswa/${siswa_id}/cetak`
        );
    }
};

const aspek_id = ref(null);
const aspek_nama = ref(null);

const onSubmitRevisiNilai = async () => {
    // console.log(aspek_id.value);

    let dataFormSend = {
        nilaiAkhir_revisi: dataForm.value.nilaiAkhir_revisi,
    }
    try {
        const response = await Api.post(`admin/ujian/skolastik/hasil_skolastik/${aspek_id.value}/revisi`, dataFormSend);
        Toast.babeng("Berhasil", 'Data berhasil update!');
        getDataUjian();
        return true;
    } catch (error) {
        console.error(error);
    }
}
const doResetWaktu = async (proses_id, skolastik_paketsoal_aspek_id,) => {
    if (confirm("Apakah anda yakin mereset waktu data ini?")) {

        let dataFormSend = {
            // nilaiAkhir_revisi: dataForm.value.nilaiAkhir_revisi,
        }
        try {
            const response = await Api.post(`admin/ujian/skolastik/reset/proses/${proses_id}/paketsoal_aspek/${skolastik_paketsoal_aspek_id}/waktu`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil update!');
            getDataUjian();
            return true;
        } catch (error) {
            console.error(error);
        }
    }
}
const doResetSalah = async (proses_id, skolastik_paketsoal_aspek_id,) => {
    if (confirm("Apakah anda yakin mereset jawban salah dan waktu data ini?")) {
        let dataFormSend = {
            // nilaiAkhir_revisi: dataForm.value.nilaiAkhir_revisi,
        }
        try {
            const response = await Api.post(`admin/ujian/skolastik/reset/proses/${proses_id}/paketsoal_aspek/${skolastik_paketsoal_aspek_id}/salah`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil update!');
            getDataUjian();
            return true;
        } catch (error) {
            console.error(error);
        }
    }
}
const doGenerateSiswaHasil = async (siswa) => {
    // console.log('====================================');
    // console.log(siswa);
    // console.log('====================================');
    if (confirm("Apakah anda yakin generate hasil ini?")) {
        let dataFormSend = {
            // paket_id: paketTerpilih.value.id,
            // tgl: tglBatasPengerjaan.value,
        }
        try {
            const response = await Api.post(`admin/ujian/skolastik/hasil/siswa/${siswa}/generate`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil digenerate!');
            getDataUjian();
            return true;
        } catch (error) {
            console.error(error);
        }
    }
};
</script>
<template>
    <div class="pt-4 px-10 md:flex justify-between">
        <div>
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Hasil Ujian Skolastik
                Siswa

            </span>
        </div>
        <div class="md:py-0 py-4 space-x-2 space-y-2">

            <button class="btn btn-sm btn-primary tooltip" data-tip="CETAK Hasil" @click="doCetak(siswa_id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
            </button>
            <button class="btn btn-sm btn-primary tooltip" data-tip="Generate Hasil"
                @click="doGenerateSiswaHasil(siswa_id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>

            </button>
            <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
                @click="doBackToKelas()">Kembali</button>

        </div>
    </div>
    <div v-if="dataSiswa">
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <tr>
                                    <td class="whitespace-nowrap w-1/12">No Induk</td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        {{ dataSiswa.nomeridentitas }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>{{ dataSiswa.nama }}</td>
                                </tr>
                                <!-- <tr>
                                    <td>Umur</td>
                                    <td>:</td>
                                    <td>{{ dataSiswa.umur }}</td>
                                </tr> -->
                                <tr>
                                    <td>Jenis Kelamin</td>
                                    <td>:</td>
                                    <td>{{ dataSiswa.jk }}</td>
                                </tr>
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
    </div>

    <div v-if="data">
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <tr v-for="item, index in data" :key="item.id" class="font-bold">
                                    <td class="whitespace-nowrap w-1/12">{{ item.aspek_nama }}</td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        {{ item.nilaiAkhir_revisi ? item.nilaiAkhir_revisi : item.nilaiAkhir }} {{
                                            item.nilaiAkhir_ket_revisi
                                        }} ({{
    item.nilaiAkhir_ket_singkatan_revisi
}})
                                    </td>
                                    <td class="whitespace-nowrap w-10/12">
                                        <div class="space-x-2"> <button class="btn btn-sm btn-primary tooltip"
                                                data-tip="Reset Waktu"
                                                @click="doResetWaktu(item.proses_id, item.skolastik_paketsoal_aspek_id)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                                </svg>
                                            </button>
                                            <button class="btn btn-sm btn-success tooltip"
                                                data-tip="Reset Jawaban Salah"
                                                @click="doResetSalah(item.proses_id, item.skolastik_paketsoal_aspek_id)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                                </svg>
                                            </button>
                                            <!-- The button to open modal -->
                                            <label for="my-modal-4" class="btn"
                                                @click="aspek_id = item.id, aspek_nama = item.aspek_nama, dataForm.nilaiAkhir_revisi = item.nilaiAkhir">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg></label>
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal -->

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
            <div>
                <Form v-slot="{ errors }" @submit="onSubmitRevisiNilai()">
                    <div class="py-2 lg:py-4 px-4">
                        <div class="space-y-4">
                            <div class="flex flex-col">
                                <label>Nilai Baru <span class="font-bold">{{ aspek_nama }}</span> :</label>
                                <div>
                                    <Field :rules="fnValidasi.validateDataNumber" v-model="dataForm.nilaiAkhir_revisi"
                                        name="nilaiAkhir_revisi" type="text" max="100" min="0"
                                        class="input input-bordered w-11/12" />
                                    <div class="text-xs text-red-600 mt-1">
                                        {{ errors.nilaiAkhir_revisi }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex justify-end py-10 px-10 gap-4">
                        <button class="btn btn-primary">Simpan</button>
                    </div>
                </Form>
            </div>
        </label>
    </label>

</template>

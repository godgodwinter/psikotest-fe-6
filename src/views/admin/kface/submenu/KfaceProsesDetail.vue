<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import CardLockedFitur from "@/components/organismes/CardLockedFitur.vue";
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import fnValidasi from "@/components/lib/babengValidasi";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import { useStoreGuruBk } from "@/stores/guruBk";
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/";
const router = useRouter();
const route = useRoute();

const storeGuruBk = useStoreGuruBk();
const superadmin = computed(() => storeGuruBk.getSuperadminMode);


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
        name: "admin.kface.submenu.proses",
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
            const response = await Api.post(`admin/ujian/kface/proses/siswa/${siswa_id}/reset/waktu`, dataFormSend);
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
            const response = await Api.post(`admin/ujian/kface/proses/siswa/${siswa_id}/reset/salah`, dataFormSend);
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
            const response = await Api.post(`admin/ujian/kface/generate_hasil/siswa/${siswa_id}`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil digenerate!');
            getDataUjian();
            return true;
        } catch (error) {
            console.error(error);
        }
    }
};

const ProsesData = ref([]);

const ProsesColumns = [
    {
        label: "Actions",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "Tanggal Ujian",
        field: "tgl_mulai",
        type: "String",
    },
    {
        label: "Status",
        field: "status",
        type: "String",
    },
    {
        label: "Hasil",
        field: "datahasil",
        type: "String",
    },
    // {
    //     label: "Status",
    //     field: "status",
    //     type: "String",
    // },
];


const ProsesGetData = async () => {
    try {
        const response = await Api.get(`admin/ujian/kface/hasil/dataproses/siswa/${siswa_id}`);
        ProsesData.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
ProsesGetData();


const HasilData = ref([]);

const HasilColumns = [
    {
        label: "Actions",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "Tanggal Ujian",
        field: "tgl_ujian",
        type: "String",
    },
    {
        label: "Data Proses",
        field: "dataproses",
        type: "String",
    },
    // {
    //     label: "Status",
    //     field: "status",
    //     type: "String",
    // },
];


const HasilGetData = async () => {
    try {
        const response = await Api.get(`admin/ujian/kface/hasil/datahasil/siswa/${siswa_id}`);
        HasilData.value = response.data;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
HasilGetData();


const doGenerateSiswaHasilPerProses = async (proses_id) => {
    // console.log('====================================');
    // console.log(siswa);
    // console.log('====================================');
    if (confirm("Apakah anda yakin generate hasil ini?")) {
        let dataFormSend = {
            // paket_id: paketTerpilih.value.id,
            // tgl: tglBatasPengerjaan.value,
        }
        try {
            const response = await Api.post(`admin/ujian/kface/generate_hasil/proses_id/${proses_id}`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil digenerate!');
            ProsesGetData();
            HasilGetData();
            return true;
        } catch (error) {
            console.error(error);
        }
    }
};
const doDeleteDataHasil = async (hasil_id) => {
    // console.log('====================================');
    // console.log(siswa);
    // console.log('====================================');
    if (confirm("Apakah anda yakin menghapus hasil ini?")) {
        let dataFormSend = {
            // paket_id: paketTerpilih.value.id,
            // tgl: tglBatasPengerjaan.value,
        }
        try {
            const response = await Api.delete(`admin/ujian/kface/generate_hasil/hasil_id/${hasil_id}`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil dihapus!');
            ProsesGetData();
            HasilGetData();
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

            <div class="px-4 py-2 space-x-2">
                <button class="btn btn-sm btn-primary tooltip" data-tip="CETAK Hasil" @click="doCetak(siswa_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                </button>
                <!-- <button class="btn btn-sm btn-primary tooltip" data-tip="Generate Hasil"
                    @click="doGenerateSiswaHasil(siswa_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>

                </button> -->
                <label for="my-modal-proses" class="btn btn-sm btn-warning">PROSES</label>

                <label for="my-modal-hasil" class="btn btn-sm btn-warning">HASIL</label>
            </div>
        </div>
        <div class="md:py-0 py-4 space-x-2 space-y-2">


            <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
                @click="doBackToKelas()">Kembali</button>

        </div>
    </div>
    <div class="py-2 px-4 text-center">
        <span class="text-xl sm:text-xl leading-none font-bold text-base-content shadow-sm">
            LAPORAN HASIL TES EKSPRESI KARAKTER FACE

        </span>
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
                                <tr>
                                    <td>Tanggal Ujian</td>
                                    <td>:</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="HasilData.length">
        <div class="py-2 px-4 ">
            <span class="text-xl sm:text-xl leading-none font-bold text-base-content shadow-sm">
                1. KARAKTER POSITIF
            </span>
        </div>

        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <tbody>
                                <tr>
                                    <th class="whitespace-nowrap w-1/100">NO</th>
                                    <th class="whitespace-nowrap w-5/12"> KARAKTER POSITIF</th>
                                    <th class="whitespace-nowrap w-1/100">%</th>
                                    <th class="whitespace-nowrap w-1/100">KETERANGAN</th>
                                    <th class="whitespace-nowrap w-5/12"></th>
                                </tr>
                                <!-- row 1 -->
                                <tr class="hover">
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>
                                        <progress class="progress progress-info w-full" value="23" max="100"></progress>
                                    </td>
                                </tr>
                                <!-- <tr class="hover" v-for="(
                    item, index
                  ) in siswa.deteksi.apiprobk_deteksi_list.slice(0, 79)" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.deteksi_nama }}</td>
                                <td>{{ item.deteksi_rank }}</td>
                                <td>{{ item.deteksi_score }}</td>
                                <td>{{ item.deteksi_keterangan }}</td>
                                <td>
                                    <progress class="progress progress-info w-full" :value="item.deteksi_score"
                                        max="100"></progress>
                                </td>
                            </tr> -->
                                <!-- row 2 -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div class="py-2 px-4 ">
            <span class="text-xl sm:text-xl leading-none font-bold text-base-content shadow-sm">
                2. KARAKTER NEGATIF
            </span>
        </div>


        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <tbody>
                                <tr>
                                    <th class="whitespace-nowrap w-1/100">NO</th>
                                    <th class="whitespace-nowrap w-5/12"> KARAKTER NEGATIF</th>
                                    <th class="whitespace-nowrap w-1/100">%</th>
                                    <th class="whitespace-nowrap w-1/100">KETERANGAN</th>
                                    <th class="whitespace-nowrap w-5/12"></th>
                                </tr>
                                <!-- row 1 -->
                                <tr class="hover">
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>
                                        <progress class="progress progress-info w-full" value="23" max="100"></progress>
                                    </td>
                                </tr>
                                <!-- <tr class="hover" v-for="(
                    item, index
                  ) in siswa.deteksi.apiprobk_deteksi_list.slice(0, 79)" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.deteksi_nama }}</td>
                                <td>{{ item.deteksi_rank }}</td>
                                <td>{{ item.deteksi_score }}</td>
                                <td>{{ item.deteksi_keterangan }}</td>
                                <td>
                                    <progress class="progress progress-info w-full" :value="item.deteksi_score"
                                        max="100"></progress>
                                </td>
                            </tr> -->
                                <!-- row 2 -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div class="py-4 px-4 ">
            <article class="prose lg:prose-md prose-stone max-w-none">
                <h2>
                    KESIMPULAN : KARAKTER POSITIF
                </h2>
                <p>Anda saat ini memiliki perkembangan karakter positif rata-rata tergolong :
                    86 Sangat Tinggi Sekali, (Aktivitas usaha Anda saat ini kecenderungan sangat besar sekali
                    dipengaruhi
                    perkembangan karakter positif, yaitu dari suasana hati dan pikiran serta situasi yang sangat
                    menguntungkan
                    sebagai penguat dan pendukung keberhasilan).
                </p>
                <p>
                    Bila nilai karakter positif Anda sangat tinggi akan membantu dalam mendukung kesuksesan dan
                    peningkatan
                    prestasi usaha aktivitas Anda, terutama Anda harus memperhatikan potensi kualitas diri yang
                    dikuatkan
                    oleh
                    aspek karakter positif yang menjadi tolak ukur Anda sukses. Nilai yang perlu Anda perhatikan antara
                    batas
                    Cukup sampai Sangat Tinggi Sekalai. Upayakan dalam setiap hari adanya perhatian dan peningkatan
                    kualitas
                    pribadi positif Anda melalui penerapan secara nyata melalui kegiatan sehari-hari dengan memanfaatkan
                    nilai-nilai karakter positif yang menonjol atau kuat pada hari ini dan di ekspresikan secara tepat
                    pada
                    setiap aktifitas yang dikerjakan sampai hari-hari berikutnya.
                </p>
            </article>
        </div>
        <div class="py-4 px-4 ">
            <article class="prose lg:prose-md prose-stone max-w-none">
                <h2>
                    KESIMPULAN : KARAKTER NEGATIF
                </h2>
                <p>Anda saat ini memiliki ganguan perkembangan karakter negatif rata-rata tergolong ; 55
                    Rendah,(Aktivitas
                    usaha Anda saat ini kecenderungan lancar dan tidak terganggu oleh perkembangan karakter negatif
                    dikarenakan mampu mengendalikan diri dari suasana hati dan pikiran serta keadaan situasi yang kurang
                    menguntungkan sehingga mampu mencapai keberhasilan).
                </p>
                <p>Bila nilai karakter negatif Anda sangat tinggi akan mengganggu atau merugikan saat Anda melakukan
                    usaha
                    beraktivitas dan menghambat kesuksesan dalam prestasi Anda, terutama yang harus Anda kendalikan dan
                    pelan-pelan dirubah yaitu kebiasaan karakter negatif. Nilai-nilai negatif yang perlu Anda perhatikan
                    untuk dikendalikan dan dirubah yaitu antara batas Cukup sampai Sangat tinggi sekali. Upayakan dalam
                    setiap hari lebih memperhatikan dan banyak instropeksi diri,banyak berfikir realita,logika,membangun
                    kesadaran, kuatkan dengan tindakan nyata melalui sikap merenung tentang nilai kehidupan, melakukan
                    sikap
                    meditasi dan selalu berdoa, memperkuat penyerahan diri dan memperbanyak nilai ke ikhlasan, nilai
                    syukur,
                    nilai pengampunan. Lakukan dalam setiap hari secara rutin,terarah dalam tujuan dan dilakukan
                    perubahan
                    dalam kesadaran yang tinggi.
                </p>
            </article>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-warning shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Info: Belum ada data ujian!</span>
            </div>
        </div>
    </div>

    <!-- modal -->
    <!-- MODAL PROSES -->
    <input type="checkbox" id="my-modal-proses" class="modal-toggle" />
    <label for="my-modal-proses" class="modal cursor-pointer">
        <label class="modal-box  w-11/12 max-w-5xl" for="">
            <div>
                <h3>DATA PROSES</h3>
                <div v-if="ProsesColumns">
                    <vue-good-table ref="myTable" :line-numbers="true" :columns="ProsesColumns" :rows="ProsesData"
                        :search-options="{
                            enabled: true,
                        }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">

                        <template #table-actions>
                        </template>
                        <template #table-row="props">
                            <span v-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                    <button class="btn btn-sm btn-primary tooltip" data-tip="Generate Hasil"
                                        @click="doGenerateSiswaHasilPerProses(props.row.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                        </svg>
                                    </button>
                                </div>
                            </span>


                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div>

            </div>
        </label>
    </label>
    <!-- MODAL PROSES -->

    <!-- MODAL PROSES -->
    <input type="checkbox" id="my-modal-hasil" class="modal-toggle" />
    <label for="my-modal-hasil" class="modal cursor-pointer">
        <label class="modal-box  w-11/12 max-w-5xl" for="">
            <div>
                <h3>DATA HASIL</h3>
                <div v-if="HasilColumns">
                    <vue-good-table ref="myTable" :line-numbers="true" :columns="HasilColumns" :rows="HasilData"
                        :search-options="{
                            enabled: true,
                        }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">

                        <template #table-actions>
                        </template>
                        <template #table-row="props">
                            <span v-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                    <button class="btn btn-sm btn-primary tooltip" data-tip="Generate Hasil"
                                        @click="doGenerateSiswaHasilPerProses(props.row.kface_proses_id)"
                                        v-if="props.row.dataproses">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                        </svg>
                                    </button>
                                    <ButtonDelete @click="doDeleteDataHasil(props.row.id, props.index)"
                                        v-if="superadmin" />


                                </div>
                            </span>


                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div>

            </div>
        </label>
    </label>
    <!-- MODAL PROSES -->

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

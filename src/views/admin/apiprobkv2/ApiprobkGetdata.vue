<script setup>
import RadialProgressBar from "vue3-radial-progress";
// @import "whatever/you/want/to/import";
// import "@/ext/xlsx.full.min.js";
import { reactive, onMounted, ref, watch, computed } from "vue";
import Api from "@/axios/axios";
import axios from "axios";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast";
import { useStoreGuruBk } from "@/stores/guruBk";


import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
// import { XLSX } from "xlsx-style"

moment.updateLocale("id", localization);
const dataForm = ref({
    tgl_mulai: moment().format('YYYY-MM-D'),
    tgl_selesai: moment().format('YYYY-MM-D'),
})

const format = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day} `;
}
const doApplyDate = () => {
    tgl_mulai.value = moment(dataForm.value.tgl_mulai).format('YYYY-MM-D');
    tgl_selesai.value = moment(dataForm.value.tgl_selesai).format('YYYY-MM-D');
    // console.log(dataForm.value.tgl_mulai);
    // console.log(tgl_mulai.value, tgl_selesai.value);
    // console.log('====================================');
    getData(tgl_mulai.value, tgl_selesai.value);
}
const dataAsli = ref([]);
const data = ref([]);
const tgl_mulai = ref(moment().format('YYYY-MM-D'));
const tgl_selesai = ref(moment().format('YYYY-MM-D'));

const storeGuruBk = useStoreGuruBk();
const columns = [
    {
        label: "Actions",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "TOKEN",
        field: "token_import",
        type: "String",
    },
    {
        label: "Tanggal Import",
        field: "tgl_import",
        type: "String",
    },
    {
        label: "Jumlah Siswa",
        field: "detail_jml",
        type: "String",
    },
];

const getData = async (tgl_mulai, tgl_selesai) => {
    // let dataForm = {
    //     tgl_mulai,
    //     tgl_selesai
    // }
    try {
        const response = await Api.get(`admin/secret/apiprobk/token?tgl_mulai=${tgl_mulai}&tgl_selesai=${tgl_selesai}`);
        dataAsli.value = response.data;
        data.value = response.data;
        // console.log(response);
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};

getData(tgl_mulai.value, tgl_selesai.value);
// getData('2023-01-25', tgl_selesai.value);

const detail_dataAsli = ref([]);
const detail_data = ref([]);

const detail_columns = [
    {
        label: "Actions",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "Siswa",
        field: "siswa_nama",
        type: "String",
    },
    {
        label: "Kelas",
        field: "kelas_nama",
        type: "String",
    },
    {
        label: "Sekolah",
        field: "sekolah_nama",
        type: "String",
    },
    {
        label: "TOKEN",
        field: "token_import",
        type: "String",
    },
    {
        label: "Tanggal Import",
        field: "tgl_import",
        type: "String",
    },
];


const getDataDetail = async (token_import) => {
    // let dataForm = {
    //     token_import
    // }
    // console.log(dataForm);
    try {
        const response = await Api.get(`admin/secret/apiprobk/token/detail?token_import=${token_import}`);
        detail_dataAsli.value = response.data;
        detail_data.value = response.data;
        // console.log(response);
        Toast.babeng("Info", "Data berhasil dimuat");
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};

const doDeleteSiswa = async (apiprobk_import_id, token_import) => {
    if (confirm("Apakah anda yakin menghapus PERMANENT data siswa ini? data tidak bisa dikembalikan")) {
        try {
            const response = await Api.delete(`admin/secret/apiprobk/token/apiprobk_import_id/${apiprobk_import_id}`);
            //   data.value.splice(index, 1);
            Toast.success("Success", "Siswa Berhasil dihapus!");
            getData(tgl_mulai.value, tgl_selesai.value);
            getDataDetail(token_import);
            // return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}


const doDeleteToken = async (token_import) => {
    if (confirm("Apakah anda yakin menghapus PERMANENT data import ini? data tidak bisa dikembalikan")) {
        try {
            const response = await Api.delete(`admin/secret/apiprobk/token/token_import?token_import=${token_import}`);
            //   data.value.splice(index, 1);
            Toast.success("Success", "Data Import Berhasil dihapus!");
            getData(tgl_mulai.value, tgl_selesai.value);
            getDataDetail(token_import);
            // return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
<template>
    <div class="pt-4 px-10 md:flex justify-between">
        <div>
            <!-- <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">APIPROBK
            </span> -->
        </div>
        <div class="md:py-0 py-4">
            <BreadCrumb>
                <template v-slot:content> APIPROBK
                    <BreadCrumbSpace /> Index
                </template>
            </BreadCrumb>
        </div>
    </div>
    <div class="p-4 space-x-2 ">
        <div class="flex space-x-2">
            <div class="flex flex-col">
                <label>Tanggal Mulai : </label>
                <div>
                    <Datepicker v-model="dataForm.tgl_mulai" :format="format"></Datepicker>
                </div>
            </div>
            <div class="flex flex-col">
                <label>Tanggal Selesai : </label>
                <div>
                    <Datepicker v-model="dataForm.tgl_selesai" :format="format"></Datepicker>
                </div>
            </div>
            <div class="p-4">
                <span class="btn btn-info" @click="doApplyDate()">Apply</span>
            </div>
        </div>
    </div>

    <div class="md:py-2 px-4 grid lg:grid-cols-2  overflow-auto w-full">
        <!-- TABEL TOKEN -->
        <div class="grid-cols-1 lg:grid-cols-1">
            <div class="bg-white shadow rounded-lg px-4 py-4">
                <div v-if="data">
                    <vue-good-table :columns="columns" :rows="data" :line-numbers="true" :search-options="{
                        enabled: true,
                    }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                        <template #table-actions>
                            <div class="space-x-1 space-y-1 gap-1">

                                <button class="btn btn-sm btn-primary tooltip" data-tip=" Refresh"
                                    @click="getData(tgl_mulai, tgl_selesai)">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                    </svg>
                                </button>

                            </div>
                        </template>
                        <template #table-row="props">
                            <span v-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-2">

                                    <button class="btn btn-sm btn-primary tooltip" data-tip="Detail"
                                        @click="getDataDetail(props.row.token_import)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-error tooltip" data-tip="HAPUS DATA TOKEN"
                                        @click="doDeleteToken(props.row.token_import)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                    </button>
                                </div>
                            </span>
                            <span v-else-if="props.column.field == 'tgl_import'">
                                <div class="text-center">
                                    {{
                                        props.row.tgl_import ? moment(props.row.tgl_import).format("DD MMMM YYYY") : null
                                    }}
                                </div>
                            </span>

                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
        <!-- TABEL TOKEN -->

        <!-- TABEL TOKEN -->
        <div class="grid-cols-1 lg:grid-cols-1">
            <div class="bg-white shadow rounded-lg px-4 py-4">
                <div v-if="detail_data">
                    <vue-good-table :columns="detail_columns" :rows="detail_data" :line-numbers="true" :search-options="{
                        enabled: true,
                    }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                        <template #table-actions>
                            <!-- <div class="space-x-1 space-y-1 gap-1">
                                <router-link :to="{
                                    name: 'admin.sekolah.kelas.tambah',
                                }">
                                    <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah Kelas"
                                        v-if="superadmin">

                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </router-link>

                            </div> -->
                        </template>
                        <template #table-row="props">
                            <span v-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-2">

                                    <button class="btn btn-sm btn-warning tooltip" data-tip="HAPUS DATA SISWA"
                                        @click="doDeleteSiswa(props.row.id, props.row.token_import)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                    </button>
                                </div>
                            </span>
                            <span v-else-if="props.column.field == 'tgl_import'">
                                <div class="text-center">
                                    {{
                                        props.row.tgl_import ? moment(props.row.tgl_import).format("DD MMMM YYYY") : null
                                    }}
                                </div>
                            </span>

                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
        <!-- TABEL TOKEN -->
    </div>
</template>

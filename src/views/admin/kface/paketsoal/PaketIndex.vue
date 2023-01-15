<script setup>
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { ref, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import Toast from "@/components/lib/Toast";

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const superadmin = computed(() => storeGuruBk.getSuperadminMode);

moment.updateLocale("id", localization);
const router = useRouter();
const route = useRoute();

const dataAsli = ref([]);
const data = ref([]);

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
        label: "Nama",
        field: "nama",
        type: "String",
    },
    {
        label: "Jumlah Aspek",
        field: "aspek_jml",
        type: "String",
    },
    {
        label: "Jumlah Soal",
        field: "soal_jml",
        type: "String",
    },
    {
        label: "Tanggal Pembuatan",
        field: "tgl",
        type: "String",
    },
    {
        label: "RANDOM SOAL",
        field: "random_soal",
        type: "String",
    },
    // {
    //     label: "Status",
    //     field: "status",
    //     type: "String",
    // },
];


const getData = async () => {
    try {
        const response = await Api.get(`admin/ujian/kface/paketsoal`);
        dataAsli.value = response.data;
        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();

const doEditData = async (id, index) => {
    router.push({
        name: "admin.kface.paketsoal.edit",
        params: { paketsoal_id: id },
    });
};
const doDeleteData = async (id, index) => {
    if (confirm("Apakah anda yakin menghapus data ini?")) {
        try {
            const response = await Api.delete(`admin/ujian/kface/paketsoal/${id}`);
            data.value.splice(index, 1);
            Toast.success("Success", "Data Berhasil dihapus!");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

const doRefreshData = async () => {
    getData();
}
</script>
<template>
    <div class="pt-4 px-10 md:flex justify-between">
        <div>
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Aspek
            </span>
        </div>
        <div class="md:py-0 py-4">
            <BreadCrumb>
                <template v-slot:content>
                    <li>
                        <router-link :to="{ name: 'admin.kface.paketsoal' }">Aspek</router-link>
                    </li>
                    <BreadCrumbSpace /> Index
                </template>
            </BreadCrumb>
        </div>
    </div>
    <div class="divider"></div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
            <div class="bg-white shadow rounded-lg px-4 py-4">
                <div v-if="data">
                    <vue-good-table ref="myTable" :line-numbers="true" :columns="columns" :rows="data" :search-options="{
                        enabled: true,
                    }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">

                        <template #table-actions>
                            <div class="space-x-1 space-y-1 gap-1">
                                <button class="btn btn-sm btn-secondary tooltip m-1" data-tip="Refresh Data"
                                    @click="doRefreshData()">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <router-link :to="{
                                    name: 'admin.kface.paketsoal.create',
                                    // params: { jenis: jenis },
                                }">
                                    <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah Aspek">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </router-link>
                            </div>
                        </template>
                        <template #table-row="props">
                            <span v-if="props.column.field == 'tgl'">
                                {{ moment(props.row.tgl).format("DD MMMM YYYY h:mm:ss") }}
                            </span>
                            <span v-else-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                    <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                                    <ButtonDelete @click="doDeleteData(props.row.id, props.index)" v-if="superadmin" />

                                </div>
                            </span>
                            <span v-else-if="props.column.field == 'aspek_jml'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-2"> {{
                                    props.row.aspek_jml
                                }} ASPEK
                                    <router-link :to="{
                                        name: 'admin.kface.paketsoal.aspek',
                                        params: { paketsoal_id: props.row.id },
                                    }">
                                        <button class="btn btn-sm btn-primary tooltip" data-tip="Detail ASPEK">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button></router-link>

                                </div>
                            </span>
                            <span v-else-if="props.column.field == 'soal_jml'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-2"> {{
                                    props.row.soal_jml
                                }} SOAL
                                    <router-link :to="{
                                        name: 'admin.kface.paketsoal.soal',
                                        params: { paketsoal_id: props.row.id },
                                    }">
                                        <button class="btn btn-sm btn-primary tooltip" data-tip="Detail Soal">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button></router-link>

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
    </div>
</template>
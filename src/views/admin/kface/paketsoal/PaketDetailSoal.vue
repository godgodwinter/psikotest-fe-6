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

const paketsoal_id = route.params.paketsoal_id;
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
        label: "Kode",
        field: "kode",
        type: "String",
    },
    {
        label: "pertanyaan",
        field: "pertanyaan",
        type: "String",
    },
    {
        label: "Asset",
        field: "file",
        type: "String",
    },
    {
        label: "tipe",
        field: "tipe",
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
        const response = await Api.get(`admin/ujian/kface/paketsoal/${paketsoal_id}/soal`);
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
            const response = await Api.delete(`admin/ujian/kface/paketsoal/null/soal/delete/${id}`);
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
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">SOAL
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
                                    name: 'admin.kface.paketsoal.soal.add',
                                    params: { paketsoal_id },
                                }">
                                    <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah SOAL">
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
                                    <!-- <ButtonEdit @click="doEditData(props.row.id, props.index)" /> -->
                                    <ButtonDelete @click="doDeleteData(props.row.id, props.index)" v-if="superadmin" />
                                </div>
                            </span>
                            <span v-else-if="props.column.field == 'file'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                    <a :href="props.row.file" v-if="props.row.file" target="_blank"><button
                                            class="btn btn-sm btn-info"><svg xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                            </svg>
                                        </button></a>
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
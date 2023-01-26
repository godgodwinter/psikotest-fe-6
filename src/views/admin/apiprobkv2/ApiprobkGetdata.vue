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
        label: "Username",
        field: "username",
        type: "String",
    },
    {
        label: "Tanggal Import",
        field: "tgl_import",
        type: "String",
    },
    {
        label: "Status Simpan",
        field: "status",
        type: "String",
    },
    {
        label: "Status Backup",
        field: "status_backup",
        type: "String",
    },
    {
        label: "Status Sinkron",
        field: "status_sinkron",
        type: "String",
    },
];

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
    aa
</template>

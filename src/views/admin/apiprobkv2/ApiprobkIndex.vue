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
// import { XLSX } from "xlsx-style"

const file = ref(null);
const fileExcel = ref(null);
const fileExcelLink = ref(null);
const dataExcel = ref([]);
const onChangefileUpload = (e) => {
    file.value = e.target.files[0];
    fileExcel.value = file.value;
    fileExcelLink.value = URL.createObjectURL(file.value);
    // console.log(file.value, fileExcelLink.value);
    importExcelFile();
};


// XMLHttpRequest in promise format
function makeRequest(method, url, success, error) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url, true);
    httpRequest.responseType = 'arraybuffer';

    httpRequest.open(method, url);
    httpRequest.onload = function () {
        success(httpRequest.response);
    };
    httpRequest.onerror = function () {
        error(httpRequest.response);
    };
    httpRequest.send();
}

// read the raw data and convert it to a XLSX workbook
function convertDataToWorkbook(dataRows) {
    /* convert data to binary string */
    var data = new Uint8Array(dataRows);
    var arr = [];

    for (var i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
    }

    var bstr = arr.join('');

    return XLSX.read(bstr, { type: 'binary' });
}

// pull out the values we're after, converting it into an array of rowData

function populateGrid(workbook) {
    // our data is in the first sheet
    var firstSheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[firstSheetName];

    // we expect the following columns to be present
    var columns = {
        A: 'username',
    };

    var rowData = [];

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (worksheet['A' + rowIndex]) {
        var row = {};
        Object.keys(columns).forEach(function (column) {
            row[columns[column]] = worksheet[column + rowIndex].w;
        });

        rowData.push(row);

        rowIndex++;
    }

    // finally, set the imported rowData into the grid
    // gridOptions.api.setRowData(rowData);
    // console.log('====================================');
    // console.log(rowData);
    // console.log('====================================');
    dataExcel.value = rowData;
    totalSteps.value = dataExcel.value.length;
}

const importExcelFile = () => {
    // console.log('====================================');
    // console.log(fileExcelLink.value);
    // console.log('====================================');
    makeRequest(
        'GET',
        fileExcelLink.value,
        // success
        function (data) {
            // console.log('====================================');
            // console.log(data);
            // console.log('====================================');
            var workbook = convertDataToWorkbook(data);

            populateGrid(workbook);
        },
        // error
        function (error) {
            throw error;
        }
    );
}

const completedSteps = ref(0);
const totalSteps = ref(0);
const prosesBerhasil = ref(0);
const prosesGagal = ref(0);

const dataBelumDiGenerate = ref(0);
const dataSudahDiGenerate = ref(0);
const dataAll = ref(0);

const fnReset = (tipe = "baru") => {
    completedSteps.value = 0;
    prosesBerhasil.value = 0;
    prosesGagal.value = 0;
    totalSteps.value = data.value.length;
    //   if (tipe == "baru") {
    //     totalSteps.value = data.value.length;
    //   } else {
    //     totalSteps.value = data.value.length;
    //   }
};
const fnAlertFinish = () => {
    if (totalSteps.value == completedSteps.value) {
        Toast.babeng("Info", `Proses Selesai!`);
    }
};
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
        label: "Status",
        field: "status",
        type: "String",
    },
];

const doDelete = (index, username) => {
    console.log(index, username);
    // let a = dataExcel.value,
    //     b = a.filter(e => e.name === "tc_001");
    // b.forEach(f => a.splice(a.findIndex(e => e.name === f.name), 1));
    // console.log(a);
    let result = dataExcel.value.filter(e => e.username != username);
    dataExcel.value = result;
    console.log(result);
}

const doImport = async () => {
    console.log(dataExcel.value);
    if (dataExcel.value.length < 1) {
        Toast.babeng("Warning", "Data tidak boleh kosong!");
    } else {
        if (confirm("Apakah anda yakin mengimport data ini?")) {
            try {
                Toast.success("Success", "Data Berhasil dihapus!");
            } catch (error) {
                console.error(error);
            }
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

    <div class="space-x-2">
        <input name="fileUpload" @change="onChangefileUpload($event)" type="file"
            class="file-input file-input-bordered file-input-info w-full max-w-xs" />
        <button @click="doImport()" class="btn btn-sm btn-primary">
            Import Excel
        </button>
    </div>
    <div class="w-full flex flex-wrap justify-center">
        <div class="w-1/2 flex justify-center gap-10">
            <div>
                <radial-progress-bar :diameter="200" :completed-steps="completedSteps" :total-steps="totalSteps"
                    :start-color="'#0500ff'" :stop-color="'#00b7ff'">
                    <h2 class="font-bold text-2xl">
                        {{ completedSteps }} / {{ totalSteps }}
                    </h2>
                    <!-- Your inner content here -->
                </radial-progress-bar>
            </div>
            <div>
                <div class="py-4 font-bold">
                    <h1>Proses Stats :</h1>
                    <h4># Total Steps : {{ totalSteps }}</h4>
                    <h4># Completed Steps :{{ completedSteps }}</h4>
                    <h4># Proses Berhasil : {{ prosesBerhasil }}</h4>
                    <h4># Proses Gagal :{{ prosesGagal }}</h4>
                </div>
            </div>
        </div>
    </div>
    <div class="md:py-2 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
            <div class="bg-white shadow rounded-lg px-4 py-4">
                <div v-if="dataExcel">
                    <vue-good-table :line-numbers="true" :columns="columns" :rows="dataExcel" :search-options="{
                        enabled: true,
                    }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                        <template #table-row="props">
                            <span v-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                    <button class="btn btn-sm btn-warning" @click="
                                        doDelete(props.index, props.row.username)
                                    ">
                                        Delete
                                    </button>
                                </div>
                            </span>

                            <span v-else-if="props.column.field == 'no'">
                                <div class="text-center">{{ props.index + 1 }}</div>
                            </span>
                            <!-- <span v-else-if="props.column.field == 'status'">
                                <div class="text-center" v-if="props.row.username != '' && props.row.username != null">
                                    Sudah
                                </div>
                                <div class="text-center" v-else>Belum</div>
                            </span> -->

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

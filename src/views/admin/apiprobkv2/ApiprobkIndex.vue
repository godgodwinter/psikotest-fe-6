<script setup>
// @import "whatever/you/want/to/import";
// import "@/ext/xlsx.full.min.js";
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
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


const gridApi = ref(null); // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
    gridApi.value = params.api;
};

const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

// Each Column Definition results in one Column.
const columnDefs = reactive({
    value: [
        { field: "make" },
        { field: "model" },
        { field: "price" }
    ],
});

// DefaultColDef sets props common to all Columns
const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
};

// Example load data from sever
onMounted(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
        .then((result) => result.json())
        .then((remoteRowData) => (rowData.value = remoteRowData));
});


const cellWasClicked = (event) => { // Example of consuming Grid Event
    console.log("cell was clicked", event);
}
const deselectRows = () => {
    gridApi.value.deselectAll()
}
const file = ref(null);
const fileExcel = ref(null);
const fileExcelLink = ref(null);
const onChangefileUpload = (e) => {
    file.value = e.target.files[0];
    fileExcel.value = file.value;
    fileExcelLink.value = URL.createObjectURL(file.value);
    console.log(file.value, fileExcelLink.value);
};

const gridOptions = {
    columnDefs: [
        { field: 'athlete', minWidth: 180 },
        { field: 'age' },
        { field: 'country', minWidth: 150 },
        { field: 'year' },
        { field: 'date', minWidth: 130 },
        { field: 'sport', minWidth: 100 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ],

    defaultColDef: {
        resizable: true,
        minWidth: 80,
        flex: 1,
    },

    rowData: [],
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
    console.log('====================================');
    console.log(rowData);
    console.log('====================================');
}

function importExcel() {
    makeRequest(
        'GET',
        'https://www.ag-grid.com/example-assets/olympic-data.xlsx',
        // success
        function (data) {
            console.log('====================================');
            console.log(data);
            console.log('====================================');
            var workbook = convertDataToWorkbook(data);

            populateGrid(workbook);
        },
        // error
        function (error) {
            throw error;
        }
    );
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
            console.log('====================================');
            console.log(data);
            console.log('====================================');
            var workbook = convertDataToWorkbook(data);

            populateGrid(workbook);
        },
        // error
        function (error) {
            throw error;
        }
    );
    // console.log('====================================');
    // console.log(fileExcelLink.value);
    // console.log('====================================');
    // if (fileExcelLink.value) {
    //     var workbook = convertDataToWorkbook(fileExcelLink.value);

    //     populateGrid(workbook);
    //     console.log('====================================');
    //     console.log('tes');
    //     console.log('====================================');

    // }
    // makeRequest(
    //     'GET',
    //     'https://www.ag-grid.com/example-assets/olympic-data.xlsx',
    //     // success
    //     function (data) {
    //         var workbook = convertDataToWorkbook(data);

    //         populateGrid(workbook);
    //         console.log('====================================');
    //         console.log('tes');
    //         console.log('====================================');
    //     },
    //     // error
    //     function (error) {
    //         throw error;
    //     }
    // );
    // console.log('====================================');
    // console.log('tes');
    // console.log('====================================');
}

</script>
<template>
    <div class="pt-4 px-10 md:flex justify-between">
        <div>
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">APIPROBK
            </span>
        </div>
        <div class="md:py-0 py-4">
            <BreadCrumb>
                <template v-slot:content> APIPROBK
                    <BreadCrumbSpace /> Index
                </template>
            </BreadCrumb>
        </div>
    </div>

    <div>
        <input name="fileUpload" @change="onChangefileUpload($event)" type="file"
            class="file-input file-input-bordered file-input-info w-full max-w-xs" />
        <button @click="importExcelFile()" style="margin-bottom: 5px">
            Import Excel
        </button>
    </div>
    <div>
        <button @click="deselectRows">deselect rows</button>
        <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :columnDefs="columnDefs.value"
            :rowData="rowData.value" :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true"
            @cell-clicked="cellWasClicked" @grid-ready="onGridReady">
        </ag-grid-vue>
    </div>

</template>

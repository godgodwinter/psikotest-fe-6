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
import { v4 as uuidv4 } from "uuid";


import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
// import { XLSX } from "xlsx-style"

moment.updateLocale("id", localization);
const linkDeteksi = ref(null);
const linkSertifikat = ref(null);
const fnGetLinkFromBe = async () => {
    try {
        const response = await Api.get(`admin/apiprobk/serveraktif`);
        // console.log(response.data);
        linkDeteksi.value = response.data.deteksi ? response.data.deteksi.link : null;
        linkSertifikat.value = response.data.sertifikat ? response.data.sertifikat.link : null;
        return response;
    } catch (error) {
        console.error(error);
    }
};

fnGetLinkFromBe();


const storeGuruBk = useStoreGuruBk();
const sekolah = computed(() => storeGuruBk.getSekolah);
const dataDetail = ref({
    nama: "",
    nomeridentitas: "",
    alamat: "",
    jk: "",
    kelas_id: "",
    sekolah_id: "",
});


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
    dataExcel.value = [];
    totalSteps.value = dataExcel.value.length;
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
        label: "DATA SERTIFIKAT",
        field: "data_sertifikat",
        type: "String",
    },
    {
        label: "DATA DETEKSI",
        field: "data_deteksi",
        type: "String",
    },
];

const doDelete = (index, username) => {
    if (dataExcel.value[index].status == 'Baru') {
        prosesBerhasil.value--;
        completedSteps.value--;
    } else if (dataExcel.value[index].status == 'Sudah Ada') {
        prosesGagal.value--;
        completedSteps.value--;
    }

    // console.log(index, username);
    // let a = dataExcel.value,
    //     b = a.filter(e => e.name === "tc_001");
    // b.forEach(f => a.splice(a.findIndex(e => e.name === f.name), 1));
    // console.log(a);
    let result = dataExcel.value.filter(e => e.username != username);
    dataExcel.value = result;
    totalSteps.value = dataExcel.value.length;
    // console.log(result);
}
const kelas_id = ref(null);
const sekolah_id = ref(null);

//FETCHING DATA FROM WEB API LAMA
const getDataFromApiUjianSertifikat = async (
    username,
    index = 0,
    apiprobk_id = 0,
) => {
    try {
        if (linkSertifikat.value) {
            const response = await axios.post(
                `${linkSertifikat.value}`,
                {
                    username: username,
                },
                {
                    headers: {},
                }
            );
            // console.log(response.data);
            dataExcel.value[index].data_sertifikat = response.data;
        } else {
            Toast.babeng("Warning", "Link Sertifikat tidak ditemukan!");
        }
    } catch (error) {
        console.error(error);
    }
};

const getDataFromApiUjianDeteksi = async (
    username,
    index = 0,
    apiprobk_id = 0,
) => {
    try {
        if (linkDeteksi) {
            const response = await axios.post(
                `${linkDeteksi.value}`,
                {
                    username: username,
                },
                {
                    headers: {},
                }
            );
            // console.log(response);
            dataExcel.value[index].data_deteksi = response.data;
        }
        else {
            Toast.babeng("Warning", "Link Deteksi tidak ditemukan!")
        }
    } catch (error) {
        // doProsesGetApiGagal(apiprobk_id, index);
        // data.value[index].sertifikat = "gagal";
        // Toast.danger("Warning", "Proses gagal");
        console.error(error);
    }
};
//FETCHING DATA FROM WEB API LAMA-END

//SAVE DATA SERTIFIKAT DAN DETEKSI KE SERVER KITA
const doStoreDataBackupSertifikat = async (d, index) => {
    try {
        const response = await Api.post("admin/apiprobk/api_backup", d);
        // console.log(response.data);
        // Toast.success("Success", "Data Berhasil ditambahkan!");
        data.value[index].deteksi = "sudah";
        diProses.value++;
        return response.data;
    } catch (error) {
        diProses.value++;
        data.value[index].deteksi = "gagal";
        // Toast.danger("Warning", "Data gagal ditambahkan!");
        console.error(error);
    }
};
//SAVE DATA SERTIFIKAT DAN DETEKSI KE SERVER KITA-END

const doPeriksaDariApiWebUjianLama = async () => {
    // console.log(dataExcel.value);
    if (dataExcel.value.length < 1) {
        Toast.babeng("Warning", "Data tidak boleh kosong!");
    } else {
        if (sekolah_id.value) {
            fn_getData_from_API();
            // fn_Import_store_ke_db();
        } else {
            Toast.babeng("Sekolah Tidak boleh kosong!")
        }
    }
}
const doStoreKeWebBaru = async () => {
    token_import.value = uuidv4();
    // console.log(token_import.value);

    // console.log(dataExcel.value);
    if (dataExcel.value.length < 1) {
        Toast.babeng("Warning", "Data tidak boleh kosong!");
    } else {
        if (sekolah_id.value) {
            // fn_getData_from_API();
            fn_Import_store_ke_db();
        } else {
            Toast.babeng("Sekolah Tidak boleh kosong!")
        }
    }
}
const fn_getData_from_API = async () => {
    for (let index = 0; index < dataExcel.value.length; index++) {
        const element = dataExcel.value[index];
        console.log(element);
        getDataFromApiUjianSertifikat(element.username, index);
        getDataFromApiUjianDeteksi(element.username, index);
        // fnApiprobkStore(index, element.username)

    }
}

const fn_Import_store_ke_db = async () => {
    if (confirm("Apakah anda yakin mengimport data ini?")) {
        try {
            completedSteps.value = 0;
            // Toast.success("Success", "Data Berhasil dihapus!");
            for (let index = 0; index < dataExcel.value.length; index++) {
                const element = dataExcel.value[index];
                console.log(element);
                if (element.data_sertifikat && element.data_deteksi) {
                    fnApiprobkStore(index, element.username, element.data_sertifikat, element.data_deteksi)
                } else {
                    dataExcel.value[index].status = 'Tidak disimpan';
                    prosesGagal.value++;
                    completedSteps.value++;
                    dataExcel.value[index].tgl_import = "-";
                }

            }
        } catch (error) {
            console.error(error);
        }
    }
}
const token_import = ref(uuidv4());
// console.log(token_import.value);
const fnApiprobkStore = async (index, username, data_sertifikat, data_deteksi) => {

    let dataStore = {
        username,
        kelas_id: kelas_id.value,
        sekolah_id: sekolah_id.value,
        data_sertifikat,
        data_deteksi,
        token_import: token_import.value
    };
    console.log(dataStore);
    try {
        const response = await Api.post(
            `admin/secret/apiprobk`,
            dataStore
        );
        if (response.success) {
            dataExcel.value[index].status = 'Baru';
            prosesBerhasil.value++
            completedSteps.value++;
            dataExcel.value[index].tgl_import = response.data.tgl_import;
            // dataExcel.value[index].status_backup = response.data.status_backup;
            // dataExcel.value[index].tgl_import = response.data.tgl_import;
        } else {
            dataExcel.value[index].status = 'Sudah Ada';
            prosesGagal.value++;
            completedSteps.value++;
            dataExcel.value[index].tgl_import = response.data.tgl_import;
            // dataExcel.value[index].status_backup = response.data.status_backup;
            // dataExcel.value[index].tgl_import = response.data.tgl_import;
        }

    } catch (error) {
        // Toast.danger("Warning", "Data gagal ditambahkan!");
        console.error(error);
    }
}

const id = null;
const idTemp = ref(id);

const dataKelas = ref([]);
const dataSekolah = ref([]);
const pilihKelas = ref([]);
const pilihSekolah = ref([]);

// get Sekolah
const getDataSekolah = async () => {
    try {
        const response = await Api.get(`owner/sekolah`);
        // console.log(response);
        dataSekolah.value = response.data;
        dataSekolah.value.forEach((item) => {
            pilihSekolah.value.push({
                label: item.nama,
                id: item.id,
            });
        });
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};
getDataSekolah();
// get Kelas
const getDataKelas = async (sekolah_id) => {
    try {
        pilihKelas.value = [];
        const response = await Api.get(`owner/datasekolah/${sekolah_id}/kelas`);
        // console.log(response);
        dataKelas.value = response.data;
        dataKelas.value.forEach((item) => {
            pilihKelas.value.push({
                label: item.nama,
                id: item.id,
            });
        });
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};
// getDataKelas(idTemp.value);

const changedValue = (value) => {
    dataDetail.value.kelas_id = null;
    if (dataDetail.value.sekolah_id) {
        getDataKelas(dataDetail.value.sekolah_id);
    } else {
        pilihKelas.value = [];
    }
};

const doApply = (sekolah, kelas) => {
    console.log(sekolah, kelas);
    Toast.babeng("Info", `sekolah ${sekolah} , kelas ${kelas}`)
    sekolah_id.value = sekolah;
    kelas_id.value = kelas
}

const fnPeriksaDataSertifikat = (index) => {
    console.log(dataExcel.value[index].data_sertifikat);
}
const fnPeriksaDataDeteksi = (index) => {
    console.log(dataExcel.value[index].data_deteksi);
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

    <div>
        <div class="pt-0 px-0">
            <div class="w-full mx-0">
                <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                        <div>
                            <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Pilih Sekolah
                            </label>
                            <select class="select select-info w-full max-w-xs" v-model="dataDetail.sekolah_id"
                                @change="changedValue" @selected="changedLabel">
                                <option selected :value="null">
                                    NULL
                                </option>
                                <!-- <option disabled selected> -->
                                <!-- {{ data.sekolah.nama }}? -->
                                <!-- </option> -->
                                <option v-for="(item, index) in pilihSekolah" :value="item.id">
                                    {{ item.label }}
                                </option>
                            </select>
                            <!-- <v-select
                              @change="changedValue"
                              @selected="changedLabel"
                              class="py-2 px-3 w-72 mx-auto md:mx-0"
                              :options="pilihSekolah"
                              v-model="dataDetail.sekolah_id"
                              v-bind:class="{ disabled: false }"
                            ></v-select> -->

                        </div>

                        <div>
                            <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Pilih Kelas
                            </label>
                            <!-- <v-select
                              class="py-2 px-3 w-72 mx-auto md:mx-0"
                              :options="pilihKelas"
                              v-model="dataDetail.kelas_id"
                              v-bind:class="{ disabled: false }"
                            ></v-select> -->
                            <select class="select select-info w-full max-w-xs" v-model="dataDetail.kelas_id">
                                <option selected :value="null">
                                    NULL
                                </option>
                                <!-- <option disabled selected> -->
                                <!-- {{ data.kelas.nama }} -->
                                <!-- </option> -->
                                <option v-for="(item, index) in pilihKelas" :value="item.id">
                                    {{ item.label }}
                                </option>
                            </select>

                        </div>
                    </div>

                    <div class="w-full flex justify-end mt-4 px-20">
                        <button class="btn btn-active btn-lg btn-primary"
                            @click="doApply(dataDetail.sekolah_id, dataDetail.kelas_id)">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="space-x-2">
        <input name="fileUpload" @change="onChangefileUpload($event)" type="file"
            class="file-input file-input-bordered file-input-info w-full max-w-xs" />
        <button @click="doPeriksaDariApiWebUjianLama()" class="btn btn-sm btn-primary">
            PERIKSA DATA DARI APIPROBK (WEB UJIAN LAMA)
        </button>
        <button @click="doStoreKeWebBaru()" class="btn btn-sm btn-success">
            SIMPAN KE WEB Baru
        </button>
        <button @click="fnReset()" class="btn btn-sm btn-secondary">
            Reset
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
    perPageDropdown: [100, 200, 500],
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

                            <span v-else-if="props.column.field == 'tgl_import'">
                                <div class="text-center">
                                    {{
                                        props.row.tgl_import ? moment(props.row.tgl_import).format("DD MMMM YYYY") : null
                                    }}
                                </div>
                            </span>
                            <span v-else-if="props.column.field == 'data_sertifikat'">
                                <div class="text-center">
                                    {{
                                        props.row.data_sertifikat ? 'Ada' : "-"
                                    }}
                                    <button class="btn btn-sm btn-info" @click="fnPeriksaDataSertifikat(props.index)"
                                        v-if="props.row.data_sertifikat">Periksa</button>
                                </div>
                            </span>
                            <span v-else-if="props.column.field == 'data_deteksi'">
                                <div class="text-center">
                                    {{
                                        props.row.data_deteksi ? "Ada" : "-"
                                    }}
                                    <button class="btn btn-sm btn-info" @click="fnPeriksaDataDeteksi(props.index)"
                                        v-if="props.row.data_deteksi">Periksa</button>
                                </div>
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

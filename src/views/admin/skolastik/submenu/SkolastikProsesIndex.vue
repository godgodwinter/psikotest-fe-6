<script setup>
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast.js";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import { useStoreGuruBk } from "@/stores/guruBk";
import { useSkolastikStore } from "@/stores/skolastikStore";
const skolastikStore = useSkolastikStore();
// timerStore.$subscribe((mutation, state) => {
//     // console.log(mutation, state);
//     // console.log(mutation);
//     console.log(state.waktu);
// }, { detached: false }) //jika detached true :terpisah meskipun komponent di unmount subcrib tetap dijalankan [bug jika halaman di buka 2x akan dieksekusi 2x]
// // timerStore.decrement();
const paketTerpilih = computed(() => skolastikStore.getPaketTerpilih);
const tglBatasPengerjaan = computed(() => skolastikStore.getTglBatasPengerjaan);
// console.log(paketTerpilih.value);
const storeGuruBk = useStoreGuruBk();
const superadmin = computed(() => storeGuruBk.getSuperadminMode);
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("skolastik-proses");

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const dataAsli = ref([]);
const data = ref([]);
const dataKelas = ref([]);


// get Kelas
const getDataKelas = async () => {
    try {
        const response = await Api.get(`owner/datasekolah/${id}/kelas`);
        // console.log(response);
        dataKelas.value = response.data;
        if (dataKelas.value.length > 0) {
            // console.log(dataKelas.value[0].id);
            if (kelas_id.value == 0) {
                kelas_id.value = dataKelas.value[0].id;
            }
            dataKelas.value.forEach((item) => {
                pilihKelas.value.push({
                    label: item.nama,
                    id: item.id,
                });
            });
            // console.log(kelas_id.value);
            getData(kelas_id.value);
        }
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};
getDataKelas();
// console.log(kelas_id.value);
const inputCariKelas = ref();

let pilihKelas = ref([
    // {
    //   label: "Belum masuk Kelas",
    //   id: "Belum masuk Kelas",
    // },
]);

const doPilihKelas = () => {
    // console.log(inputCariKelas.value.id);
    router.push({
        name: "admin.skolastik.submenu.proses",
        params: {
            id: id,
            kelas_id: inputCariKelas.value.id,
        },
    });
    fnSetToTempSekolah(id, inputCariKelas.value.id, inputCariKelas.value.label);
    getData(inputCariKelas.value.id);
};

const getTempSekolah = computed(() => storeGuruBk.getTempSekolah);

const fnCariDataTempSekolahWhereSekolahId = (id) => {
    let tempSekolah = storeGuruBk.getTempSekolah;
    // console.log(id, tempSekolah);
    return tempSekolah ? tempSekolah.filter((item) => item.id == id) : [];
}


const getDataSekolah = fnCariDataTempSekolahWhereSekolahId(id);

const fnSetToTempSekolah = (sekolah_id, kelas_id, nama_kelas) => {
    let obj = {
        id: sekolah_id,
        kelas_id: kelas_id,
        nama_kelas: nama_kelas,
    }
    // console.log("objek", obj);
    let temp = getTempSekolah.value;
    // console.log("temp", temp);
    if (temp.length > 0) {
        let periksa = temp.filter((x) => x.id == obj.id);
        // console.log("periksa:", periksa)
        if (periksa.length > 0) {
            temp.forEach((x, index) => {
                if (x.id == obj.id) {
                    x.kelas_id = obj.kelas_id,
                        x.nama_kelas = obj.nama_kelas
                }
            })
        } else {
            temp.push(obj);
        }
    } else {
        temp.push(obj);
    }
    // console.log(temp);
    // console.log(getTempSekolah);
    storeGuruBk.setTempSekolah(temp)
}


const getData = async (kelas_id) => {
    try {
        dataAsli.value = [];
        data.value = [];
        const response = await Api.get(
            `admin/ujian/skolastik/hasil/kelas/${kelas_id}`
        );
        dataAsli.value = response.data;

        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
const columns = [
    {
        label: "#",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "Nama Siswa",
        field: "nama",
        type: "String",
    },
    {
        label: "Kelas",
        field: "kelas_nama",
        type: "String",
    },
    {
        label: "Hasil",
        field: "hasil",
        type: "String",
    },
    {
        label: "Paket",
        field: "paket_nama",
        type: "String",
    },
    {
        label: "Status",
        field: "status_ujian",
        type: "String",
    },
    {
        label: "Batas Ujian",
        field: "tgl_ujian",
        type: "String",
    },
    {
        label: "Tipe",
        field: "prefix",
        type: "String",
    },
];
const doCopyClipboard = (item) => {
    navigator.clipboard.writeText(item);
    Toast.babeng("Info", `${item} berhasil disalin`);
};

const doDeleteData = async (id2, index) => {
    if (confirm("Apakah anda yakin menghapus data ini?")) {
        try {
            const response = await Api.delete(`owner/datasekolah/${id}/siswa/${id2}/forceDestroy`);
            data.value.splice(index, 1);
            Toast.success("Success", "Data Berhasil dihapus!");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};


const dataPaket = ref([]);
// PAKET
let pilihPaket = ref([
    // {
    //     label: "Belum masuk paket",
    //     id: "Belum masuk paket",
    // },
]);

const doPilihPaket = () => {
    // simpan ke TempPilihPaket state
    // console.log(inputCariPaket.value, paketTerpilih.value);
    skolastikStore.setPaketTerpilih(inputCariPaket.value.id, inputCariPaket.value.label);
    skolastikStore.setTglBatasPengerjaan(dataForm.value.tglBatasPengerjaan);

    // console.log(paketTerpilih.value);

};
// get Kelas
const getDataPaket = async () => {
    try {
        const response = await Api.get(`admin/ujian/skolastik/paketsoal`);
        // console.log(response);
        dataPaket.value = response.data;
        if (dataPaket.value.length > 0) {
            // console.log(dataKelas.value[0].id);
            dataPaket.value.forEach((item) => {
                pilihPaket.value.push({
                    label: item.nama,
                    id: item.id,
                });
            });
            // console.log(kelas_id.value);
            // getData(kelas_id.value);
        }
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};
getDataPaket();
// console.log(kelas_id.value);
const inputCariPaket = ref({
    id: paketTerpilih.value.id,
    label: paketTerpilih.value.label,
});

const dataForm = ref({
    paket_id: null,
    tglBatasPengerjaan: tglBatasPengerjaan.value
})
const doGenerateKelas = async (kelas) => {
    // console.log('====================================');
    // console.log(kelas);
    // console.log('====================================');
    if (confirm("Apakah anda yakin generate data ini?")) {
        let dataFormSend = {
            paket_id: paketTerpilih.value.id,
            tgl: tglBatasPengerjaan.value,
        }
        try {
            console.log(kelas_id.value);
            const response = await Api.post(`admin/ujian/skolastik/proses/kelas/${kelas}`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil digenerate!');
            getData(kelas);
            return true;
        } catch (error) {
            console.error(error);
        }
    }
};
const doDeleteProsesKelas = async (kelas) => {
    if (confirm("Apakah anda yakin menghapus data proses ini?")) {
        let dataFormSend = {
            paket_id: paketTerpilih.value.id,
            tgl: tglBatasPengerjaan.value,
        }
        try {
            const response = await Api.delete(`admin/ujian/skolastik/proses/kelas/${kelas}`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil digenerate!');
            getData(kelas);
            return true;
        } catch (error) {
            console.error(error);
        }
    }
};
const doGenerateSiswa = async (id, index) => {
    if (confirm("Apakah anda yakin generate data ini?")) {
        let dataFormSend = {
            paket_id: paketTerpilih.value.id,
            tgl: tglBatasPengerjaan.value,
        }
        try {
            const response = await Api.post(`admin/ujian/skolastik/proses/siswa/${id}`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil digenerate!');
            getData(kelas_id.value);
            return true;
        } catch (error) {
            console.error(error);
        }
    }
};
const doDeleteProsesSiswa = async (id, index) => {
    if (confirm("Apakah anda yakin menghapus data proses ini?")) {
        let dataFormSend = {
            paket_id: paketTerpilih.value.id,
            tgl: tglBatasPengerjaan.value,
        }
        try {
            const response = await Api.delete(`admin/ujian/skolastik/proses/siswa/${id}`, dataFormSend);
            Toast.babeng("Berhasil", 'Data berhasil digenerate!');
            getData(kelas_id.value);
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
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Ujian Skolastik Siswa
                kelas {{
                    getDataSekolah.length > 0 ? getDataSekolah[0].nama_kelas : null
                }}
            </span>
        </div>
        <div class="md:py-0 py-4 space-x-2 space-y-2">
            <!-- The button to open modal -->
            <label for="my-modal-4" class="btn">Pengaturan Skolastik</label>

            <!-- Put this part before </body> tag -->
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
            <label for="my-modal-4" class="modal cursor-pointer ">
                <label class="modal-box w-11/12 max-w-5xl" for="">
                    <div class="py-10">
                        <!-- <h3 class="text-lg font-bold">Kelas Aktif : {{
        getDataSekolah.length > 0 ? getDataSekolah[0].nama_kelas : null
}}</h3> -->
                        <h3 class="text-lg font-bold">Paket Aktif : {{ paketTerpilih.label }} , Batas : {{
                            tglBatasPengerjaan
                        }}</h3>
                        <div class="divider"></div>
                        <div>
                            <label>Pilih Paket : </label>
                            <div class="flex justify-center">
                                <v-select class="py-2 px-0 w-full mx-auto md:mx-0" :options="pilihPaket"
                                    v-model="inputCariPaket" v-bind:class="{ disabled: false }"></v-select>

                            </div>
                            <div class="flex flex-col">
                                <label>Batas Tanggal Pengerjaan : </label>
                                <div>
                                    <Datepicker v-model="dataForm.tglBatasPengerjaan"></Datepicker>
                                </div>
                            </div>
                            <div class="w-full flex justify-end">
                                <div class="py-2">
                                    <button class="btn btn-sm btn-info p-2" @click="doPilihPaket()">
                                        Apply</button>
                                </div>
                            </div>
                            <div class="divider"></div>

                            <div class="w-full flex justify-end space-x-2">
                                <button class="btn btn-sm btn-error p-2"
                                    @click="doDeleteProsesKelas(inputCariKelas.id ? inputCariKelas.id : kelas_id)">
                                    Delete
                                </button>
                                <button class="btn btn-sm btn-info p-2"
                                    @click="doGenerateKelas(inputCariKelas.id ? inputCariKelas.id : kelas_id)">
                                    Generate Skolastik Per Kelas
                                </button>
                            </div>
                        </div>
                    </div>
                </label>
            </label>

        </div>
    </div>
    <div class="w-full bg-base-200 shadow py-4 px-4">
        <div class="flex justify-center">
            <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihKelas" v-model="inputCariKelas"
                v-bind:class="{ disabled: false }"></v-select>
            <div class="py-2">
                <button class="btn btn-sm btn-info p-2" @click="doPilihKelas()">
                    Cari
                </button>
            </div>
        </div>
    </div>
    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
            <div class="bg-base-200 shadow rounded-lg px-4 py-4">
                <div v-if="data">
                    <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
                        enabled: true,
                    }" :pagination-options="{
    enabled: true,
    perPageDropdown: [50, 100, 200],
}" styleClass="vgt-table striped bordered condensed" class="py-0 space-x-2">
                        <template #table-actions>
                            <div class="space-x-1 space-y-1 gap-1">
                            </div>
                        </template>
                        <template #table-row="props">
                            <span v-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-start space-x-2"
                                    v-if="superadmin">

                                    <button class="btn btn-sm btn-warning tooltip" data-tip="Generate Skolastik"
                                        @click="doGenerateSiswa(props.row.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                    </button>

                                    <button class="btn btn-sm btn-primary tooltip" data-tip="Reset Waktu"
                                        @click="doResetWaktu(props.row.id)" v-if="props.row.paket_nama">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-success tooltip" data-tip="Reset Jawaban Salah"
                                        @click="doResetSalah(props.row.id)" v-if="props.row.paket_nama">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-error tooltip" data-tip="Generate Skolastik"
                                        @click="doDeleteProsesSiswa(props.row.id)" v-if="props.row.paket_nama">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                    </button>
                                </div>
                            </span>


                            <span v-else-if="props.column.field == 'prefix'">
                                <div class="flex justify-center gap-2">
                                    <div v-if="props.row.prefix">
                                        USER
                                    </div>
                                    <div v-else>API</div>

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


    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="modalImport" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <label for="modalImport" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="font-bold text-lg">Import data menggunakan .xlx / .xlxs !</h3>
            <div class="py-4">
                <input type="file" ref="file" />
                <button class="btn btn-info text-gray-100" @click="doSubmitFile()">
                    Upload
                </button>
            </div>
            <div class="modal-action">
                <!-- <label for="modalImport" class="btn">Done!</label> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import Toast from "@/components/lib/Toast";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
import { Form, Field } from "vee-validate";

const router = useRouter();
const route = useRoute();
const paketsoal_id = route.params.paketsoal_id;
const aspek_id = route.params.aspek_id;
const banksoal_aspek_id = route.params.banksoal_aspek_id;

const dataAsli = ref([]);
const data = ref([]);
const aspek = ref([]);
const dataForm = ref({});

const columns = [
    {
        label: "Pertanyaan",
        field: "pertanyaan",
        type: "String",
    },
    {
        label: "Jumlah Pilihan Jawaban",
        field: "pilihanjawaban_jml",
        type: "Number",
    },
    {
        label: "Jumlah Pilihan Jawaban Benar",
        field: "pilihanjawaban_jml_benar",
        type: "Number",
    },
    {
        label: "Sub Aspek",
        field: "aspek_detail_nama",
        type: "Number",
    },
];



const getData = async () => {
    try {
        const response = await Api.get(`admin/ujian/skolastik/aspek/${banksoal_aspek_id}/soal`);
        dataAsli.value = response.data;
        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();

const getDataAspek = async () => {
    try {
        const response = await Api.get(`admin/ujian/skolastik/paketsoal/null/aspek/${aspek_id}/getSoaL`);
        aspek.value = response.aspek;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataAspek();

const doDeleteData = async (id, index) => {
    if (confirm("Apakah anda yakin menghapus data ini?")) {
        try {
            const response = await Api.delete(
                `admin/ujian/skolastik/paketsoal/null/aspek/soal/${id}`
            );
            Toast.success("Info", "Data berhasil dihapus!");
            // ApiPaketsoalKategori.getDataId(paketsoal_id, kategori_id);
            getData();
            return true;
        } catch (error) {
            console.error(error);
        }
    }
};


const myTable = ref(null);
const rowSelection = ref([]);
const doAdd = async () => {
    // selectionChanged();
    // get id and filter unique
    const dataId = myTable.value.selectedRows.map((item) => item.id);
    // console.log(dataId);
    dataForm.value = { listId: dataId };
    // console.log(aspek_id);
    const response = await Api.post(
        `admin/ujian/skolastik/paketsoal/null/aspek/${aspek_id}/addsoal`,
        dataForm.value
    );
    // const response = await ApiPaketsoalKategori.doStoreDataSoal(
    //     kategori_id,
    //     dataId
    // );

    if (response.success == true) {
        Toast.babeng("Data berhasil ditambahkan", "Berhasil");
        router.push({
            name: "admin.skolastik.paketsoal.aspek.soal",
            params: { paketsoal_id, aspek_id },
        });
    } else {
        Toast.babeng("Info", "Gagal di tambahkan!");
    }
    // console.log(myTable.value.selectedRows, dataId);
};
const selectionChanged = (selection) => {
    // rowSelection.value = selection;
    console.log(rowSelection.value, selection);
};
const doAddAll = () => {
    // console.log(props);
};
</script>
<template>
    <div class="pt-4 px-10 md:flex justify-between">
        <div v-if="aspek">
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">{{ aspek.nama }}
            </span>
        </div>
        <div class="md:py-0 py-4">
            <BreadCrumb>
                <template v-slot:content>
                    <li>
                        <router-link :to="{ name: 'admin.skolastik.paketsoal' }">Paketsoal</router-link>
                    </li>
                    <BreadCrumbSpace /> Index
                </template>
            </BreadCrumb>
        </div>
    </div>
    <div class="divider"></div>
    <div class="py-2 lg:py-4 px-4">
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div v-if="data">
                        <vue-good-table ref="myTable" theme="polar-bear" :line-numbers="true" compactMode
                            :columns="columns" :rows="data" @on-selected-rows-change="selectionChanged"
                            :select-options="{ enabled: true }" :search-options="{
                                enabled: true,
                            }" :pagination-options="{
    enabled: true,
    perPageDropdown: [50, 100, 150],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                            <template #table-actions>
                                <div class="space-x-1  gap-1">
                                    <router-link :to="{
                                        name: 'admin.skolastik.paketsoal.aspek.soal',
                                        params: { paketsoal_id, aspek_id },
                                    }"> <button class="btn btn-secondary btn-sm tooltip" data-tip="Kembali"><svg xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                                            </svg>
                                        </button></router-link>
                                    <button @click="doAdd()" class="btn btn-sm btn-success tooltip"
                                        data-tip="Tambah Terpilih">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </template>
                            <!-- <template #table-actions-bottom>
              This will show up on the bottom of the table.
            </template> -->
                            <template #table-row="props">
                                <span v-if="props.column.field == 'actions'">
                                    <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                        <button class="btn btn-sm btn-danger"
                                            @click="doDeleteData(props.row.id, props.index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </span>

                                <span v-else-if="props.column.field == 'pertanyaan'"><span
                                        v-html="props.row.pertanyaan"></span>
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
    </div>

</template>
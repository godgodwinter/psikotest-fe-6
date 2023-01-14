<script setup>
import { ref, computed } from "vue";
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

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const superadmin = computed(() => storeGuruBk.getSuperadminMode);

const router = useRouter();
const route = useRoute();
const paketsoal_id = route.params.paketsoal_id;
const aspek_id = route.params.aspek_id;
const banksoal_aspek_id = ref(null);
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
        const response = await Api.get(`admin/ujian/skolastik/paketsoal/null/aspek/${aspek_id}/getSoaL`);
        dataAsli.value = response.data;
        data.value = response.data;
        banksoal_aspek_id.value = response.aspek.skolastik_banksoal_aspek_id;
        console.log(banksoal_aspek_id.value);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();

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
</script>
<template>
    <div class="pt-4 px-10 md:flex justify-between">
        <div>
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">PAKETSOAL ASPEK SOAL
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
                        <vue-good-table theme="polar-bear" :line-numbers="true" compactMode :columns="columns"
                            :rows="data" :search-options="{
                                enabled: true,
                            }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                            <template #table-actions>
                                <div class="space-x-1 space-y-1 gap-1" v-if="banksoal_aspek_id">
                                    <router-link :to="{
                                        name: 'admin.skolastik.paketsoal.aspek',
                                        params: { paketsoal_id },
                                    }"> <span class="btn btn-secondary btn-sm">Batal</span></router-link>
                                    <router-link :to="{
                                        name: 'admin.skolastik.paketsoal.aspek.soal.add',
                                        params: { paketsoal_id, aspek_id, banksoal_aspek_id: banksoal_aspek_id },
                                    }">
                                        <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah SOAL">
                                            TAMBAH SOAL
                                        </button>
                                    </router-link>
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
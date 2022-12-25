<script setup>
import { ref } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";

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
        label: "Status",
        field: "status",
        type: "String",
    },
];


const getData = async () => {
    try {
        const response = await Api.get(`admin/ujian/skolastik/aspek`);
        dataAsli.value = response.data;
        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();

const doEditData = async (id, index) => {
    // router.push({
    //     name: "AdminKlasifikasiEdit",
    //     params: { id: id },
    // });
};
const doDeleteData = async (id, index) => {
    if (confirm("Apakah anda yakin menghapus data ini?")) {
        // try {
        //     const response = await Api.delete(`owner/klasifikasi/${id}`);
        //     data.value.splice(index, 1);
        //     Toast.success("Success", "Data Berhasil dihapus!");
        //     return response.data;
        // } catch (error) {
        //     console.error(error);
        // }
    }
};
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
                        <router-link :to="{ name: 'admin.skolastik.banksoal.aspek' }">Aspek</router-link>
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
                        <template #table-row="props">
                            <span v-if="props.column.field == 'actions'">
                                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                    <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                                    <ButtonDelete @click="doDeleteData(props.row.id, props.index)" />

                                    <router-link :to="{
                                        name: 'admin.skolastik.banksoal.soal.index',
                                        params: { aspek_id: props.row.id },
                                    }">
                                        <button class="btn btn-sm btn-primary tooltip" data-tip="Detail Soal">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg></button></router-link>
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
<script setup>
import TabLinkPaketSoal from "./TabLinkPaketSoal.vue";
import { ref, computed } from "vue";
import Api from "@/axios/axios";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import ToolBar from "@/components/atoms/editor/ToolBar.vue";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import ApiPaketsoalKategori from "@/services/api/apiPaketsoalKategori";
import { useStoreUjian } from "@/stores/data/ujian";

const router = useRouter();
const route = useRoute();
const paketsoal_id = route.params.paketsoal_id;

const storeUjian = useStoreUjian();
storeUjian.$subscribe((mutation, state) => {
  data.value = dataAsli.value;
});

const data = ref([]);
const dataAsli = computed(() => storeUjian.getDataPaketsoalKategori);
data.value = dataAsli.value;
// if (dataAsli.value.length < 1) {
ApiPaketsoalKategori.getData(paketsoal_id);
// }

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
    label: "Waktu Pengerjaan",
    field: "waktu",
    type: "String",
  },
  {
    label: "Jumlah Soal",
    field: "jml_soal",
    type: "Number",
  },
];
</script>
<template>
  <TabLinkPaketSoal />
  <div class="font-bold">
    <h1>Nama Paket : -</h1>
    <h1>Peserta : -</h1>
    <h1>Kategori : -</h1>
    <h1>Waktu : -</h1>
  </div>
  <div class="py-2 lg:py-4 px-4">
    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div v-if="data">
            <vue-good-table
              theme="polar-bear"
              :line-numbers="true"
              compactMode
              :columns="columns"
              :rows="data"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                perPageDropdown: [10, 20, 50],
              }"
              styleClass="vgt-table striped bordered condensed"
              class="py-0"
            >
              <template #table-actions>
                <div class="space-x-1 space-y-1 gap-1">
                  <!-- <button
                    class="btn btn-sm btn-secondary tooltip"
                    data-tip="Refresh Data"
                    @click="doRefreshData()"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button> -->
                  <span class="btn btn-secondary btn-sm" @click="router.go(-1)"
                    >Kembali</span
                  >
                  <router-link
                    :to="{
                      name: 'admin.ujian.paketsoal.kategori.create',
                      params: { paketsoal_id: paketsoal_id },
                    }"
                  >
                    <button
                      class="btn btn-sm btn-primary tooltip"
                      data-tip="Tambah Data"
                    >
                      TAMBAH SOAL
                      <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clip-rule="evenodd"
                        />
                      </svg> -->
                    </button>
                  </router-link>
                </div>
              </template>
              <!-- <template #table-actions-bottom>
              This will show up on the bottom of the table.
            </template> -->
              <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                  <div
                    class="text-sm font-medium text-center flex justify-center space-x-1"
                  >
                    <!-- <button
                      class="btn btn-sm btn-warning"
                      @click="doEditData(props.row.id, props.index)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button> -->
                    <button
                      class="btn btn-sm btn-secondary tooltip"
                      data-tip="Detail Data"
                      @click="doDetailData(props.row.id, props.index)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="doDeleteData(props.row.id, props.index)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </span>

                <span v-else-if="props.column.field == 'pertanyaan'"
                  ><span v-html="props.row.pertanyaan"></span>
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

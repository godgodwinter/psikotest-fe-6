<script setup>
import { ref, computed } from "vue";
// import Examples from "./banksoalExamples.js";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import { useStoreKategori } from "@/stores/data/kategori";
import ApiKategori from "@/services/api/apiKategori";
import ApiBanksoal from "@/services/api/apiBanksoal";
import Toast from "@/components/lib/Toast";
import Api from "@/axios/axios";
import { useRouter } from "vue-router";
const router = useRouter();
const storeKategori = useStoreKategori();
const storeBanksoal = useStoreBanksoal();
storeBanksoal.setPagesActive("soal");
const data = ref([]);
const dataAsli = computed(() => storeBanksoal.getData);
const dataKategori = computed(() => storeKategori.getData);
storeBanksoal.$subscribe((mutation, state) => {
  //   console.log(mutation, state);
  data.value = dataAsli.value;
  if (dataKategori.value.length > 0) {
    dataKategoriTab.value = dataKategori.value[0].id;
    getData(dataKategori.value[0].id);
  }
});
storeKategori.$subscribe((mutation, state) => {
  //   console.log(mutation, state);
});
data.value = dataAsli.value;

const dataKategoriTab = ref(null);

// if (dataAsli.value.length < 1) {
ApiBanksoal.getData();
// }
// if (dataKategori.value.length < 1) {
ApiKategori.getData();
// }

// dataKategori.value = Examples.kategori;
// dataAsli.value = Examples.data;

const getData = (kategori_id = dataKategoriTab.value) => {
  dataKategoriTab.value = kategori_id;
  data.value = dataAsli.value.filter((item) => {
    return item.kategori_id == kategori_id;
  });
};
if (dataKategori.value.length > 0) {
  dataKategoriTab.value = dataKategori.value[0].id;
  getData(dataKategori.value[0].id);
}

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
    label: "Tipe Soal",
    field: "tipe",
    type: "String",
  },
  {
    label: "Jumlah PIlihan Jawaban",
    field: "jml_pilihanjawaban",
    type: "Number",
  },
  {
    label: "Status",
    field: "status",
    type: "String",
  },
];

const doEditData = async (id, index) => {
  router.push({
    name: "admin.banksoal.edit",
    params: { id: id },
  });
};

const doDeleteData = async (id, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    // data.value.splice(index, 1);
    const resDelete = await ApiBanksoal.deleteData(id);
    if (resDelete) {
      // jenis.value = null;
      // isAllActive.value = true;
      // isPengeluaranActive.value = false;
      // isPemasukanActive.value = false;
      Toast.success("Info", "Data berhasil dihapus!");
      // ApiKategori.getData();
    }
  }
};

const doRefreshData = () => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    ApiKategori.getData();
    ApiBanksoal.getData();
    Toast.success("Info", "Refresh Data!");
  }
};
const doUpdateStatus = async (id, index) => {
  if (confirm("Apakah anda mengubah status soal ini?")) {
    try {
      const response = await Api.put(
        `admin/menuujian/menubanksoal/kategori/${id}/updatestatus`
      );
      // let data = dataAsli.value.filter((item) => item.id !== id);
      // storeUjian.setDataPaketsoal(data);
      // getDataId(kategori_id);
      Toast.success("Info", "Data berhasil dihapus!");
      ApiBanksoal.getData();
      return true;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<template>
  <div class="py-2 lg:py-4 px-4 flex justify-start flex-col">
    <h1 class="font-bold text-xl">Kategori :</h1>
    <div class="tabs gap-4 flex justify-center">
      <a class="tab tab-bordered" v-for="(item, index) in dataKategori" :key="item.id" @click="getData(item.id)"
        :class="{ 'tab-active': dataKategoriTab == item.id }">{{ item.nama }}
      </a>
    </div>
  </div>

  <div class="py-2 lg:py-4 px-4">
    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div v-if="data">
            <vue-good-table theme="polar-bear" :line-numbers="true" compactMode :columns="columns" :rows="data"
              :search-options="{
                enabled: true,
              }" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
              <template #table-actions>
                <div class="space-x-1 space-y-1 gap-1">
                  <button class="btn btn-sm btn-secondary tooltip" data-tip="Refresh Data" @click="doRefreshData()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                  <router-link :to="{
                    name: 'admin.banksoal.create',
                    params: { jenis: jenis },
                  }">
                    <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah Data">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clip-rule="evenodd" />
                      </svg>
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
                    <button class="btn btn-sm btn-warning" @click="doEditData(props.row.id, props.index)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-danger" @click="doDeleteData(props.row.id, props.index)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button v-if="props.row.status == 'Aktif'" class="btn btn-sm btn-success tooltip"
                      data-tip=" Nonaktifkan" @click="doUpdateStatus(props.row.id, props.index)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clip-rule="evenodd" />
                        <path
                          d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    </button>
                    <button v-else class="btn btn-sm btn-danger tooltip" data-tip="Aktifkan"
                      @click="doUpdateStatus(props.row.id, props.index)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </span>

                <span v-else-if="props.column.field == 'pertanyaan'"><span v-html="props.row.pertanyaan"></span>
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

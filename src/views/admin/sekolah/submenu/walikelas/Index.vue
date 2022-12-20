<script setup>
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreGuruBk } from "@/stores/guruBk";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
const storeGuruBk = useStoreGuruBk();
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("walikelas");
const superadmin = computed(() => storeGuruBk.getSuperadminMode);

const router = useRouter();
const route = useRoute();

const id = route.params.id;
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
    label: "Nama Guru",
    field: "nama",
    type: "String",
  },
  {
    label: "NIP",
    field: "nomerinduk",
    type: "String",
  },
  {
    label: "Jumlah Kelas",
    field: "jmlkelas",
    type: "String",
  },
];
const getData = async () => {
  try {
    const response = await Api.get(`owner/datasekolah/${id}/walikelas`);
    dataAsli.value = response.data;
    data.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();
const doEditData = async (id2, index) => {
  router.push({
    name: "AdminSekolahDetailWalikelasEdit",
    params: { id, id2: id2 },
  });
};
const doDeleteData = async (id2, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(`owner/datasekolah/${id}/walikelas/${id2}`);
      data.value.splice(index, 1);
      Toast.success("Success", "Data Berhasil dihapus!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

</script>
<template>
  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :columns="columns" :line-numbers="true" :rows="data" :search-options="{
            enabled: true,
          }" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">

            <template #table-actions>
              <div class="space-x-1 space-y-1 gap-1">
                <router-link :to="{
                  name: 'admin.sekolah.walikelas.tambah',
                }">
                  <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah Wali Kelas" v-if="superadmin">

                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </router-link>
              </div>
            </template>
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div class="text-sm font-medium text-center flex justify-center space-x-1">
                  <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                  <ButtonDelete @click="doDeleteData(props.row.id, props.index)" v-if="superadmin" />
                </div>
              </span>

              <span v-else-if="props.column.field == 'jml_sekolah'">
                <div class="text-left">{{ props.row.jml_sekolah }} Sekolah</div>
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

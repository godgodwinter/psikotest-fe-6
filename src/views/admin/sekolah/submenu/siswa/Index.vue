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
const storeGuruBk = useStoreGuruBk();
const superadmin = computed(() => storeGuruBk.getSuperadminMode);
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("siswa");

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
    name: "AdminSekolahDetailSiswa",
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
  console.log(id, tempSekolah);
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
  console.log("temp", temp);
  if (temp.length > 0) {
    let periksa = temp.filter((x) => x.id == obj.id);
    console.log("periksa:", periksa)
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
      `admin/datasekolah/${id}/datasiswa/${kelas_id}`
    );
    dataAsli.value = response.data;

    data.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const columns = [
  // {
  //   label: "No",
  //   field: "no",
  //   width: "50px",
  //   tdClass: "text-center",
  //   thClass: "text-center",
  // },
  {
    label: "Actions",
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
    label: "Username",
    field: "username",
    type: "String",
  },
  {
    label: "Password Default",
    field: "passworddefault",
    type: "String",
  },
  {
    label: "Username Ortu",
    field: "ortu_username",
    type: "String",
  },
  {
    label: "Password Default Ortu",
    field: "ortu_passworddefault",
    type: "String",
  },
  {
    label: "Tipe",
    field: "prefix",
    type: "String",
  },
];
// const getData = async () => {
//   try {
//     const response = await Api.get(`owner/datasekolah/${id}}/siswa`);
//     dataAsli.value = response.data;
//     data.value = response.data;

//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// getData();
const doGenerateAkun = () => {
  if (confirm("Apakah anda yakin menggenerate akun siswa yang belum dibuat?")) {
    try {
      const response = Api.post(`owner/datasekolah/${id}/siswa/generateakun`);
      getData();
      Toast.success("Success", "Generate akun berhasil!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
const doGenerateAkunAll = () => {
  if (confirm("Apakah anda yakin menggenerate akun semua siswa?")) {
    try {
      const response = Api.post(
        `owner/datasekolah/${id}/siswa/generateakunforceall`
      );
      getData();
      Toast.success("Success", "Generate akun berhasil!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

const doCopyClipboard = (item) => {
  navigator.clipboard.writeText(item);
  Toast.babeng("Info", `${item} berhasil disalin`);
};

// const dataKelas = ref([]);

// const inputCariKelas = ref({
//   label: "Semua Kelas",
//   id: "Semua Kelas",
// });

// let pilihKelas = ref([
//   {
//     label: "Semua Kelas",
//     id: "Semua Kelas",
//   },
//   {
//     label: "Belum masuk Kelas",
//     id: "Belum masuk Kelas",
//   },
// ]);
// // get Kelas
// const getDataKelas = async () => {
//   try {
//     const response = await Api.get(`owner/datasekolah/${id}/kelas`);
//     // console.log(response);
//     dataKelas.value = response.data;
//     dataKelas.value.forEach((item) => {
//       pilihKelas.value.push({
//         label: item.nama,
//         id: item.id,
//       });
//     });
//     return response;
//   } catch (error) {
//     Toast.danger("Warning", "Data Gagal dimuat");
//     console.error(error);
//   }
// };
// getDataKelas();

// const doPilihKelas = () => {
//   if (inputCariKelas.value.id === "Semua Kelas") {
//     data.value = dataAsli.value;
//   } else if (inputCariKelas.value.id === "Belum masuk Kelas") {
//     let dataFiltered = dataAsli.value.filter((item) => {
//       return item.kelas === null;
//     });
//     data.value = dataFiltered;
//   } else {
//     let dataFiltered = dataAsli.value.filter((item) => {
//       return item.kelas_id == inputCariKelas.value.id;
//     });
//     data.value = dataFiltered;
//   }
// };
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Siswa kelas {{
          getDataSekolah.length > 0 ? getDataSekolah[0].nama_kelas : null
      }}
      </span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <!-- <button
        class="btn btn-sm btn-warning text-base-content"
        @click="doGenerateAkun()"
      >
        Generate Akun Baru
      </button> -->
      <router-link :to="{ name: 'AdminSekolahDetailSiswaGenerate', params: { id: id } }">
        <button class="btn btn-sm btn-info text-base-content">
          Generate Akun
        </button>
      </router-link>

      <!-- <button
        class="btn btn-sm btn-error text-base-content"
        @click="doGenerateAkunAll()"
      >
        Generate Semua Akun
      </button> -->
      <!-- <router-link :to="{ name: 'AdminSekolah' }">
        <button class="btn btn-sm btn-info text-base-content">
          Tambah
        </button></router-link
      > -->
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
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-actions>
              <div class="space-x-1 space-y-1 gap-1">
                <router-link :to="{
                  name: 'admin.sekolah.siswa.tambah',
                }">
                  <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah Siswa" v-if="superadmin">

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
                <div class="text-sm font-medium text-center flex justify-center space-x-2" v-if="superadmin">
                  <router-link :to="{
                    name: 'admin.sekolah.siswa.edit',
                    params: { id, id2: props.row.id },
                  }">
                    <button class="btn btn-sm btn-warning tooltip" data-tip="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg></button>
                  </router-link>
                  <router-link :to="{
                    name: 'admin.sekolah.siswa.pindahkelas',
                    params: { id, id2: props.row.id },
                  }">
                    <button class="btn btn-sm btn-primary tooltip" data-tip="Pindah Kelas">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg></button>
                  </router-link>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>
              <span v-else-if="props.column.field == 'jml_sekolah'">
                <div class="text-left">{{ props.row.jml_sekolah }} Sekolah</div>
              </span>

              <span v-else-if="props.column.field == 'username'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.username }}</div>
                  <span v-if="props.row.username" @click="doCopyClipboard(props.row.username)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'passworddefault'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.passworddefault }}</div>
                  <span v-if="props.row.passworddefault" @click="doCopyClipboard(props.row.passworddefault)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'ortu_username'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.ortu_username }}</div>
                  <span v-if="props.row.ortu_username" @click="doCopyClipboard(props.row.ortu_username)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'ortu_passworddefault'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">
                    {{ props.row.ortu_passworddefault }}
                  </div>
                  <span v-if="props.row.ortu_passworddefault" @click="doCopyClipboard(props.row.ortu_passworddefault)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
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
</template>

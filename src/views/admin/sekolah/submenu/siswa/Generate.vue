<script setup>
import RadialProgressBar from "vue3-radial-progress";
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import Toast from "@/components/lib/Toast.js";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";

const router = useRouter();
const route = useRoute();

const id = route.params.id;
// https://vue3-radial-progress.vercel.app/
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
  totalSteps.value = data.value.length;
  //   if (tipe == "baru") {
  //     totalSteps.value = data.value.length;
  //   } else {
  //     totalSteps.value = data.value.length;
  //   }
};

const fnDoResetData = async (siswa = 0, index = 0, tipe = "list") => {
  try {
    const response = await Api.post(
      `owner/datasekolah/${id}/siswa/generateakun/persiswa/${siswa}`
    );
    if (tipe == "list") {
      prosesBerhasil.value++;
      completedSteps.value++;
      data.value[index].username = "1";
      fnAlertFinish();
    } else {
      Toast.babeng("Info", `Proses Selesai!`);
    }

    return response.data;
  } catch (error) {
    if (tipe == "list") {
      prosesGagal.value++;
      completedSteps.value++;
      fnAlertFinish();
    } else {
      Toast.babeng("Info", `Proses Gagal!`);
    }
    console.error(error);
  }
};

const fnAlertFinish = () => {
  if (totalSteps.value == completedSteps.value) {
    Toast.babeng("Info", `Proses Selesai!`);
  }
};

// first Load
const GetData = async () => {
  try {
    const response = await Api.get(
      `owner/datasekolah/${id}/siswa/generateakun/list`
    );
    fnReset();
    dataBelumDiGenerate.value = response.data.dataBelumDiGenerate;
    dataSudahDiGenerate.value = response.data.dataSudahDiGenerate;
    dataAll.value = response.data.dataAll;
    // default table
    data.value = dataBelumDiGenerate.value.data;
    totalSteps.value = data.value.length;
    // console.log(response.data);
    // res
    // dataBelumDiGenerate
    // dataSudahDigenerate
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
GetData();

// proses
const getGenerate = () => {
  prosesTipe.value = "baru";
  // get Data Akan Digenerate
  fnReset("baru");
  data.value = dataBelumDiGenerate.value.data;
  totalSteps.value = dataBelumDiGenerate.value.data.length;
  //   res
  //list DataSiswa
};

const getGenerateAll = () => {
  prosesTipe.value = "all";
  // get Data Akan Digenerate
  fnReset("all");
  data.value = dataAll.value.data;
  totalSteps.value = dataAll.value.data.length;
  //   res
  //list DataSiswa
};

const prosesTipe = ref("baru");
const doProses = () => {
  // proses
  if (confirm("Apakah anda yakin Generate data ini?")) {
    try {
      Toast.babeng("Info", `Proses Generate Akun dimulai! ${prosesTipe.value}`);
      totalSteps.value = data.value.length;
      data.value.forEach((item, index) => {
        console.log(item.id);
        fnDoResetData(item.id, index);
      });

      //   return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

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
</script>
<template>
  <div class="w-full flex flex-wrap justify-center">
    <div class="w-1/2 flex justify-center gap-10">
      <div>
        <radial-progress-bar
          :diameter="200"
          :completed-steps="completedSteps"
          :total-steps="totalSteps"
          :start-color="'#0500ff'"
          :stop-color="'#00b7ff'"
        >
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
    <div class="w-full 2xl:w-1/2 flex justify-center">
      <div>
        <div class="py-4 font-bold">
          <h1>Statistik Akun Siswa:</h1>
          <h4>
            # Akun Belum di Generate :
            {{ dataBelumDiGenerate ? dataBelumDiGenerate.count : 0 }}
          </h4>
          <h4>
            # Akun Sudah di Generate :
            {{ dataSudahDiGenerate ? dataSudahDiGenerate.count : 0 }}
          </h4>
          <h4># Total Siswa : {{ dataAll ? dataAll.count : 0 }}</h4>
        </div>

        <div class="space-x-2 py-2">
          <button class="btn btn-warning" @click="getGenerate()">
            GENERATE AKUN BARU
          </button>
          <button class="btn btn-danger" @click="getGenerateAll()">
            RESET SEMUA AKUN
          </button>
          <button class="btn btn-secondary" @click="GetData()">
            REFRESH DATA
          </button>
          <!-- <button class="btn btn-primary" @click="completedSteps++">+1</button> -->
        </div>
      </div>
    </div>
  </div>

  <div class="space-x-2 py-4 px-10 flex justify-center">
    <button class="btn btn-primary" @click="doProses()">
      LAKUKAN PROSES GENERATE !
    </button>
  </div>

  <div class="md:py-2 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table
            :line-numbers="true"
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
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div
                  class="text-sm font-medium text-center flex justify-center space-x-1"
                >
                  <button
                    class="btn btn-sm btn-warning"
                    @click="
                      fnDoResetData(props.row.id, props.index, 'personal')
                    "
                  >
                    RESET
                  </button>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>
              <span v-else-if="props.column.field == 'status'">
                <div
                  class="text-center"
                  v-if="props.row.username != '' && props.row.username != null"
                >
                  Sudah
                </div>
                <div class="text-center" v-else>Belum</div>
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

  <div>
    <h1>Catatan :</h1>

    <p>
      1. Pilih Proses <span class="font-extrabold">"GENERATE AKUN BARU"</span> /
      <span class="font-extrabold"> "RESET SEMUA AKUN"</span>
    </p>
    <p>
      2. Kemudian pilih tombol
      <span class="font-extrabold"> "LAKUKAN PROSES GENERATE"</span> untuk
      memulai proses
    </p>
    <p>
      3. Kemudian
      <span class="font-extrabold"> "REFRESH DATA"</span> untuk mendapatkan
      update data terbaru dari server! .
    </p>
  </div>
</template>

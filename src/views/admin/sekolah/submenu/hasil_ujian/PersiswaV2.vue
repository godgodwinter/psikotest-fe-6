<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";

import CardLockedFitur from "@/components/organismes/CardLockedFitur.vue";
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import { fn_studi_ket, fn_studi_ket_singkatan } from "@/components/lib/Psikotest.js"
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/";

const router = useRouter();
const route = useRoute();


const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const siswa_id = route.params.siswa_id;
const dataAsli = ref(null);
const dataMessage = ref(null);
const dataSiswa = ref([]);
const dataJurusan = ref([]);
const dataMinatbidangstudi = ref([]);
const dataKesimpulan = ref([]);
const dataTidakDisukai = ref([]);
const data = ref([]);
const dataKelas = ref([]);

const doBackToKelas = () => {
    // console.log(inputCariKelas.value.id);
    router.push({
        name: "AdminSekolahDetail.hasil_ujian",
        params: {
            id: id,
            kelas_id: kelas_id.value,
        },
    });
};


const getDataSiswa = async () => {
    try {
        data.value = [];
        const response = await Api.get(
            `owner/hasilpsikologi/detail/${siswa_id}}`
        );
        dataSiswa.value = response.data;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataSiswa();
const getDataUjian = async () => {
    try {
        dataAsli.value = [];
        data.value = [];
        const response = await Api.get(
            `admin/hasil_ujian_lintas/get/siswa/${siswa_id}`
        );
        console.log(response.data);
        dataAsli.value = response.data;
        dataMessage.value = response.message;
        console.log(dataAsli.value, dataMessage.value);
        if (dataAsli.value) {
            data.value = dataAsli.value;
            dataJurusan.value = response.jurusan;
            dataMinatbidangstudi.value = response.minatbidangstudi;
            dataKesimpulan.value = response.kesimpulan;
            dataTidakDisukai.value = response.tidakdisukai;
        }
        // console.log(data.value);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataUjian();

// const sort = (items) => {
//     return items.sort((a, b) => {
//         return a.nilaiAkhir < b.nilaiAkhir ? 1 : -1;
//     });
// }
const encode = (value) => window.btoa(value);

const doCetak = (id = null, token = moment().format("YYYY-MM-DD")) => {
    if (id === null) {
        Toast.danger("Warning", "Data tidak valid!");
    } else {
        window.open(
            `${BASE_URL}api/guest/cetak/hasilujian/lintasbidangstudi/${encode(id)}?token=${encode(token)}`
        );
    }
};
const doCetakLess = (id = null, token = moment().format("YYYY-MM-DD")) => {
    if (id === null) {
        Toast.danger("Warning", "Data tidak valid!");
    } else {
        window.open(
            `${BASE_URL}api/guest/cetak/hasilujian/lintasbidangstudi/${encode(id)}/less?token=${encode(token)}`
        );
    }
};
</script>
<template>

    <div class="pt-4 px-10 md:flex justify-between">
        <div v-if="dataAsli">
            <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm space-x-2">Hasil Ujian
                Lintas Bidang
                Studi
                <ButtonCetak @click="doCetak(siswa_id)" />
                <button class="btn btn-warning btn-sm tooltip" data-tip="cetak v2" @click="doCetakLess(siswa_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                </button>
            </span>
        </div>
        <div class="md:py-0 py-4 space-x-2 space-y-2">
            <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
                @click="doBackToKelas()">Kembali</button>

        </div>
    </div>
    <div v-if="dataAsli">
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <tr>
                                    <td class="whitespace-nowrap w-1/12">No Induk</td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        {{ dataSiswa.nomeridentitas }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>{{ dataSiswa.nama }}</td>
                                </tr>
                                <tr>
                                    <td>Umur</td>
                                    <td>:</td>
                                    <td>{{ dataSiswa.umur }}</td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin</td>
                                    <td>:</td>
                                    <td>{{ dataSiswa.jk }}</td>
                                </tr>
                                <tr>
                                    <td>Sekolah</td>
                                    <td>:</td>
                                    <td>{{ dataSiswa.sekolah_nama }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4" v-for="item, index in data" :key="item.id">

            <p class="font-bold "> {{ index + 1 }}. {{ item.nama }} : {{ item.nilaiAkhir_avg }} - {{
                item.nilaiAkhir_avg_ket
            }}
                ({{
                    item.nilaiAkhir_avg_ket_singkatan
                }})</p>
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <tr v-for="mapel, i in item.detail " :key="mapel.id">
                                    <td class="whitespace-nowrap w-1/12">{{ parseInt(i) + 1 }}</td>
                                    <td class="whitespace-nowrap w-3/12">
                                        {{ mapel.ujian_paketsoal_kategori_nama }}
                                    </td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-3/12">{{ mapel.nilaiAkhir }} -
                                        {{ fn_studi_ket(mapel.nilaiAkhir) }} ( {{
                                            fn_studi_ket_singkatan(mapel.nilaiAkhir)
                                        }})
                                        <!-- {{
                                        mapel.nilaiAkhir_ket
                                    }}
                                        ({{
                                            mapel.nilaiAkhir_ket_singkatan
                                        }}) -->

                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="md:py-2 px-4 lg:flex flex-wrap gap-4" v-for="item, index in data" :key="item.id">

            <p class="font-bold "> {{ index + 1 }}. {{ item.nama }} : {{ item.nilaiAkhir_avg }} - {{
                    item.nilaiAkhir_avg_ket
            }}
                ({{
                        item.nilaiAkhir_avg_ket_singkatan
                }})</p>
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <tr v-for="mapel, i in sort(item.detail) " :key="mapel.id">
                                    <td class="whitespace-nowrap w-1/12">{{ i + 1 }}</td>
                                    <td class="whitespace-nowrap w-3/12">
                                        {{ mapel.ujian_paketsoal_kategori?.kategori?.nama }}
                                    </td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-3/12">{{ mapel.nilaiAkhir.toFixed(1) }} - {{
                                            mapel.nilaiAkhir_ket
                                    }}
                                        ({{
                                                mapel.nilaiAkhir_ket_singkatan
                                        }})</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            asdasd
        </div> -->

        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <!-- <h2 class="font-bold uppercase">JURUSAN </h2> -->
            <div>
                <h2 class="font-bold uppercase">KESIMPULAN DAN SARAN </h2>
                <h4 class="font-bold capitalize">Penguasaan Peminatan Jurusan </h4>
            </div>
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <tr v-for="item, index in dataJurusan" :key="item.id">
                                    <td class="whitespace-nowrap w-1/12">{{ index + 1 }}</td>
                                    <td class="whitespace-nowrap w-3/12">
                                        {{ item.nama }}
                                    </td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-3/12">
                                        {{ item.aspek_nama }} : {{ item.aspek_nilaiAkhir_avg }}
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <h2 class="font-bold uppercase">Kesimpulan dan Saran</h2>

            <div v-if="dataJurusan.length > 0">
                <p class="indent-8">
                    Potensi kemampuan Akademik Subyek saat ini terkuat dibidang studi yang terkait dengan <span
                        class="font-bold">{{
                            dataJurusan[0].aspek_nama
                        }}</span>,
                    maka dalam mengambil jurusan cenderung disarankan bidang <span class="font-bold">{{
                        dataJurusan[0].aspek_nama
                    }}</span>,
                    dan dipertimbangkan untuk mengambil jurusan dibidang <span class="font-bold">{{
                        dataJurusan[1].aspek_nama
                    }}</span>,
                    serta tidak disarankan untuk mengambil jurusan dibidang <span class="font-bold">{{
                        dataJurusan[2].aspek_nama
                    }}</span>
                </p>


                <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
                    <h2 class="font-bold uppercase">Minat Bidang Studi Terkuat </h2>
                    <div class="w-full lg:w-full">
                        <div class="bg-white shadow rounded-lg px-4 py-4">
                            <div class="overflow-x-auto">
                                <table class="table table-compact">
                                    <tbody>
                                        <tr v-for="item, i in dataMinatbidangstudi" :key="item.nilaiAkhir">
                                            <td class="whitespace-nowrap w-1/12">{{ i + 1 }}</td>
                                            <td class="whitespace-nowrap w-3/12 text-left"> {{
                                                item.ujian_paketsoal_kategori_nama
                                            }} </td>
                                            <td class="whitespace-nowrap w-1/12">:</td>
                                            <td class="whitespace-nowrap w-3/12">
                                                {{ item.nilaiAkhir }}
                                            </td>
                                            <td class="whitespace-nowrap w-3/12">
                                                {{
                                                    item.nilaiAkhir_ket_singkatan_revisi ?
                                                        `${fn_studi_ket(item.nilaiAkhir)}
                                                                                                (${fn_studi_ket_singkatan(item.nilaiAkhir)})` :
                                                        `${fn_studi_ket(item.nilaiAkhir)}
                                                                                                (${fn_studi_ket_singkatan(item.nilaiAkhir)})`
                                                }}
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <p class="indent-8 py-4">
                    Sedangkan minat Subyek terkuat utk mempelajari dibidang studi mata pelajaran lain yaitu <span
                        class="font-bold">{{
                            dataMinatbidangstudi[0].ujian_paketsoal_kategori_nama
                        }}</span>,
                    yang didukung bidang studi mata pelajaran <span class="font-bold">{{
                        dataMinatbidangstudi[1].ujian_paketsoal_kategori_nama
                    }}</span>, Selain itu juga Subyek harus belajar membiasakan menyukai mata pelajaran bidang studi
                    yang nilainya kurang dan tidak disukai terutama :

                <div class="space-x-2"> <span class="font-bold mx-2" v-for="item, index in dataTidakDisukai"
                        :key="item.id">
                        {{ index + 1
                        }}. {{
                            item.ujian_paketsoal_kategori_nama
                        }}</span>


                </div>
                </p> -->
                <p class="indent-8 py-4">Sedangkan minat Subyek untuk mempelajari dibidang studi yang disukai dan
                    terkuat yaitu <span class="font-bold"> {{ dataMinatbidangstudi[0].ujian_paketsoal_kategori_nama }},
                        {{
                            dataMinatbidangstudi[1].ujian_paketsoal_kategori_nama
                        }}, {{
    dataMinatbidangstudi[2].ujian_paketsoal_kategori_nama
}}, {{
    dataMinatbidangstudi[3].ujian_paketsoal_kategori_nama
}}, dan {{
    dataMinatbidangstudi[4].ujian_paketsoal_kategori_nama
}}</span>

                    sebagai
                    penunjang dari kelancaran studi lanjud dan keberhasilan pencapaian cita-cita dalam menempuh profesi
                    yang dinginkan. Selain itu juga Subyek harus belajar membiasakan menyukai mata pelajaran bidang
                    studi yang nilainya kurang dan tidak disukai terutama :

                    <span class="font-bold"> 1.{{
                        dataTidakDisukai[0].ujian_paketsoal_kategori_nama
                    }} 2.{{
    dataTidakDisukai[1].ujian_paketsoal_kategori_nama
}} 3.{{
    dataTidakDisukai[2].ujian_paketsoal_kategori_nama
}}</span>
                </p>
            </div>
        </div>
    </div>
    <div v-else class="py-4">
        <div class="alert alert-warning shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{{ dataMessage }}</span>
            </div>
        </div>
    </div>
</template>
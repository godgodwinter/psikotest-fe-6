<script setup>
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { useRoute, useRouter } from "vue-router";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
moment.updateLocale("id", localization);

const router = useRouter();
const route = useRoute();

const paketsoal_id = route.params.paketsoal_id;
const dataForm = ref({
    nama: "",
    tglPembuatan: moment().format("YYYY-MM-DD h:mm:ss"),
    waktu: 10,
    randomSoal: false,
    status: false,
});

const dataDetail = ref({})
const getDataDetail = async () => {
    try {
        const response = await Api.get(`admin/ujian/kface/paketsoal/${paketsoal_id}`);
        dataDetail.value = response.data;
        dataForm.value.nama = dataDetail.value.nama;
        dataForm.value.tglPembuatan = dataDetail.value.tgl;
        dataForm.value.waktu = dataDetail.value.waktu;
        dataForm.value.randomSoal = dataDetail.value.random_soal == 'Aktif' ? true : false;
        dataForm.value.status = dataDetail.value.status == 'Aktif' ? true : false;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();

const onSubmit = async (values) => {
    values.nama = dataForm.value.nama;
    values.tgl = dataForm.value.tglPembuatan;
    values.waktu = dataForm.value.waktu;
    values.random_soal = dataForm.value.randomSoal ? "Aktif" : "Nonaktif";
    values.status = dataForm.value.status ? "Aktif" : "Nonaktif";
    // console.log(values);

    dataForm.value = {
        nama: values.nama,
        tgl: values.tgl,
        waktu: values.waktu,
        random_soal: values.random_soal,
        status: values.status,
    };
    // console.log(dataForm.value);
    try {
        const response = await Api.put(
            `admin/ujian/kface/paketsoal/${paketsoal_id}`,
            dataForm.value
        );
        // console.log(response);
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({
            name: "admin.kface.paketsoal",
            // params: { paketsoal_id },
        });

        return true;
    } catch (error) {
        console.error(error);
    }
};
</script>
<template>
    <article class="prose lg:prose-sm">
        <h2>Buat Paketsoal Baru</h2>
    </article>
    <div>

        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label>Nama :</label>
                        <div>
                            <Field :rules="fnValidasi.validateData" v-model="dataForm.nama" name="nama" type="text"
                                class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.nama }}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label>Waktu (menit) : </label>
                        <div>
                            <Field :rules="fnValidasi.validateData" v-model="dataForm.waktu" name="waktu" type="text"
                                class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.waktu }}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label> Tanggal Pembuatan : </label>
                        <div>
                            <Datepicker v-model="dataForm.tglPembuatan"></Datepicker>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="max-w-xs py-2">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Random Soal</span>
                                    <input type="checkbox" class="toggle" v-model="dataForm.randomSoal"
                                        name="randomSoal" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="max-w-xs py-2">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Jadikan Default</span>
                                    <input type="checkbox" class="toggle" v-model="dataForm.status" name="status" />
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <button class="btn btn-warning">Draft</button> -->
                <span class="btn btn-secondary" @click="router.go(-1)">Batal</span>
                <button class="btn btn-primary">Simpan</button>
            </div>
        </Form>
    </div>
</template>
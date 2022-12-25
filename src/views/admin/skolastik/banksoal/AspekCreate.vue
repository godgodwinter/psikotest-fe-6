<script setup>
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { useRoute, useRouter } from "vue-router";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";

const router = useRouter();
const route = useRoute();

const dataForm = ref({
    nama: "",
    urutan: null,
    waktu: 10,
    instruksiStatus: false,
    lembar_prasoalStatus: false,
    instruksi_pengerjaanStatus: false,
    random_soal: false,
    random_pilihanjawaban: false,
});

const onSubmit = async (values) => {
    values.nama = dataForm.value.nama;
    values.random_soal = dataForm.value.randomSoal
        ? "Aktif"
        : "Nonaktif";
    values.random_pilihanjawaban = dataForm.value.randomPilihanJawaban
        ? "Aktif"
        : "Nonaktif";
    values.instruksi_status = dataForm.value.instruksiStatus
        ? "Aktif"
        : "Nonaktif";
    values.lembar_prasoal_status = dataForm.value.lembar_prasoalStatus
        ? "Aktif"
        : "Nonaktif";
    values.instruksi_pengerjaan_status = dataForm.value.instruksi_pengerjaanStatus
        ? "Aktif"
        : "Nonaktif";
    // console.log(values);
    values.instruksi = dataForm.value.instruksi;
    values.lembar_prasoal = dataForm.value.lembar_prasoal;
    values.instruksi_pengerjaan = dataForm.value.instruksi_pengerjaan;
    // console.log(values);

    dataForm.value = {
        nama: values.nama,
        waktu: values.waktu,
        instruksi: values.instruksi,
        instruksi_status: values.instruksi_status,
        lembar_prasoal: values.lembar_prasoal,
        random_soal: values.random_soal,
        random_pilihanjawaban: values.random_pilihanjawaban,
        lembar_prasoal_status: values.lembar_prasoal_status,
        instruksi_pengerjaan: values.instruksi_pengerjaan,
        instruksi_pengerjaan_status: values.instruksi_pengerjaan_status,
    };
    // console.log(id, dataForm);
    try {
        const response = await Api.post(
            `admin/ujian/skolastik/aspek`,
            dataForm.value
        );
        // console.log(response);
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({
            name: "admin.skolastik.banksoal.aspek",
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
        <h2>Buat Aspek Baru</h2>
    </article>
    <div>

        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label>Judul :</label>
                        <div>
                            <Field :rules="fnValidasi.validateData" v-model="dataForm.nama" name="nama" type="text"
                                class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.nama }}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label>Waktu : (menit)</label>
                        <div>
                            <Field :rules="fnValidasi.validateDataNumber" v-model="dataForm.waktu" name="waktu"
                                type="text" max="100" min="0" class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.waktu }}
                            </div>
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
                                    <span class="label-text">Random Pilihan Jawaban</span>
                                    <input type="checkbox" class="toggle" v-model="dataForm.randomPilihanJawaban"
                                        name="randomPilihanJawaban" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="max-w-xs py-2">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Instruksi</span>
                                    <input type="checkbox" class="toggle" v-model="dataForm.instruksiStatus"
                                        name="instruksiStatus" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <!-- <Field v-if="dataForm.instruksiStatus" :rules="fnValidasi.validateData" v-model="dataForm.instruksi"
              name="instruksi" type="text" placeholder="Instruksi" class="input input-bordered w-11/12" /> -->

                            <textarea v-if="dataForm.instruksiStatus" v-model="dataForm.instruksi"
                                :rules="fnValidasi.validateData" name="instruksi" ref="instruksi"
                                class="textarea textarea-bordered md:w-full  w-11/12" placeholder="">
            </textarea>
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.instruksi }}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="max-w-xs py-2">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Lembar Prasoal </span>
                                    <input type="checkbox" class="toggle" v-model="dataForm.lembar_prasoalStatus"
                                        name="lembar_prasoalStatus" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <!-- <Field v-if="dataForm.lembar_prasoalStatus" :rules="fnValidasi.validateData"
              v-model="dataForm.lembar_prasoal" name="lembar_prasoal" type="text"
              class="input input-bordered w-11/12" /> -->

                            <textarea v-if="dataForm.lembar_prasoalStatus" v-model="dataForm.lembar_prasoal"
                                :rules="fnValidasi.validateData" name="lembar_prasoal" ref="lembar_prasoal"
                                class="textarea textarea-bordered md:w-full  w-11/12" placeholder="">
            </textarea>
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.lembar_prasoal }}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="max-w-xs py-2">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Instruksi Pengerjaan</span>
                                    <input type="checkbox" class="toggle" v-model="dataForm.instruksi_pengerjaanStatus"
                                        name="instruksi_pengerjaanStatus" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <!-- <Field v-if="dataForm.instruksi_pengerjaanStatus" :rules="fnValidasi.validateData"
              v-model="dataForm.instruksi_pengerjaan" name="instruksi_pengerjaan" type="text"
              class="input input-bordered w-11/12" /> -->

                            <textarea v-if="dataForm.instruksi_pengerjaanStatus" v-model="dataForm.instruksi_pengerjaan"
                                :rules="fnValidasi.validateData" name="instruksi_pengerjaan" ref="instruksi_pengerjaan"
                                class="textarea textarea-bordered md:w-full  w-11/12" placeholder="">
            </textarea>
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.instruksi_pengerjaan }}
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
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

const aspek_id = route.params.aspek_id;

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

const dataDetail = ref({})

const getDataDetail = async () => {
    try {
        const response = await Api.get(`admin/ujian/kface/banksoal/aspek/${aspek_id}`);
        dataDetail.value = response.data;
        dataForm.value.nama = dataDetail.value.nama;
        dataForm.value.kode = dataDetail.value.kode;
        dataForm.value.prefix = dataDetail.value.prefix;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();

const onSubmit = async (values) => {
    values.nama = dataForm.value.nama;
    values.kode = dataForm.value.kode;
    values.prefix = dataForm.value.prefix.toLowerCase();
    // console.log(values);

    dataForm.value = {
        kode: values.kode,
        nama: values.nama,
        prefix: values.prefix,
    };
    // console.log(dataForm.value);
    try {
        const response = await Api.put(
            `admin/ujian/kface/banksoal/aspek/${aspek_id}`,
            dataForm.value
        );
        // console.log(response);
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({
            name: "admin.kface.banksoal.aspek",
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
                        <label>Kode : </label>
                        <div>
                            <Field :rules="fnValidasi.validateData" v-model="dataForm.kode" name="kode" type="text"
                                class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.kode }}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Prefix</label>
                        <select class="select select-bordered w-full max-w-xs" v-model="dataForm.prefix">
                            <option disabled selected>Pilih Prefix ?</option>
                            <option class="capitalize" v-if="dataForm.prefix">
                                {{ dataForm.prefix }}
                            </option>
                            <option class="capitalize">
                                Positif
                            </option>
                            <option class="capitalize">
                                Negatif
                            </option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.prefix }}
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
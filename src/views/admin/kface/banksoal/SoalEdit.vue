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

const soal_id = route.params.soal_id;
const dataForm = ref({
    kode: null,
    urutan: null,
    pertanyaan: "",
    tipe: 'Laki-laki',
});

const dataDetail = ref({})

const getDataDetail = async () => {
    try {
        const response = await Api.get(`admin/ujian/kface/banksoal/soal/${soal_id}`);
        dataDetail.value = response.data;
        dataForm.value.kode = dataDetail.value.kode;
        dataForm.value.urutan = dataDetail.value.urutan;
        dataForm.value.pertanyaan = dataDetail.value.pertanyaan;
        dataForm.value.tipe = dataDetail.value.tipe;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();

const onSubmit = async (values) => {
    values.kode = dataForm.value.kode;
    values.urutan = dataForm.value.urutan;
    values.pertanyaan = dataForm.value.pertanyaan;
    values.tipe = dataForm.value.tipe;
    // console.log(values);

    dataForm.value = {
        kode: values.kode,
        urutan: values.urutan,
        pertanyaan: values.pertanyaan,
        tipe: values.tipe,
    };
    // console.log(dataForm.value);
    try {
        const response = await Api.put(
            `admin/ujian/kface/banksoal/soal/${soal_id}`,
            dataForm.value
        );
        // console.log(response);
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({
            name: "admin.kface.banksoal.soal",
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
        <h2>Buat Soal Baru</h2>
    </article>
    <div>

        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label>Link Soal:</label>
                        <div>
                            <Field :rules="fnValidasi.validateData" v-model="dataForm.pertanyaan" name="pertanyaan"
                                type="text" class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.pertanyaan }}
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
                    <div class="flex flex-col">
                        <label>Urutan : </label>
                        <div>
                            <Field :rules="fnValidasi.validateDataNumber" v-model="dataForm.urutan" name="urutan"
                                type="text" class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.urutan }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tipe</label>
                        <select class="select select-bordered w-full max-w-xs" v-model="dataForm.tipe">
                            <option disabled selected>Pilih Tipe ?</option>
                            <option class="capitalize">
                                Laki-laki
                            </option>
                            <option class="capitalize">
                                Perempuan
                            </option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.tipe }}
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
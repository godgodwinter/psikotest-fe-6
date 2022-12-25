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

let pilihAspek = ref([]);
const dataAspek = ref([]);

const dataForm = ref({
    nama: "",
    skolastik_banksoal_aspek_id: {
        id: 0,
        label: "",
    }
});
const getDataAspek = async () => {
    try {
        const response = await Api.get(`admin/ujian/skolastik/aspek`);
        // console.log(response);
        dataAspek.value = response.data;
        dataAspek.value.forEach((item) => {
            pilihAspek.value.push({
                label: item.nama,
                id: item.id,
            });
        });

        dataForm.value.skolastik_banksoal_aspek_id = {
            id: pilihAspek.value[0].id,
            label: pilihAspek.value[0].label,
        };
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};
getDataAspek();


const onSubmit = async (values) => {
    let inputForm = {
        nama: dataForm.value.nama,
        // skolastik_banksoal_aspek_id: dataForm.value.skolastik_banksoal_aspek_id.id,
    };
    let aspek_id = dataForm.value.skolastik_banksoal_aspek_id.id;
    // console.log(id, dataForm);
    try {
        const response = await Api.post(
            `admin/ujian/skolastik/aspek/${aspek_id}/detail`,
            inputForm
        );
        // console.log(response);
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({
            name: "admin.skolastik.banksoal.aspek_sub",
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
        <h2>Buat Sub Aspek Baru</h2>
    </article>
    <div>

        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="flex flex-col">
                    <label> Aspek : </label>
                    <div>
                        <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihAspek"
                            v-model="dataForm.skolastik_banksoal_aspek_id"
                            v-bind:class="{ disabled: false }"></v-select>

                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.select }}
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label>Nama Sub Aspek :</label>
                        <div>
                            <Field :rules="fnValidasi.validateData" v-model="dataForm.nama" name="nama" type="text"
                                class="input input-bordered w-11/12" />
                            <div class="text-xs text-red-600 mt-1">
                                {{ errors.nama }}
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
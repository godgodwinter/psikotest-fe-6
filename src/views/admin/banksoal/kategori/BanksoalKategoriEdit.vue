<script setup>
import ApiKategori from "@/services/api/apiKategori";
import { ref } from "vue";
import { useStoreKategori } from "@/stores/data/kategori";
import { Form, Field } from "vee-validate";
const storeKategori = useStoreKategori();
storeKategori.setPagesActive("create");
import fnValidasi from "@/components/lib/babengValidasi";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const dataForm = ref({});

const resData = ref(null);
const getDataId = async () => {
  resData.value = await ApiKategori.getDataId(id);
  if (resData.value) {
    dataForm.value = resData.value;
  } else {
    Toast.warning("Info", "Data tidak ditemukan");
    router.push({ name: "admin.banksoal.kategori" });
  }
};
getDataId();
const onSubmit = async (values) => {
  // console.log(values);
  const resSubmit = await ApiKategori.doUpdate(id, values);
  if (resSubmit) {
    Toast.success("Info", "Data berhasil ditambahkan!");
    router.push({ name: "admin.banksoal.kategori" });
  }
};
</script>
<template>
  <div class="px-4 py-4" v-if="dataForm">
    <div class="w-full">
      <div class="shadow rounded-lg px-0">
        <div class="w-full lg:w-fi mx-4">
          <div class="p-2 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmit">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="rounded-lg">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label
                          for="kategori"
                          class="text-sm font-medium block mb-2"
                          >Nama Kategori
                        </label>

                        <Field
                          :rules="fnValidasi.validateData2"
                          v-model="dataForm.nama"
                          name="nama"
                          type="text"
                          class="input input-bordered w-11/12"
                        />

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-end mt-4 px-20">
                      <button class="btn btn-active btn-lg btn-primary">
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

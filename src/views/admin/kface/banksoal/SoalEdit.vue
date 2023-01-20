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
  file: null,
  kode: null,
  urutan: null,
  pertanyaan: "",
  tipe: "Laki-laki",
});

const dataDetail = ref({});

const getDataDetail = async () => {
  try {
    const response = await Api.get(
      `admin/ujian/kface/banksoal/soal/${soal_id}`
    );
    dataDetail.value = response.data;
    dataForm.value.file = dataDetail.value.file;
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
  values.file = dataForm.value.file;
  values.kode = dataForm.value.kode;
  values.urutan = dataForm.value.urutan;
  values.pertanyaan = dataForm.value.pertanyaan;
  values.tipe = dataForm.value.tipe;
  // console.log(values);

  dataForm.value = {
    file: values.file,
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

const doCopyClipboard = (item) => {
  navigator.clipboard.writeText(item);
  Toast.babeng("Info", `${item} berhasil disalin`);
};
</script>
<template>
  <article class="prose lg:prose-sm">
    <h2>Edit Soal</h2>
  </article>
  <div v-if="dataForm.file">
    <iframe
      width="100%"
      height="900"
      :src="dataForm.file + '?hl=en_GB&amp;version=3&amp;rel=0'"
      :title="dataForm.pertanyaan"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>

    <!-- <object width="560" height="315">
                <param name="movie" value="//www.youtube.com/v/rsAFva9I7lk?hl=en_GB&amp;version=3&amp;rel=0"></param>
                <param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="//www.youtube.com/v/rsAFva9I7lk?hl=en_GB&amp;version=3&amp;rel=0" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object> -->
  </div>
  <!-- 
    <iframe width="1268" height="713" src="https://www.youtube.com/embed/_nwFNKTQIkY"
        title="Keanekaragaman budaya REV 2" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe> -->
  <div>
    <Form v-slot="{ errors }" @submit="onSubmit">
      <div class="py-2 lg:py-4 px-4">
        <div class="space-y-4">
          <div class="flex flex-col">
            <label
              >Link Embed :
              <code class="flex space-x-2"
                >https://www.youtube.com/embed/id
                <span
                  @click="doCopyClipboard('https://www.youtube.com/embed/')"
                  class="hover:text-primary cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </span>
              </code>
            </label>
            <div>
              <Field
                v-model="dataForm.file"
                name="file"
                type="text"
                class="input input-bordered w-11/12"
              />
              <div class="text-xs text-red-600 mt-1">
                {{ errors.file }}
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <label>Judul :</label>
            <div>
              <Field
                :rules="fnValidasi.validateData"
                v-model="dataForm.pertanyaan"
                name="pertanyaan"
                type="text"
                class="input input-bordered w-11/12"
              />
              <div class="text-xs text-red-600 mt-1">
                {{ errors.pertanyaan }}
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <label>Kode : </label>
            <div>
              <Field
                :rules="fnValidasi.validateData"
                v-model="dataForm.kode"
                name="kode"
                type="text"
                class="input input-bordered w-11/12"
              />
              <div class="text-xs text-red-600 mt-1">
                {{ errors.kode }}
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <label>Urutan : </label>
            <div>
              <Field
                :rules="fnValidasi.validateDataNumber"
                v-model="dataForm.urutan"
                name="urutan"
                type="text"
                class="input input-bordered w-11/12"
              />
              <div class="text-xs text-red-600 mt-1">
                {{ errors.urutan }}
              </div>
            </div>
          </div>
          <div>
            <label
              for="name"
              class="text-sm font-medium text-gray-900 block mb-2"
              >Tipe</label
            >
            <select
              class="select select-bordered w-full max-w-xs"
              v-model="dataForm.tipe"
            >
              <option disabled selected>Pilih Tipe ?</option>
              <option class="capitalize">Laki-laki</option>
              <option class="capitalize">Perempuan</option>
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

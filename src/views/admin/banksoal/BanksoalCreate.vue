<script setup>
import { ref } from "vue";
import Api from "@/axios/axios";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import ToolBar from "@/components/atoms/editor/ToolBar.vue";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
import Toast from "@/components/lib/Toast";
import ApiBanksoal from "@/services/api/apiBanksoal";
import { useRouter } from "vue-router";
const router = useRouter();
const storeAdminBar = useStoreAdminBar();
const storeBanksoal = useStoreBanksoal();
storeAdminBar.setPagesActive("banksoal");
storeBanksoal.setPagesActive("buatbaru");
const toolbar = ["bold", "italic", "underline"];
// const toolbarOptions = [['link', 'image'],
const toolbarOptions = [['image'],
["bold", "italic", "underline", "strike"], // toggled buttons
["blockquote", "code-block"],

[{ header: 1 }, { header: 2 }], // custom button values
[{ list: "ordered" }, { list: "bullet" }],
[{ script: "sub" }, { script: "super" }], // superscript/subscript
[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
[{ direction: "rtl" }], // text direction

[{ size: ["small", false, "large", "huge"] }], // custom dropdown
[{ header: [1, 2, 3, 4, 5, 6, false] }],

[{ color: [] }, { background: [] }], // dropdown with defaults from theme
[{ font: [] }],
[{ align: [] }],

["clean"], // remove formatting button
];

const editorPertanyaan = ref("<b>tes123</b>");

const pagesActive = ref("tulis");
const dataForm = ref({
  tipe: "Pilihan Ganda",
  // skor: 100,
  tingkatkesulitan: "Mudah",
  status: "Aktif",
  desc: "",
  pertanyaan: "",
  pilihanJawaban: [],
});

const dataPilihanJawaban = ref([
  {
    // id: 1,
    jawaban: null,
    // status: "Benar",
    skor: 1,
  },
  {
    // id: 2,
    jawaban: null,
    skor: 0,
  },
]);

const onSubmit = async (values) => {
  let doSubmit = 1;
  values.fileAudio = fileAudio.value ? fileAudio.value : null;
  // console.log(values.fileAudio, fileAudio.value);
  values.ujian_kategori_id = dataForm.value.ujian_kategori_id.id;
  values.pertanyaan = dataForm.value.pertanyaan;
  values.desc = dataForm.value.desc;
  values.pilihanJawaban = dataPilihanJawaban.value;
  dataPilihanJawaban.value.forEach((item, index) => {
    if (item.jawaban === null) {
      Toast.danger(
        "Info",
        `Jawaban ${fnCampur.fnNumberToAlphabet(index + 1)} harus diisi!`
      );
      doSubmit = 0;
      return false;
    }
    // if (item.status == null && item.status == "") {
    //   Toast.danger(
    //     "Info",
    //     `Status Jawaban  ${fnCampur.fnNumberToAlphabet(index + 1)} harus diisi!`
    //   );
    //   doSubmit = 0;
    //   return false;
    // }
    if (item.skor == null) {
      Toast.danger(
        "Info",
        `Skor Jawaban  ${fnCampur.fnNumberToAlphabet(index + 1)} harus diisi!`
      );
      doSubmit = 0;
      return false;
    }
  });
  // console.log(dataPilihanJawaban.value[0].jawaban);
  // console.log(dataForm.value.ujian_kategori_id);
  // console.log(values);
  // ----------------------------------------------------------------
  if (doSubmit > 0) {
    const resSubmit = await ApiBanksoal.doStoreData(values);
    if (resSubmit) {
      Toast.success("Info", "Data berhasil ditambahkan!");
      router.push({ name: "admin.banksoal" });
    }
  }
  // ----------------------------------------------------------------
};

const doTambahPilihanJawaban = () => {
  dataPilihanJawaban.value.push({
    // id: dataPilihanJawaban.value.length+1,
    jawaban: null,
    // status: "Salah",
    skor: 0,
  });
};

const doHapusPilihanJawaban = () => {
  dataPilihanJawaban.value.pop();
};

const dataKategori = ref([]);
let pilihKategori = ref([]);
// get Kelas
const getDataKategori = async () => {
  try {
    const response = await Api.get(`admin/menuujian/kategori`);
    // console.log(response);
    dataKategori.value = response.data;
    dataKategori.value.forEach((item) => {
      pilihKategori.value.push({
        label: item.nama,
        id: item.id,
      });
    });

    dataForm.value.ujian_kategori_id = {
      id: pilihKategori.value[0].id,
      label: pilihKategori.value[0].label,
    };
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataKategori();

let embedImgPertanyaan = ref(null);
const fileAudio = ref(null);
function handleImgPertanyaan(e) {
  let type = e.target.files[0].type;
  fileAudio.value = e.target.files[0];
  // console.log('====================================');
  // console.log(fileAudio.value);
  // console.log('====================================');
  if (type == "audio/wav" || type == "audio/mpeg" || type == "audio/ogg") {
    console.log("File " + type);

    embedImgPertanyaan.value = URL.createObjectURL(e.target.files[0]);
    console.log(embedImgPertanyaan.value, e.target.files[0].type);
  } else {
    Toast.danger("File harus audio (.mp3/.wav)");
  }
}
const doClearImgPertanyaan = () => {
  embedImgPertanyaan.value = null;
}
</script>
<template>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <div class="py-2 lg:py-4 px-4">
      <div class="space-y-4">
        <div class="flex flex-col">
          <label> Kategori : </label>
          <div>
            <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihKategori"
              v-model="dataForm.ujian_kategori_id" v-bind:class="{ disabled: false }"></v-select>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.select }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Tipe :
            <code class="text-red-500 text-sm font-semibold">Pilihan Ganda
            </code></label>
          <div>
            <Field :rules="fnValidasi.validateSelect" v-model="dataForm.tipe" name="tipe"
              class="select select-bordered w-11/12" as="select">
              <option selected>Pilihan Ganda</option>
            </Field>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.tipe }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Status : </label>
          <div>
            <Field :rules="fnValidasi.validateSelect" v-model="dataForm.status" name="status"
              class="select select-bordered w-11/12" as="select">
              <option selected value="Aktif">Aktif</option>
              <option value="Nonaktif">NonAktif</option>
              <!-- <option value="Draft">Draft</option> -->
            </Field>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.status }}
            </div>
          </div>
        </div>
        <!-- <div class="flex flex-col">
          <label
            >Skor :
            <code class="text-red-500 text-sm font-semibold"
              >Ex : 100/50/0</code
            ></label
          >
          <div>
            <Field
              :rules="fnValidasi.validateDataSkor"
              v-model="dataForm.skor"
              name="skor"
              type="text"
              max="100"
              min="0"
              class="input input-bordered w-11/12"
            />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.skor }}
            </div>
          </div>
        </div> -->
        <div class="flex flex-col">
          <label>Nomer Urut : </label>
          <div>
            <Field :rules="fnValidasi.validateDataNumber" v-model="dataForm.nomer_urut" name="nomer_urut" type="number"
              class="input input-bordered w-11/12" />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.nomer_urut }}
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
          <label>Deskribsi : </label>
          <div>
            <input v-model="dataForm.desc" name="desc" type="text" class="input input-bordered w-11/12" />
            <div class="text-xs text-red-600 mt-1">
              {{ errors.desc }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label>Tingkat Kesulitan : </label>

          <div>
            <Field :rules="fnValidasi.validateSelect" v-model="dataForm.tingkatkesulitan" name="tingkatkesulitan"
              class="select select-bordered w-11/12" as="select">
              <option value="Mudah" selected>Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </Field>

            <div class="text-xs text-red-600 mt-1">
              {{ errors.tingkatkesulitan }}
            </div>
          </div>
        </div>

        <div class="py-10 w-full bg-base-100 shadow-sm">
          <div class="tabs">
            <a class="tab tab-bordered" @click="pagesActive = 'tulis'"
              :class="{ 'tab-active': pagesActive == 'tulis' }">Tulis</a>
            <a class="tab tab-bordered" @click="pagesActive = 'preview'"
              :class="{ 'tab-active': pagesActive == 'preview' }">Preview</a>
          </div>
        </div>
        <div v-if="pagesActive == 'tulis'">
          <label>Pertanyaan :</label>
          <QuillEditor theme="snow" :toolbar="toolbarOptions" v-model:content="dataForm.pertanyaan" contentType="html"
            class="ql-editor2">
            <!-- <template #toolbar>
              <div id="my-toolbar">
                <ToolBar></ToolBar>
              </div>
              <div id="editor"></div>
            </template> -->
          </QuillEditor>
          <!-- <QuillEditor theme="snow" toolbar="#my-toolbar" v-model:content="dataForm.pertanyaan" contentType="html"
            class="ql-editor2">
            <template #toolbar>
              <div id="my-toolbar">
                <ToolBar></ToolBar>
              </div>
              <div id="editor"></div>
            </template>
          </QuillEditor> -->

          <!-- <QuillEditor theme="snow" :toolbar="toolbarOptions" v-model:content="dataPilihanJawaban[index].jawaban"
                contentType="html">
              </QuillEditor> -->
        </div>

        <div class="shadow-sm py-4 px-4 space-y-4" v-else>
          <label for="" class="underline">Preview : </label>
          <div class="w-full border-2 min-h-16 p-10" v-html="dataForm.pertanyaan"></div>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-2">
          <div class="px-4 py-2 font-semibold">Audio <code
              class="text-red-500 text-xs"> *) kosongkan jika tidak diperlukan</code></div>
          <div class="px-4 py-2">
            <input @change="handleImgPertanyaan($event)" type="file" />
            <button class="btn btn-danger" @click="doClearImgPertanyaan">Clear</button>
          </div>
        </div>
        <div class="grid grid-cols-1">
          <!-- <div class="px-4 py-2 font-semibold">Preview </div> -->
          <!-- <div class="avatar">
            <div class="w-48 rounded">
              <img :src="embedImgPertanyaan" v-if="embedImgPertanyaan" class="" />
              <div class="shadow shadow-lg h-48" id="previewpdf" v-else />
            </div>
          </div> -->
        </div>
      </div>
      <!-- Pilihan Jawaban -->

      <div v-for="(item, index) in dataPilihanJawaban" :key="index">
        <div class="py-10 px-4 space-y-4">
          <div class="space-y-4 shadow-lg">
            <div class="py-4 px-4">
              <label for="">Pilihan Jawaban {{ fnCampur.fnNumberToAlphabet(index + 1) }} :
              </label>

              <QuillEditor theme="snow" :toolbar="toolbarOptions" v-model:content="dataPilihanJawaban[index].jawaban"
                contentType="html">
              </QuillEditor>
            </div>
            <div class="space-y-4 py-4 px-4">
              <!-- <div class="flex flex-col">
                <label
                  >Status Jawaban :
                  <code class="text-red-500 text-sm font-semibold"
                    >{{ dataPilihanJawaban[index].status }}
                  </code></label
                >
                <div>
                  <Field
                    v-model="dataPilihanJawaban[index].status"
                    :name="dataPilihanJawaban + '[' + index + ']'"
                    class="select select-bordered w-11/12"
                    as="select"
                  >
                    <option value="Salah">Salah</option>
                    <option value="Benar">Benar</option>
                  </Field>
                </div>
              </div> -->
              <div class="flex flex-col">
                <label>Skor :
                  <code class="text-red-500 text-sm font-semibold">{{ dataPilihanJawaban[index].skor }}
                  </code></label>
                <div>
                  <input :rules="fnValidasi.validateDataSkor" v-model="dataPilihanJawaban[index].skor"
                    :name="dataPilihanJawaban + '[' + index + ']'" type="number" max="100"
                    class="input input-bordered w-11/12" />
                  <!-- <div class="text-xs text-red-600 mt-1">
                      {{ errors.dataPilihanJawabanSkor + "[" + index + "]" }}
                    </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pilihan Jawaban -->
      <div class="px-4">
        <div class="space-x-2">
          <span class="btn btn-danger btn-sm btn-outline" @click="doHapusPilihanJawaban()">
            Hapus
          </span>
          <span class="btn btn-primary btn-sm btn-outline" @click="doTambahPilihanJawaban()">
            Tambah
          </span>
        </div>
      </div>

      <div class="w-full flex justify-end py-10 px-10 gap-4">
        <!-- <button class="btn btn-warning">Draft</button> -->
        <button class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </Form>
</template>

<style>
.ql-editor {
  min-height: 50px;
}

.ql-editor2 {
  min-height: 200px;
}
</style>

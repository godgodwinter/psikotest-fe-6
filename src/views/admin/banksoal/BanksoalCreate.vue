<script setup>
import { ref } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "../../../stores/data/banksoal";
const storeAdminBar = useStoreAdminBar();
const storeBanksoal = useStoreBanksoal();
storeAdminBar.setPagesActive("banksoal");
storeBanksoal.setPagesActive("buatbaru");
const toolbar = ["bold", "italic", "underline"];
const toolbarOptions = [
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
</script>
<template>
  <div class="py-2 lg:py-4 px-4">
    <div class="space-y-4">
      <div class="flex flex-col">
        <label
          >Tipe :
          <code class="text-red-500 text-sm font-semibold"
            >Pilihan Ganda | TrueFalse</code
          ></label
        >
        <div>
          <select class="select select-bordered w-full max-w-lg">
            <option selected>Pilihan Ganda</option>
            <option>TrueFalse</option>
          </select>
        </div>
      </div>
      <div class="flex flex-col">
        <label
          >Skor :
          <code class="text-red-500 text-sm font-semibold"
            >100/50/0</code
          ></label
        >
        <div>
          <select class="select select-bordered w-full max-w-lg">
            <option selected>100</option>
            <option>50</option>
            <option>0</option>
          </select>
        </div>
      </div>
      <div class="flex flex-col">
        <label>Tingkat Kesulitan : </label>
        <div>
          <select class="select select-bordered w-full max-w-lg">
            <option selected>Mudah</option>
            <option>Sedang</option>
            <option>Sulit</option>
          </select>
        </div>
      </div>

      <div class="py-10 w-full bg-base-100 shadow-sm">
        <div class="tabs">
          <a
            class="tab tab-bordered"
            @click="pagesActive = 'tulis'"
            :class="{ 'tab-active': pagesActive == 'tulis' }"
            >Tulis</a
          >
          <a
            class="tab tab-bordered"
            @click="pagesActive = 'preview'"
            :class="{ 'tab-active': pagesActive == 'preview' }"
            >Preview</a
          >
        </div>
      </div>
      <div v-if="pagesActive == 'tulis'">
        <label>Pertanyaan :</label>
        <QuillEditor
          theme="snow"
          toolbar="#my-toolbar"
          v-model:content="editorPertanyaan"
          contentType="html"
        >
          <template #toolbar>
            <div id="my-toolbar">
              <!-- <select class="ql-align"></select> -->
              <button class="ql-align"></button>
              <button class="ql-align" value="center"></button>
              <button class="ql-align" value="right"></button>

              <button class="ql-align" value="justify"></button>
              <button class="ql-bold"></button>
              <button class="ql-italic"></button>
              <button class="ql-underline"></button>
              <!-- <button class="ql-strike"></button> -->
              <!-- Add font size dropdown -->
              <select class="ql-size">
                <option value="small"></option>
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                <option selected></option>
                <option value="large"></option>
                <option value="huge"></option>
              </select>
              <!-- Add a bold button -->
              <button class="ql-bold"></button>
              <!-- Add subscript and superscript buttons -->
              <button class="ql-script" value="sub"></button>
              <button class="ql-script" value="super"></button>
              <!-- But you can also add your own -->
              <!-- <button id="custom-button">tes</button> -->
            </div>
            <div id="editor"></div>
          </template>
        </QuillEditor>
      </div>
      <div class="shadow-sm py-10 px-10 space-y-4" v-else>
        <label for="" class="underline">Preview : </label>

        <div
          class="w-full border-2 min-h-16 p-10"
          v-html="editorPertanyaan"
        ></div>
      </div>
    </div>

    <div class="py-10 px-4">
      <label for="">Gambar</label>
      <input type="file" class="input w-full" />
    </div>

    <!-- Pilihan Jawaban -->
    <div class="py-10 px-4 space-y-4">
      <div class="space-y-4 shadow-lg">
        <div class="py-4 px-4">
          <label for="">Jawaban 1 : </label>

          <QuillEditor theme="snow" toolbar="#my-toolbar1">
            <template #toolbar>
              <div id="my-toolbar1">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <select class="ql-align"></select>
                <!-- Add font size dropdown -->
                <select class="ql-size">
                  <option value="small"></option>
                  <!-- Note a missing, thus falsy value, is used to reset to default -->
                  <option selected></option>
                  <option value="large"></option>
                  <option value="huge"></option>
                </select>
                <!-- Add a bold button -->
                <button class="ql-bold"></button>
                <!-- Add subscript and superscript buttons -->
                <button class="ql-script" value="sub"></button>
                <button class="ql-script" value="super"></button>
                <!-- But you can also add your own -->
                <!-- <button id="custom-button">tes</button> -->
              </div>
            </template>
          </QuillEditor>
        </div>
        <div class="space-y-4 py-4 px-4">
          <div class="flex flex-col">
            <label
              >Status Jawaban :
              <code class="text-red-500 text-sm font-semibold"
                >Benar / Salah
              </code></label
            >
            <div>
              <select class="select select-bordered w-full max-w-xs">
                <option selected>Benar</option>
                <option>50</option>
                <option>0</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4 shadow-lg">
        <div class="py-4 px-4">
          <label for="">Jawaban 2 : </label>

          <QuillEditor theme="snow" toolbar="#my-toolbar2">
            <template #toolbar>
              <div id="my-toolbar2">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <select class="ql-align"></select>
                <!-- Add font size dropdown -->
                <select class="ql-size">
                  <option value="small"></option>
                  <!-- Note a missing, thus falsy value, is used to reset to default -->
                  <option selected></option>
                  <option value="large"></option>
                  <option value="huge"></option>
                </select>
                <!-- Add a bold button -->
                <button class="ql-bold"></button>
                <!-- Add subscript and superscript buttons -->
                <button class="ql-script" value="sub"></button>
                <button class="ql-script" value="super"></button>
                <!-- But you can also add your own -->
                <!-- <button id="custom-button">tes</button> -->
              </div>
            </template>
          </QuillEditor>
        </div>
        <div class="space-y-4 py-4 px-4">
          <label for="">Status :</label>
          <label for="">Benar / Slah</label>
        </div>
      </div>
    </div>
    <!-- Pilihan Jawaban -->

    <div class="w-full flex justify-end py-10 px-10 gap-4">
      <button class="btn btn-warning">Draft</button>
      <button class="btn btn-primary">Simpan</button>
    </div>
  </div>
</template>

<style>
.ql-editor {
  min-height: 200px;
}
</style>

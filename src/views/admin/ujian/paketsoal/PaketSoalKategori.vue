<script setup>
import TabLinkPaketSoal from "./TabLinkPaketSoal.vue";
import { ref } from "vue";
import Api from "@/axios/axios";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import ToolBar from "@/components/atoms/editor/ToolBar.vue";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import fnCampur from "@/components/lib/FungsiCampur";
import Toast from "@/components/lib/Toast";

const dataForm = ref({
  ujian_kategori_id: "",
  nama: "",
});
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

const onSubmit = async (values) => {
  console.log(values);
  // const resSubmit = await ApiBanksoal.doStoreData(values);
  // if (resSubmit) {
  //   Toast.success("Info", "Data berhasil ditambahkan!");
  //   // router.push({ name: "AdminKategori" });
  // }
};
</script>
<template>
  <TabLinkPaketSoal />
  <div class="py-2 lg:py-4 px-4">List Kategori Soal => DESC TGL CREATE</div>
</template>

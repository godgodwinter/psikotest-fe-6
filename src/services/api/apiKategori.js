import Api from "@/axios/axios";
import { useStoreKategori } from "@/stores/data/kategori";
import { computed } from "vue";
const storeKategori = useStoreKategori();

const dataAsli = computed(() => storeKategori.getData);

const getData = async () => {
  try {
    const response = await Api.get(`admin/menuujian/kategori`);
    let res = response.data;
    storeKategori.setData(res);
    // console.log(res);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const doStoreData = async (data) => {
  let dataForm = {
    nama: data.nama,
    prefix: "banksoal",
  };
  try {
    const response = await Api.post(`admin/menuujian/kategori`, dataForm);
    data.id = response.id;
    dataAsli.value.push(data);

    // getData()
    // console.log(dataAsli.value);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const getDataId = async (id) => {
  try {
    if (dataAsli.value.length < 1) {
      await getData();
    }
    const response = await Api.get(`admin/menuujian/kategori/${id}`);
    let res = response.data;
    // let res = dataAsli.value.filter((item) => item.id == id);
    // console.log(res.id, dataAsli.value, id);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const doUpdate = async (id, data) => {
  let dataForm = {
    nama: data.nama,
    prefix: "banksoal",
  };
  try {
    if (dataAsli.value.length < 1) {
      await getData();
    }
    // eslint-disable-next-line no-unused-vars
    const response = await Api.put(`admin/menuujian/kategori/${id}`, dataForm);
    // update data
    let dataUpdate = dataAsli.value.filter((item) => item.id == id);
    dataUpdate[0].nama = data.nama;
    dataUpdate[0].jenis = data.jenis;
    storeKategori.setData(dataAsli.value);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await Api.delete(`admin/menuujian/kategori/${id}`);
    let data = dataAsli.value.filter((item) => item.id !== id);
    storeKategori.setData(data);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const ApiKategori = {
  getData,
  deleteData,
  getDataId,
  doUpdate,
  doStoreData,
};
export default ApiKategori;

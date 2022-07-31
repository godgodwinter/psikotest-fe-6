import Api from "@/axios/axios";
import { useStoreUjian } from "@/stores/data/ujian";
import { computed } from "vue";
const storeUjian = useStoreUjian();

const dataAsli = computed(() => storeUjian.getData);

const getData = async () => {
  try {
    const response = await Api.get(`admin/menuujian/paketsoal`);
    let res = response.data;
    storeUjian.setDataPaketsoal(res);
    // console.log(res);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const doStoreData = async (data) => {
  let dataForm = {
    nama: data.nama,
    prefix: data.prefix,
    users_id: 1,
    users_tipe: "owner",
  };
  // console.log(dataForm);
  try {
    const response = await Api.post(`admin/menuujian/paketsoal`, dataForm);
    // console.log(response);
    getData();
    // data.id = response.id;
    // dataAsli.value.push(data);

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
    const response = await Api.get(`admin/menuujian/paketsoal/${id}`);
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
    jenis: data.jenis,
  };
  try {
    if (dataAsli.value.length < 1) {
      await getData();
    }
    // eslint-disable-next-line no-unused-vars
    const response = await Api.put(`admin/menuujian/paketsoal/${id}`, dataForm);
    // update data
    let dataUpdate = dataAsli.value.filter((item) => item.id == id);
    dataUpdate[0].nama = data.nama;
    dataUpdate[0].jenis = data.jenis;
    storeUjian.setDataPaketsoal(dataAsli.value);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await Api.delete(`admin/menuujian/paketsoal/${id}`);
    // let data = dataAsli.value.filter((item) => item.id !== id);
    // storeUjian.setDataPaketsoal(data);
    getData();
    return true;
  } catch (error) {
    console.error(error);
  }
};

const ApiUjian = {
  getData,
  deleteData,
  getDataId,
  doUpdate,
  doStoreData,
};
export default ApiUjian;

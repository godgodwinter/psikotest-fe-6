import Api from "@/axios/axios";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import { computed } from "vue";
const storeBanksoal = useStoreBanksoal();

const dataAsli = computed(() => storeBanksoal.getData);

const getData = async () => {
  try {
    const response = await Api.get(`admin/banksoal`);
    let res = response.data;
    storeBanksoal.setData(res);
    // console.log(res);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const doStoreData = async (data) => {
  let dataForm = {
    tipe: data.tipe,
    skor: data.skor,
    tingkatkesulitan: data.tingkatkesulitan,
    pertanyaan: data.pertanyaan,
    // pilihanJawaban: data.pilihanJawaban,
    pilihanJawaban: JSON.stringify(data.pilihanJawaban),
  };
  // console.log(dataForm);
  try {
    const response = await Api.post(`admin/menuujian/banksoal`, dataForm);
    console.log(response);
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
    const response = await Api.get(`admin/banksoal/${id}`);
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
    const response = await Api.put(`admin/banksoal/${id}`, dataForm);
    // update data
    let dataUpdate = dataAsli.value.filter((item) => item.id == id);
    dataUpdate[0].nama = data.nama;
    dataUpdate[0].jenis = data.jenis;
    storeBanksoal.setData(dataAsli.value);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await Api.delete(`admin/banksoal/${id}`);
    let data = dataAsli.value.filter((item) => item.id !== id);
    storeBanksoal.setData(data);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const ApiBanksoal = {
  getData,
  deleteData,
  getDataId,
  doUpdate,
  doStoreData,
};
export default ApiBanksoal;

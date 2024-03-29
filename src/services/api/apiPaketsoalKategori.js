import Api from "@/axios/axios";
import { useStoreUjian } from "@/stores/data/ujian";
import { computed } from "vue";
const storeUjian = useStoreUjian();

const dataAsli = computed(() => storeUjian.getData);
const dataAsliDetail = computed(() => storeUjian.dataPaketsoalKategoriDetail);

const getData = async (id) => {
  try {
    const response = await Api.get(
      `admin/menuujian/menupaketsoal/${id}/kategori`
    );
    let res = response.data;
    storeUjian.setDataPaketsoalKategori(res);
    // console.log(res);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const doStoreData = async (id, data) => {
  let dataForm = {
    ujian_kategori_id: data.ujian_kategori_id,
    nama: data.nama,
    waktu: data.waktu,
    instruksi: data.instruksi,
    instruksi_status: data.instruksi_status,
    lembar_prasoal: data.lembar_prasoal,
    random_soal: data.random_soal,
    random_pilihanjawaban: data.random_pilihanjawaban,
    lembar_prasoal_status: data.lembar_prasoal_status,
    instruksi_pengerjaan: data.instruksi_pengerjaan,
    instruksi_pengerjaan_status: data.instruksi_pengerjaan_status,
  };
  // console.log(id, dataForm);
  try {
    const response = await Api.post(
      `admin/menuujian/menupaketsoal/${id}/kategori`,
      dataForm
    );
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

const doUpdate = async (paketsoal_id, kategori_id, data) => {
  let dataForm = {
    ujian_kategori_id: data.ujian_kategori_id,
    nama: data.nama,
    waktu: data.waktu,
    instruksi: data.instruksi,
    instruksi_status: data.instruksi_status,
    lembar_prasoal: data.lembar_prasoal,
    random_soal: data.random_soal,
    random_pilihanjawaban: data.random_pilihanjawaban,
    lembar_prasoal_status: data.lembar_prasoal_status,
    instruksi_pengerjaan: data.instruksi_pengerjaan,
    instruksi_pengerjaan_status: data.instruksi_pengerjaan_status,
  };
  try {
    const response = await Api.put(
      `admin/menuujian/menupaketsoal/${paketsoal_id}/kategori/${kategori_id}`,
      dataForm
    );
    // eslint-disable-next-line no-unused-vars
    // const response = await Api.put(`admin/menuujian/paketsoal/${id}`, dataForm);
    // // update data
    // let dataUpdate = dataAsli.value.filter((item) => item.id == id);
    // dataUpdate[0].nama = data.nama;
    // dataUpdate[0].jenis = data.jenis;
    // storeUjian.setDataPaketsoal(dataAsli.value);
    getData(paketsoal_id);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (paketsoal_id, kategori_id) => {
  try {
    // console.log(paketsoal_id, id);
    // eslint-disable-next-line no-unused-vars
    const response = await Api.delete(
      `admin/menuujian/menupaketsoal/${paketsoal_id}/kategori/${kategori_id}`
    );
    // let data = dataAsli.value.filter((item) => item.id !== id);
    // storeUjian.setDataPaketsoal(data);
    getData(paketsoal_id);
    return true;
  } catch (error) {
    console.error(error);
  }
};

// with soal
const getDataId = async (paketsoal_id, kategori_id) => {
  try {
    // if (dataAsli.value.length < 1) {
    //   await getData();
    // }
    const response = await Api.get(
      `admin/menuujian/menupaketsoal/${paketsoal_id}/kategori/${kategori_id}`
    );
    let res = response.data;
    storeUjian.setDataPaketsoalKategoriDetail(res);
    // let res = dataAsli.value.filter((item) => item.id == id);
    // console.log(res.id, dataAsli.value, id);
    return res;
  } catch (error) {
    console.error(error);
  }
};
const deleteDataSoal = async (id, kategori_id) => {
  try {
    // console.log(paketsoal_id, id);
    // eslint-disable-next-line no-unused-vars
    const response = await Api.delete(
      `admin/menuujian/menupaketsoal/menukategori/soal/${id}`
    );
    // let data = dataAsli.value.filter((item) => item.id !== id);
    // storeUjian.setDataPaketsoal(data);
    getDataId(kategori_id);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const doStoreDataSoal = async (paketsoal_kategori_id, data) => {
  let dataForm = {
    listId: data,
  };
  //
  console.log(paketsoal_kategori_id, JSON.stringify(dataForm), dataForm);
  try {
    const response = await Api.post(
      `admin/menuujian/menupaketsoal/soal/${paketsoal_kategori_id}`,
      dataForm
    );
    // console.log(response);
    // data.id = response.id;
    // dataAsli.value.push(data);

    // getData()
    // console.log(dataAsli.value);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const ApiUjian = {
  getData,
  deleteData,
  doUpdate,
  doStoreData,
  getDataId,
  deleteDataSoal,
  doStoreDataSoal,
};
export default ApiUjian;

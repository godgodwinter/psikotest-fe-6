import Api from "@/axios/axios";
import { useStoreBanksoal } from "@/stores/data/banksoal";
import { computed } from "vue";
const storeBanksoal = useStoreBanksoal();

const dataAsli = computed(() => storeBanksoal.getData);

const getData = async () => {
  try {
    const response = await Api.get(`admin/menuujian/banksoal`);
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
    ujian_kategori_id: data.ujian_kategori_id,
    tipe: data.tipe,
    status: data.status,
    nomer_urut: data.nomer_urut,
    desc: data.desc,
    kode: data.kode,
    // skor: data.skor,
    tingkatkesulitan: data.tingkatkesulitan,
    pertanyaan: data.pertanyaan,
    // pilihanJawaban: data.pilihanJawaban,
    pilihanJawaban: JSON.stringify(data.pilihanJawaban),
    // fileAudio: data.fileAudio,
  };
  // console.log(dataForm.pertanyaan);
  // console.log(dataForm.fileAudio);
  try {
    // // console.log(data.imgPertanyaan);
    const response = await Api.post(`admin/menuujian/banksoal`, dataForm);
    // console.log(response);
    // get Id--kodes_soal then submit img Pertanyaan
    if (data.fileAudio) {
      let formData = new FormData();
      formData.append("file", data.fileAudio);
      formData.append("kode_soal", response.kode_soal);
      // console.log(formData, data.fileAudio);
      const resUpload = await Api.post(`admin/menuujian/banksoal/upload/pertanyaan`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(resUpload);
    }
    // // console.log(data.imgPertanyaan);
    // // data.id = response.id;
    // // dataAsli.value.push(data);

    // // getData()
    // // console.log(dataAsli.value);

    // return false;
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
    const response = await Api.get(`admin/menuujian/banksoal/${id}`);
    let res = response.data;
    // let res = dataAsli.value.filter((item) => item.id == id);
    // console.log(res.id, dataAsli.value, id);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const doUpdate = async (id, data,updateRelasi) => {
  console.log(updateRelasi);
  let dataForm = {
    updateRelasi:updateRelasi,
    ujian_kategori_id: data.ujian_kategori_id,
    tipe: data.tipe,
    status: data.status,
    nomer_urut: data.nomer_urut,
    desc: data.desc,
    kode: data.kode,
    // skor: data.skor,
    tingkatkesulitan: data.tingkatkesulitan,
    pertanyaan: data.pertanyaan,
    // pilihanJawaban: data.pilihanJawaban,
    pilihanJawaban: JSON.stringify(data.pilihanJawaban),
  };
  // console.log('====================================');
  // console.log(dataForm.pilihanJawaban);
  // console.log('====================================');
  try {
    if (dataAsli.value.length < 1) {
      await getData();
    }
    // eslint-disable-next-line no-unused-vars
    const response = await Api.put(`admin/menuujian/banksoal/${id}`, dataForm);
    // update data
    // let dataUpdate = dataAsli.value.filter((item) => item.id == id);
    // dataUpdate[0].nama = data.nama;
    // dataUpdate[0].jenis = data.jenis;
    // storeBanksoal.setData(dataAsli.value);
    // console.log(response);
    console.log(response);
    // get Id--kodes_soal then submit img Pertanyaan
    if (data.fileAudio) {
      let formData = new FormData();
      formData.append("file", data.fileAudio);
      formData.append("kode_soal", response.kode_soal);
      console.log(formData, data.fileAudio);
      const resUpload = await Api.post(`admin/menuujian/banksoal/upload/pertanyaan`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(resUpload);
    }
    // getData();
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await Api.delete(`admin/menuujian/banksoal/${id}`);
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

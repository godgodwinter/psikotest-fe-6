import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Api from "@/axios/axios";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
// In Setup Stores:

// ref()s become state properties
// computed()s become getters
// function()s become actions


export const useSkolastikStore = defineStore('skolastikStore', () => {
  // PAKET
  // State
  const paketTerpilih = ref({
    id: null,
    label: null
  })
  // Getter Setter
  const getPaketTerpilih = computed(() => paketTerpilih.value);
  const setPaketTerpilih = (id, label) => {
    paketTerpilih.value.id = id;
    paketTerpilih.value.label = label;
  }

  //BATAS TGL PENGERJAAN
  const tglBatasPengerjaan = ref(moment().add(1, 'days').format('YYYY-MM-DD h:mm:ss'));
  const getTglBatasPengerjaan = computed(() => tglBatasPengerjaan.value);
  const setTglBatasPengerjaan = (tgl) => {
    let tglSave = moment(tgl).format('YYYY-MM-DD h:mm:ss');
    tglBatasPengerjaan.value = tglSave;
  };


  // firstLoad fn
  const getDataPaket = async () => {
    try {
      const response = await Api.get(`admin/ujian/skolastik/paketsoal`);
      paketTerpilih.value.id = response.data[0].id;
      paketTerpilih.value.label = response.data[0].nama;
      // console.log(paketTerpilih.value);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  if (paketTerpilih.value.id === null) {
    getDataPaket();
  }


  return { paketTerpilih, getPaketTerpilih, setPaketTerpilih, tglBatasPengerjaan, getTglBatasPengerjaan, setTglBatasPengerjaan }
})

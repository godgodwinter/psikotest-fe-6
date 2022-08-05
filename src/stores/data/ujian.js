import { defineStore } from "pinia";

export const useStoreUjian = defineStore({
  id: "storeUjian",
  state: () => ({
    data: [],
    dataPaketsoal: [],
    dataPaketsoalKategori: [],
    dataPaketsoalKategoriDetail: [],
    pagesActive: "",
  }),
  getters: {
    getData: (state) => state.data,
    getDataPaketsoal: (state) => state.dataPaketsoal,
    getDataPaketsoalKategori: (state) => state.dataPaketsoalKategori,
    getDataPaketsoalKategoriDetail: (state) =>
      state.dataPaketsoalKategoriDetail,
    getPagesActive: (state) => state.pagesActive,
  },
  actions: {
    setData(data) {
      this.data = data;
    },
    setDataPaketsoal(dataPaketsoal) {
      this.dataPaketsoal = dataPaketsoal;
    },
    setDataPaketsoalKategori(dataPaketsoalKategori) {
      this.dataPaketsoalKategori = dataPaketsoalKategori;
    },
    setDataPaketsoalKategoriDetail(dataPaketsoalKategoriDetail) {
      this.dataPaketsoalKategoriDetail = dataPaketsoalKategoriDetail;
    },
    setPagesActive(pages) {
      this.pagesActive = pages;
    },
  },
});

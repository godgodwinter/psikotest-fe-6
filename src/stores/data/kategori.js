import { defineStore } from "pinia";

export const useStoreKategori = defineStore({
  id: "storeKategori",
  state: () => ({
    data: [],
    pagesActive: "soal",
  }),
  getters: {
    getData: (state) => state.data,
    getPagesActive: (state) => state.pagesActive,
  },
  actions: {
    setData(data) {
      this.data = data;
    },
    setPagesActive(pages) {
      this.pagesActive = pages;
    },
  },
});

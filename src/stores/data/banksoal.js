import { defineStore } from "pinia";

export const useStoreBanksoal = defineStore({
  id: "storeBanksoal",
  state: () => ({
    data: [],
    pagesActive: "",
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

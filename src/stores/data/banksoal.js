import { defineStore } from "pinia";

export const useStoreBanksoal = defineStore({
  id: "storeBanksoal",
  state: () => ({
    data: [],
  }),
  getters: {
    getData: (state) => state.data,
  },
  actions: {
    setData(data) {
      this.data = data;
    },
  },
});

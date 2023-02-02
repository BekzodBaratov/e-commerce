import { defineStore } from "pinia"

export const useProductStore = defineStore("product", {
  state: () => ({
    count: 0,
  }),
})

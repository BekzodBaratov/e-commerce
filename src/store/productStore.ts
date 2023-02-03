import { defineStore } from "pinia"

export const useProductStore = defineStore("product", {
  state: () => ({
    cart: [
      // {id:'54', count:2}
    ],
  }),
})

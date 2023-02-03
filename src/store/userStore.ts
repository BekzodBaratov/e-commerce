import { ref, watch, computed, reactive } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {
  const state = ref({
    userId: null as null | number,
    access_token: "" as string,
  })

  if (localStorage.getItem("state")) {
    state.value = JSON.parse(localStorage.getItem("state") as any)
  }
  watch(
    state,
    (userVal) => {
      localStorage.setItem("state", JSON.stringify(userVal))
    },
    { deep: true }
  )

  const isRegisteration = computed(() => {
    return state.value.userId !== null
  })
  function logout() {
    state.value.userId = null
    localStorage.removeItem("state")
  }
  function login(id: number, token: string) {
    state.value.userId = id
    state.value.access_token = token
  }
  function userId() {
    return state.value.userId
  }
  function userToken() {
    return state.value.access_token
  }

  return { isRegisteration, logout, login, userId, userToken }
})

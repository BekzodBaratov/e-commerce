import { ref, watch, computed, reactive } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"

export const useUserStore = defineStore("user", () => {
  const router = useRouter()
  const state = ref({
    userId: null as null | number,
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
    router.push("/")
  }
  function login(id: number) {
    state.value.userId = id
  }
  return { isRegisteration, logout, login }
})

<template>
  <div class="fixed z-[999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="loginModalbg shadow-md px-8 py-16 text-[#F4F6F9] text-lg">
      <div class="flex flex-col gap-6">
        <form class="flex flex-col gap-6">
          <div class="flex flex-col">
            <div class="mb-4 flex flex-col">
              <p>Username</p>
              <input class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]" type="email" v-model="state.username" name="email" id="email" placeholder="kminchelle" />
              <span class="text-sm text-end text-red-600" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col">
              <p>Your password</p>
              <input class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]" type="password" v-model="state.password" name="password" id="password" placeholder="Пароль" />
              <span class="text-sm text-end text-red-600" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
            </div>
          </div>
          <div class="flex justify-between items-end">
            <button type="submit" @click.prevent="formLoginData">
              <ButtonFillVue>
                <span class="py-1 px-4">Вход</span>
              </ButtonFillVue>
            </button>
            <RouterLink to="/register" class="underline hover:no-underline active:no-underline cursor-pointer">Регистрация</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
  <LoadingModalVue v-if="loading" />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import { required, minLength, maxLength } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { publicApi } from "@/plugins/axios"
import { useToast } from "vue-toastification"
import { useRouter } from "vue-router"

import ButtonFillVue from "@/components/buttons/ButtonFill.vue"
import LoadingModalVue from "@/components/LoadingModal.vue"
import { useUserStore } from "@/store/userStore"

const store = useUserStore()
const toast = useToast()
const router = useRouter()

const loading = ref(false)

const state = reactive({
  username: "",
  password: "",
})
const rules = computed(() => {
  return {
    username: { required, maxLength: maxLength(255) },
    password: { required, minLength: minLength(4), maxLength: maxLength(32) },
  }
})
const v$ = useVuelidate(rules, state)

const formLoginData = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    loading.value = true
    fetchApi(state)
  }
}
const fetchApi = (data: any) => {
  publicApi({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: "auth/login",
    data: data,
  })
    .then(function (response: any) {
      toast.success("You successfully logged in")
      store.login(response.data.id)
      router.push("/")
    })
    .catch(function (error: any) {
      toast.info(error.message + ", Please try again")
      state.username = ""
      state.password = ""
    })
    .finally(function () {
      loading.value = false
    })
}
</script>

<style>
.loginModalbg {
  background: linear-gradient(180deg, rgba(79, 135, 211, 0.95) 0%, rgba(32, 95, 184, 0.95) 100%);
  border: 3px solid #f4f6f9;
  border-radius: 33px;
}
</style>

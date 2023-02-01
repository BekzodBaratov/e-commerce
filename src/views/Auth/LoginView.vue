<template>
  <div class="fixed z-[999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="loginModalbg shadow-md px-8 py-16 text-[#F4F6F9] text-lg">
      <div class="flex flex-col gap-6">
        <form class="flex flex-col gap-6">
          <div class="flex flex-col">
            <div class="mb-4 flex flex-col">
              <p>Username</p>
              <input class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]" type="email" v-model="state.username" name="email" id="email" placeholder="john@gmail.com" />
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
import { required, minLength, helpers, maxLength } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { publicApi } from "@/plugins/axios"

import ButtonFillVue from "@/components/buttons/ButtonFill.vue"
import LoadingModalVue from "@/components/LoadingModal.vue"
// import { useUserRegister } from "@/store/UserRegister"

// const store = useUserRegister()

const loading = ref(false)

const state = reactive({
  username: "",
  password: "",
})
const rules = computed(() => {
  return {
    username: { required, maxLength: maxLength(255) },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(32),
      containsUppercase: helpers.withMessage("The password requires an uppercase character", function (value) {
        return /[A-Z]/.test(value as string)
      }),
      containsLowercase: helpers.withMessage("The password requires an lowercase character", function (value) {
        return /[a-z]/.test(value as string)
      }),
      containsNumber: helpers.withMessage("The password requires an number character", function (value) {
        return /[0-9]/.test(value as string)
      }),
      containsSpecial: helpers.withMessage("The password requires an special character", function (value) {
        return /[#?!_@$%^&*.-]/.test(value as string)
      }),
    },
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
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      // expiresInMins: 60, // optional
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => console.log("end"))

  // publicApi({
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   url: "auth/login",
  //   // withCredentials: true,
  //   data: data,
  // })
  //   .then(function (response: any) {
  //     alert(response.data.message)
  //     console.log(response)
  //   })
  //   .catch(function (error: any) {
  //     alert(error.message + ", Please try again")
  //     console.log(error)
  //     state.username = ""
  //     state.password = ""
  //   })
  //   .finally(function () {
  //     loading.value = false
  //   })
}
</script>

<style>
.loginModalbg {
  background: linear-gradient(180deg, rgba(79, 135, 211, 0.95) 0%, rgba(32, 95, 184, 0.95) 100%);
  border: 3px solid #f4f6f9;
  border-radius: 33px;
}
</style>

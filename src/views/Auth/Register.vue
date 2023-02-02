<template>
  <div class="fixed z-[999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
    <div class="loginModalbg shadow-md py-12 px-12 text-[#F4F6F9] text-lg">
      <div class="flex flex-col gap-6">
        <form class="flex flex-col gap-2 mb-8">
          <div class="name flex flex-col gap-0">
            <label for="username text-sm">First Name:</label>
            <input class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#f4f6f927]" type="text" v-model="userData.firstName" name="username" id="username" placeholder="John" />
            <p v-if="v$.firstName.$error" class="text-sm text-end text-red-600">{{ v$.firstName.$errors[0].$message }}*</p>
          </div>
          <div class="name flex flex-col gap-0">
            <label for="username text-sm">Last Name:</label>
            <input class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#f4f6f927]" type="text" v-model="userData.lastName" name="username" id="username" placeholder="Doe" />
            <p v-if="v$.lastName.$error" class="text-sm text-end text-red-600">{{ v$.lastName.$errors[0].$message }}*</p>
          </div>

          <div class="flex justify-center mt-3">
            <ButtonFillVue>
              <button @click.prevent="handleRegister" class="py-1 px-4">Далее</button>
            </ButtonFillVue>
          </div>
        </form>
      </div>
    </div>
  </div>
  <LoadingModalVue v-if="loading" />
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import axios from "axios"
import { useVuelidate } from "@vuelidate/core"
import { required, minLength, maxLength } from "@vuelidate/validators"

// import { useUserRegister } from "../../store/UserRegister"
import ButtonFillVue from "@/components/buttons/ButtonFill.vue"
import LoadingModalVue from "@/components/LoadingModal.vue"
import { publicApi } from "@/plugins/axios"

// const store = useUserRegister()

const loading = ref(false)

interface UserData {
  firstName: string
  lastName: string
}
const userData = reactive<UserData>({
  firstName: "",
  lastName: "",
})

const rules = computed(() => {
  return {
    firstName: { required, minLength: minLength(3), maxLength: maxLength(255) },
    lastName: { required, minLength: minLength(3), maxLength: maxLength(255) },
  }
})

const v$ = useVuelidate(rules, userData)

const handleRegister = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    fetchApi(userData)
    loading.value = true
  }
}

const fetchApi = (data: any) => {
  publicApi({
    method: "POST",
    url: "users/add",
    withCredentials: true,
    data: data,
  })
    .then(function (response) {
      // store.user = response.data.data.user
      alert(response.data.message)
    })
    .catch(function (error) {
      alert(error.message + ", Please try again")

      userData.firstName = ""
      userData.lastName = ""
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
.step-item {
  @apply relative flex flex-col justify-center items-center w-20;
}

.step-item:not(:first-child):before {
  @apply content-[''] bg-white absolute w-full h-[1px] 
  right-2/4 top-1/2;
}

.step {
  @apply w-6 h-6 flex z-10 relative 
  bg-white justify-center items-center rounded-full font-semibold
   text-white text-blue-900;
}
.active .step {
  @apply bg-blue-900 fill-white;
}
.complete .step {
  @apply bg-blue-900 fill-white;
}
.complete:not(:first-child)::before,
.active:not(:first-child)::before {
  @apply bg-blue-900;
}
</style>

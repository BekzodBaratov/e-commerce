<template>
  <div class="fixed z-[999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
    <div class="loginModalbg shadow-md py-12 px-12 text-[#F4F6F9] text-lg">
      <div class="flex flex-col gap-6">
        <form class="flex flex-col gap-2 mb-8">
          <div class="name flex flex-col gap-0">
            <label for="username text-sm">Your Name:</label>
            <input class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#f4f6f927]" type="text" v-model="userData.username" name="username" id="username" placeholder="John" />
            <p v-if="v$.username.$error" class="text-sm text-end text-red-600">{{ v$.username.$errors[0].$message }}*</p>
          </div>
          <div class="email flex flex-col gap-0">
            <label for="email">Your Email:</label>
            <input class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#f4f6f927]" type="email" v-model="userData.email" name="email" id="email" placeholder="john@gmail.com" />
            <p v-if="v$.email.$error" class="text-sm text-end text-red-600">{{ v$.email.$errors[0].$message }}*</p>
          </div>
          <div class="password flex flex-col gap-0">
            <label for="password">Your Password:</label>
            <input class="bg-transparent capitalize border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]" type="password" v-model="userData.password" name="password" id="password" />
            <p v-if="v$.password.$error" class="text-sm text-end text-red-600">{{ v$.password.$errors[0].$message }}*</p>
          </div>
          <div class="confirmPassword flex flex-col gap-0">
            <label for="passwordConfirm">Confirm Password:</label>
            <input class="bg-transparent capitalize border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]" type="password" v-model="userData.passwordConfirm" name="passwordConfirm" id="passwordConfirm" />
            <p v-if="v$.passwordConfirm.$error" class="text-sm text-end text-red-600">{{ v$.passwordConfirm.$errors[0].$message }}*</p>
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

<script setup>
import { computed, reactive, ref } from "vue"
import axios from "axios"
import { useVuelidate } from "@vuelidate/core"
import { required, email, sameAs, minLength, helpers, maxLength } from "@vuelidate/validators"

// import { useUserRegister } from "../../store/UserRegister"
import ButtonFillVue from "@/components/buttons/ButtonFill.vue"
import LoadingModalVue from "@/components/LoadingModal.vue"

// const store = useUserRegister()

const loading = ref(false)

const userData = reactive({
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
})

const rules = computed(() => {
  return {
    username: { required, minLength: minLength(3), maxLength: maxLength(52) },
    email: { required, email, maxLength: maxLength(84) },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(32),
      containsUppercase: helpers.withMessage("The password requires an uppercase character", function (value) {
        return /[A-Z]/.test(value)
      }),
      containsLowercase: helpers.withMessage("The password requires an lowercase character", function (value) {
        return /[a-z]/.test(value)
      }),
      containsNumber: helpers.withMessage("The password requires an number character", function (value) {
        return /[0-9]/.test(value)
      }),
      containsSpecial: helpers.withMessage("The password requires an special character", function (value) {
        return /[#?!_@$%^&*-]/.test(value)
      }),
    },
    passwordConfirm: { required, sameAs: sameAs(userData.password) },
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

const fetchApi = (data) => {
  axios({
    method: "post",
    url: "users/signup",
    withCredentials: true,
    data: data,
  })
    .then(function (response) {
      // store.user = response.data.data.user
      alert(response.data.message)
    })
    .catch(function (error) {
      alert(error.message + ", Please try again")

      userData.username = ""
      userData.email = ""
      userData.password = ""
      userData.passwordConfirm = ""
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

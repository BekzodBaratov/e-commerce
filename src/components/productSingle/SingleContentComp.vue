<template>
  <div class="">
    <div class="grid grid-cols-2 pb-6 text-primary">
      <div class="text-2xl justify-between">
        <p>Quantity</p>
        <form>
          <span class="flex gap-2">
            <button @click.prevent="countFunc(false)" class="text-primary">
              <svg width="17" height="5" viewBox="0 0 11 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.12 2.104H10.136V0.296H0.12V2.104Z" fill="#002E69" />
              </svg>
            </button>
            <input :value="count" maxlength="5" minlength="0" class="border w-10 my-1 py-[2px] text-base border-whiteBlue rounded-lg text-primary font-semibold text-center" type="number" id="countProd" />
            <button @click.prevent="countFunc(true)">
              <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.0400001 5.768H8.456V3.768H0.0400001V5.768ZM3.176 0.552V8.984H5.32V0.552H3.176Z" fill="#002E69" />
              </svg>
            </button>
          </span>
        </form>
      </div>
      <div>
        <div class="rounded-xl py-2">
          <p class="text-2xl text-red-500 font-semibold pb-2">{{ props.productData.price }} $</p>
          <div class="flex gap-1">
            <div @click="addToCart" class="flex">
              <ButtonFill>Add to Cart</ButtonFill>
            </div>
            <RouterLink to="/products/cart" class="p-2 rounded-lg border border-primary flex items-center justify-center cursor-pointer">
              <img src="../../assets/icons/shopping-cart.svg" alt="shop-cart" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(val, i) in dataProducts" :key="i" class="grid grid-cols-2 mb-2 text-primary">
      <div class="font-semibold">{{ val.name }}</div>
      <div>{{ val.param }}</div>
    </div>
    <div class="pt-4">
      <h3 class="text-primary font-semibold">Description:</h3>
      <p class="text-primary">{{ props.productData.description }}</p>
    </div>
  </div>
  <LoadingModal v-if="loading" />
</template>

<script setup lang="ts">
import { publicApi } from "@/plugins/axios"
import { ref, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import ButtonFill from "../buttons/ButtonFill.vue"
import { useUserStore } from "@/store/userStore"
import LoadingModal from "@/components/loadingModal.vue"
import { useToast } from "vue-toastification"

const store = useUserStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const count = ref(1)
const countFunc = (val: any) => {
  if (count.value <= 1 && !val) return
  val ? count.value++ : count.value--
}
const loading = ref(false)

const props = defineProps(["productData"])

const dataProducts = reactive([
  { name: "Category", param: props.productData.category },
  { name: "Brand", param: props.productData.brand },
  { name: "Stock", param: props.productData.stock },
])

async function addToCart() {
  try {
    loading.value = true
    const res = await publicApi("/carts/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.userToken()}`,
      },
      data: {
        userId: store.userId(),
        products: [
          {
            id: route.params.id,
            quantity: count.value,
          },
        ],
      },
    })
    router.push("/products/cart")
    toast.success("Product successfully added")
  } catch (e) {
    console.log(e)
    toast.success("Something went wrong")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Header />
  <div v-if="productData" class="container mx-auto py-6">
    <h2 class="hidden lg:block text-xl mb-2 text-black">{{ productData.title }}</h2>
    <div class="flex items-center">
      <svg aria-hidden="true" class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Rating star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <p class="ml-2 font-bold">4.95</p>
      <span class="w-1 h-1 mx-3 bg-[#769acd] rounded-full"></span>
      <a href="#" class="font-medium underline hover:no-underline">50 reviews</a>
    </div>
    <div class="singleComp grid grid-cols-12 gap-8 my-8">
      <div class="swiperImg col-span-12 md:col-span-5"><ShopSingleComp :productImage="productImage" /></div>
      <div class="content col-span-12 md:col-span-7"><SingleContentComp :productData="productData" /></div>
    </div>
    <div>
      <UserCommit />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/store/userStore"
import Header from "@/components/Header.vue"
import ShopSingleComp from "../components/productSingle/ShopSingleComp.vue"
import SingleContentComp from "@/components/productSingle/SingleContentComp.vue"
import UserCommit from "@/components/productSingle/UserCommit.vue"
import { useProductStore } from "@/store/productStore"
import { publicApi } from "@/plugins/axios"
import { Product } from "@/typing/product"

const storeProduct = useProductStore()
const storeUser = useUserStore()

const router = useRoute()
const id = ref(router.params.id)
const productData = ref<Product>()

const productImage = ref<string[]>([])

async function fetchProduct() {
  try {
    const res = await publicApi.get(`/products/${id.value}`)
    productData.value = res.data
    productImage.value = res.data.images
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
fetchProduct()
</script>

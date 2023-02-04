<template>
  <Header />
  <div class="container mx-auto mt-4 px-2 md:px-0">
    <div class="flex flex-col gap-2 md:flex-row justify-between items-start md:items-end">
      <div class="flex gap-2">
        <p class="s font-semibold">All Products:</p>
        <p class="">{{ data.total }}</p>
      </div>
    </div>

    <div v-if="data.products" class="my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CardVue v-for="product in data.products" :key="product.id" :data="product" />
    </div>
  </div>
  <LoadingModal v-if="loading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import Header from "@/components/Header.vue"
import CardVue from "@/components/Card.vue"
import { publicApi } from "@/plugins/axios"
import LoadingModal from "@/components/LoadingModal.vue"

interface Products {
  id: number
}
interface Data {
  total: number
  products: Products[]
  limit: number
}
const loading = ref(true)
const data = ref<Data>({
  total: 0,
  products: [],
  limit: 0,
})

async function getLists(val: string) {
  try {
    const res = await publicApi.get(`/products${val}`)
    data.value = res.data
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getLists("?limit=12&skip=0")
})
</script>

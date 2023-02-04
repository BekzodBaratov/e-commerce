<template>
  <div v-if="data?.title" class="bg-white rounded-md overflow-hidden group shadow-md">
    <div class="img h-60 overflow-hidden">
      <img class="w-full h-full group-hover:scale-110 group-hover:brightness-75 duration-200 object-cover object-center" :src="data.thumbnail" :alt="data.title" />
    </div>
    <div class="p-4 pb-8 space-y-2">
      <div class="flex items-center justify-between flex-wrap">
        <RouterLink :to="'/products/' + data.id" class="font-semibold line-clamp-1 text-xl hover:text-blue-500 duration-200">{{ data.title }}</RouterLink>
        <div>
          <i v-for="i in Math.round(data.rating)" :key="i" class="fas fa-star text-sm text-yellow-500"></i>
          <i v-for="i in 5 - Math.round(data.rating)" :key="i" class="far fa-star text-sm text-yellow-500"></i>
        </div>
      </div>
      <div class="flex justify-between items-end">
        <p class="font-semibold">Price:</p>
        <div class="flex gap-2 items-end">
          <del class="text-red-500 text-sm">{{ data.price }}$</del>
          <p class="text-xl font-semibold text-gray-900">{{ realPrice(data.price, data.discountPercentage) }}$</p>
        </div>
      </div>
      <div class="flex justify-between items-end">
        <p class="font-semibold">Stock:</p>
        <p>{{ data.stock }} count</p>
      </div>
      <div class="flex justify-between items-end">
        <p class="font-semibold">Brand:</p>
        <p>{{ data.brand }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { realPrice } from "@/helpers"

const props = defineProps(["data"])
const data = ref(props.data)
</script>

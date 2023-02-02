<template>
  <div>
    <swiper :loop="true" :spaceBetween="15" :scrollbar="{ draggable: true }" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="singleSwiper rounded-3xl">
      <swiper-slide v-for="image in productImage"><img class="rounded-xl w-full object-cover h-96" :src="image" /></swiper-slide>
    </swiper>

    <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" :slidesPerView="3" :freeMode="true" :watchSlidesProgress="true" :modules="modules" class="singleThumbSwiper">
      <swiper-slide v-for="image in productImage"><img class="rounded-xl w-full object-cover h-40" :src="image" /></swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"

import "swiper/css"

import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import { FreeMode, Thumbs } from "swiper"

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper: any) => (thumbsSwiper.value = swiper)
const modules = ref([FreeMode, Thumbs])

const props = defineProps(["productImage"])
const productImage = ref<string[]>([])

watch(
  () => props.productImage,
  () => (productImage.value = props.productImage)
)
</script>

<style scoped>
.singleSwiper {
  padding: 0;
  padding-bottom: 1rem;
}
.singleThumbSwiper {
  padding: 0;
}
</style>

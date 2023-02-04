<template>
  <Swiper
    :navigation="true"
    :loop="true"
    :scrollbar="{ draggable: true }"
    :pagination="{ clickable: true }"
    :breakpoints="{
      240: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1536: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }"
    :modules="[Navigation, Pagination]"
    class="swiper swiperBigComp swiperSmilarComp max-h-[34rem] mb-7"
  >
    <SwiperSlide v-for="val in commentsData" :key="val.id" class="rounded-4xl pb-12">
      <RouterLink to="">
        <div class="w-full bg-primaryBlue rounded-xl p-4 px-8">
          <div class="flex gap-2 items-center pb-2 md:pb-6 lg:pb-8">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.5007 18.5941C12.8777 18.5941 9.11523 14.8316 9.11523 10.2087C9.11523 5.58574 12.8777 1.82324 17.5007 1.82324C22.1236 1.82324 25.8861 5.58574 25.8861 10.2087C25.8861 14.8316 22.1236 18.5941 17.5007 18.5941ZM17.5007 4.01074C14.0882 4.01074 11.3027 6.79616 11.3027 10.2087C11.3027 13.6212 14.0882 16.4066 17.5007 16.4066C20.9131 16.4066 23.6986 13.6212 23.6986 10.2087C23.6986 6.79616 20.9131 4.01074 17.5007 4.01074Z"
                fill="white"
              />
              <path
                d="M30.0268 33.1771C29.4289 33.1771 28.9331 32.6812 28.9331 32.0833C28.9331 27.0521 23.7997 22.9687 17.4997 22.9687C11.1997 22.9687 6.06641 27.0521 6.06641 32.0833C6.06641 32.6812 5.57057 33.1771 4.97266 33.1771C4.37474 33.1771 3.87891 32.6812 3.87891 32.0833C3.87891 25.8562 9.98932 20.7812 17.4997 20.7812C25.0101 20.7812 31.1206 25.8562 31.1206 32.0833C31.1206 32.6812 30.6247 33.1771 30.0268 33.1771Z"
                fill="white"
              />
            </svg>
            <p class="text-white">{{ val.user.username }}</p>
          </div>
          <div class="leading-relaxed text-white pb-2 md:pb-6 lg:pb-8">{{ val.body }}</div>
          <p class="date text-white">29.10.2022 | 14:32</p>
        </div>
      </RouterLink>
    </SwiperSlide>
  </Swiper>

  <div class="md:w-4/5">
    <form class="flex flex-col items-start gap-4">
      <h3 class="title text-2xl pb-3">Share your impression about the product</h3>
      <div class="flex">
        <svg v-for="i in 5" :key="i" @click="() => handleRate(i)" aria-hidden="true" :class="purchaseRate ? (purchaseRate >= i ? 'text-primaryBlue' : 'text-gray-500') : i == 1 ? 'text-primaryBlue' : 'text-gray-500'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      </div>
      <textarea v-model="userMessage" class="bg-transparent outline-none rounded-lg p-3 border border-primaryBlue" cols="40" rows="5" placeholder="Напишите ваш отзыв"></textarea>
      <button @click.prevent="addCommitByUserId">
        <ButtonFillVue color="#002e69"><span class="py-2">Sent Message</span></ButtonFillVue>
      </button>
    </form>
  </div>
  <LoadingModal v-if="loading" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/store/userStore"
import { Swiper, SwiperSlide } from "swiper/vue"
import { RouterLink } from "vue-router"
import ButtonFillVue from "../buttons/ButtonFill.vue"
import LoadingModal from "../LoadingModal.vue"
import { useToast } from "vue-toastification"
import { useRouter, useRoute } from "vue-router"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { Navigation, Pagination } from "swiper"
import { publicApi } from "@/plugins/axios"

const store = useUserStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const loading = ref(false)

const userMessage = ref<string>("")
const purchaseRate = ref<number | null>(null)
function handleRate(i: number) {
  purchaseRate.value = i
}

interface CommentsData {
  body: string
  id: number
  postId: number
  user: { id: number; username: string }
}

async function addCommitByUserId() {
  if (!store.userId()) {
    toast.error("Siz Ro'yxatdan o'tishingiz kerak")
    router.push("/login")
    return
  }
  if (userMessage.value.length < 14) {
    toast.error("The message you want to send must be at least 14 characters long")
    return
  }
  try {
    loading.value = true
    await publicApi.post("https://dummyjson.com/comments/add", {
      body: userMessage.value,
      postId: store.userId(),
      userId: 5,
    })
    toast.success("You have successfully added a commit")
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
    userMessage.value = ""
  }
}

const commentsData = ref<CommentsData[]>([])
async function GetAllCommentsByPostId() {
  try {
    loading.value = true
    const res = await publicApi.get(`https://dummyjson.com/comments/post/${route.params.id}`)
    commentsData.value = res.data.comments
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
GetAllCommentsByPostId()
</script>

<style>
.swiperSmilarComp .swiper-button-next,
.swiperSmilarComp .swiper-button-prev {
  background-color: white;
}
@media (max-width: 768px) {
  .swiperSmilarComp .swiper-button-next,
  .swiperSmilarComp .swiper-button-prev {
    display: none;
  }
}
</style>

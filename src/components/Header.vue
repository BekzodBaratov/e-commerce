<template>
  <div class="fixed z-[99999] top-0 inset-x-0 bg-white shadow-md py-2">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="logo">
        <img class="h-7 md:h-10" src="@/assets/logo/logo.png" alt="logo" />
      </RouterLink>
      <ul class="flex items-end gap-1">
        <li v-for="item in nav" :key="item.id" class="relative group">
          <div v-if="item.requireAuth !!== store.isLoggedIn">
            <RouterLink :to="item.link" class="font-semibold px-2 capitalize py-2 rounded-md hover:bg-slate-200">{{ item.name }}</RouterLink>
          </div>
          <!-- <div v-if="item.name == 'Cart'" class="miniCart group-hover:block hidden absolute top-full right-0">
            <div class="bg-white shadow-md rounded-md p-3 min-w-[24rem]">shop</div>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
  <div class="h-10 md:h-14"></div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { useUserStore } from "@/store/userStore"
import { Nav } from "@/typing/header"

const store = useUserStore()

const nav = reactive<Nav[]>([
  { id: 1, name: "Login", link: "/login", requireAuth: false },
  { id: 2, name: "Register", link: "/register", requireAuth: false },
  { id: 3, name: "Cart", link: "/products/cart", requireAuth: true },
  { id: 4, name: "Logout", link: "", requireAuth: true },
])
</script>

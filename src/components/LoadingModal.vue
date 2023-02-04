<template>
  <Teleport to="body">
    <div class="fixed z-[999999] inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
      <div class="fixed z-[999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img :src="LoadingSvg" alt="loading svg" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import LoadingSvg from "../assets/icons/Infinity-loading.svg"
</script>

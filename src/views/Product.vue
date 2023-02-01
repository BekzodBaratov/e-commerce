<template>
  <div class="pt-6 text-center text-2xl font-bold text-gray-500">
    <span>Product id:</span>
    {{ route.params.id }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
const route = useRoute()
</script>

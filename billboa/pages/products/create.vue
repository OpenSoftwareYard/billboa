<template>
  <ProductEditor :state="state" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "has-company"],
});

const state = reactive({
  name: "",
  description: "",
  price: 0,
  currency: "",
});
</script>

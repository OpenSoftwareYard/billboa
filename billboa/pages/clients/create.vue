<template>
  <ClientEditor :state="state" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "has-company"],
});

const state = reactive({
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  company_number: "",
  company_vat_number: "",
});
</script>

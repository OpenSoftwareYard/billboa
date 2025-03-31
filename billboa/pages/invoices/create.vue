<template>
  <InvoiceEditor :state="state" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "has-company"],
});

const state = reactive({
  invoiceNumber: "",
  currency: "",
  invoiceDate: "",
  totalValue: 0,
  dueDate: "",
  client: undefined,
  exchangeRate: 1,
  notes: undefined,
  products: [],
});
</script>

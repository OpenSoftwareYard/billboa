<template>
  <InvoiceEditor :productRows="productRows" :state="state" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "has-company"],
});

type ProductRow = {
  product: Database["public"]["Tables"]["products"]["Row"];
  quantity: number;
};

const productRows = ref<ProductRow[]>([]);

const state = reactive({
  invoiceNumber: "",
  currency: "",
  invoiceDate: "",
  totalValue: 0,
  dueDate: "",
  client: undefined,
  exchangeRate: 1,
  notes: undefined,
});
</script>

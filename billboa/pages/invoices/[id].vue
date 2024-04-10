<template>
  <InvoiceEditor :productRows="productRows" :state="state" />
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["auth", "has-company"],
});

const { data: invoice, error } = await supabase
  .from("invoices")
  .select(
    `*,
      companies (*),
      clients (*),
      products (*, quantity: invoices_products(quantity))
    `,
  )
  .eq("invoice_number", route.params.id)
  .single();

const productRows = invoice!.products!.map((product) => ({
  product,
  quantity: product.quantity[0].quantity,
}));

const state = reactive({
  id: invoice!.id,
  invoiceNumber: invoice!.invoice_number,
  currency: invoice!.currency,
  invoiceDate: invoice!.date,
  totalValue: invoice!.total_amount,
  dueDate: invoice!.due_date,
  client: invoice!.clients!,
  exchangeRate: invoice!.exchange_rate,
  notes: invoice!.notes || undefined,
});
</script>

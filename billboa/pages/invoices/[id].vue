<template>
  <InvoiceEditor :state="state" />
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["auth", "has-company"],
});

const { data: invoice, error } = await supabase
  .from("invoices_view")
  .select(
    `*,
      companies (*),
      clients (*)
    `,
  )
  .eq("invoice_number", route.params.id)
  .single();

const productRows = (invoice!.products! as Product[]).map((product) => ({
  ...product,
  price: product.price / 10000,
}));

const state = reactive({
  id: invoice!.id!,
  invoiceNumber: invoice!.invoice_number!,
  currency: invoice!.currency!,
  invoiceDate: invoice!.date!,
  totalValue: invoice!.total_amount! / 10000,
  dueDate: invoice!.due_date!,
  client: invoice!.clients!,
  exchangeRate: invoice!.exchange_rate!,
  notes: invoice!.notes || undefined,
  products: productRows
});
</script>

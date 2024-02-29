<template>
  {{ $route.params.id }}
  {{ data?.total_amount }}
  {{ data?.products }}
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["auth"],
});

const { data } = await supabase
  .from("invoices")
  .select(
    `*,
    products (
      name
    )
  `,
  )
  .eq("invoice_number", route.params.id)
  .single();
</script>

<template>
  <ProductEditor :state="state" />
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["auth", "has-company"],
});

const { data } = await supabase
  .from("products")
  .select("*")
  .eq("id", route.params.id)
  .single();

route.meta.alias = data?.name;

const state = reactive({
  id: data!.id,
  name: data!.name,
  description: data!.description,
  price: data!.price,
  currency: data!.currency,
});
</script>

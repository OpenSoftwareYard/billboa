<template>
  <ClientEditor :state="state" />
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["auth", "has-company"],
});

const { data } = await supabase
  .from("clients")
  .select("*")
  .eq("id", route.params.id)
  .single();

route.meta.alias = data?.name;

const state = reactive({
  id: data!.id,
  name: data!.name,
  address: data!.address,
  city: data!.city,
  state: data!.state,
  country: data!.country,
  company_number: data!.company_number,
  company_vat_number: data!.vat_number,
});
</script>

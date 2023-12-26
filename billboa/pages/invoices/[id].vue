<template>
  {{ $route.params.id }}
  {{ data?.total_amount }}
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

const { data } = await supabase
  .from("invoices")
  .select("*")
  .eq("id", route.params.id)
  .single();
</script>

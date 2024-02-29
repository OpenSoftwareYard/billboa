<template>
  {{ $route.params.id }}
  {{ data?.name }}
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["auth"],
});

const { data } = await supabase
  .from("products")
  .select("*")
  .eq("id", route.params.id)
  .single();

route.meta.alias = data?.name;
</script>

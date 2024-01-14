<template>
  {{ $route.params.id }}
  {{ data?.name }}
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient<Database>();

const { data } = await supabase
  .from("clients")
  .select("*")
  .eq("id", route.params.id)
  .single();

route.meta.alias = data?.name;
</script>

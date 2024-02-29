<template>
  <div class="row" id="cancel-row">
    <div
      class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing layout-spacing"
    >
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <DataTable
            :data="clients"
            :columns="[
              { name: 'name', label: 'Name' },
              { name: 'country', label: 'Country' },
              { name: 'company_number', label: 'Company number' },
            ]"
            :idColumn="{ name: 'id', label: 'Record no.' }"
            :newEntry="{ route: '/clients/create', label: 'New client' }"
            @rowClicked="navigateToClient"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient<Database>();
const router = useRouter();

definePageMeta({
  middleware: ["auth"],
});

const { data: clients } = await useAsyncData("clients", async () => {
  const { currentCompany } = await useCurrentCompany();

  const { data } = await supabase
    .from("clients")
    .select("*")
    .eq("company_id", currentCompany.value!.id);
  return data;
});

async function navigateToClient(clientId: string) {
  await router.push(`/clients/${clientId}`);
}
</script>

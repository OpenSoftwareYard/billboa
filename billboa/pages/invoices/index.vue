<template>
  <div class="row" id="cancel-row">
    <div
      class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing layout-spacing"
    >
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <DataTable
            :data="invoices"
            :columns="[
              { name: 'clients.name', label: 'Client' },
              { name: 'total_amount', label: 'Total Amount' },
              { name: 'currency', label: 'Currency' },
              { name: 'due_date', label: 'Due Date' },
              { name: 'status', label: 'Status' },
            ]"
            :idColumn="{ name: 'invoice_number', label: 'Invoice No.' }"
            :newEntry="{ route: '/invoices/create', label: 'New Invoice' }"
            @rowClicked="navigateToInvoice"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient<Database>();
const router = useRouter();

const { data: invoices } = await useAsyncData("invoices", async () => {
  const { currentCompany } = await useCurrentCompany();

  const { data } = await supabase
    .from("invoices")
    .select("*, clients (name)")
    .eq("company_id", currentCompany.value!.id);
  return data;
});

async function navigateToInvoice(invoiceId: string) {
  await router.push(`/invoices/${invoiceId}`);
}
</script>

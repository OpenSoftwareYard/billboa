<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="deleteItemModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete invoice</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="modal-text">
            Are you sure you want to delete this invoice?
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn btn-light-dark" data-bs-dismiss="modal">
            <i class="flaticon-cancel-12"></i> Discard
          </button>
          <button type="button" class="btn btn-danger" @click="deleteInvoice">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="loadModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="loadModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loadModalLabel">Loading</h5>
        </div>
        <div class="modal-body">
          <div class="spinner-border text-success align-self-center loader-lg">
            Loading...
          </div>
        </div>
        <!-- <div class="modal-footer">
          <button class="btn btn btn-light-dark" data-bs-dismiss="modal">
            <i class="flaticon-cancel-12"></i> Discard
          </button>
          <button type="button" class="btn btn-danger" @click="deleteInvoice">
            Delete
          </button>
        </div> -->
      </div>
    </div>
  </div>

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
              {
                name: 'total_amount',
                label: 'Total Amount',
                transform: (value) => value / 100,
              },
              { name: 'currency', label: 'Currency' },
              { name: 'due_date', label: 'Due Date' },
              { name: 'status', label: 'Status' },
            ]"
            :idColumn="{ name: 'invoice_number', label: 'Invoice No.' }"
            :newEntry="{ route: '/invoices/create', label: 'New Invoice' }"
            :actions="[
              {
                label: 'Download',
                icon: 'dashicons:pdf',
                action: downloadInvoicePDF,
              },
              {
                label: 'Delete',
                icon: 'dashicons:trash',
                action: confirmInvoiceDelete,
              },
              {
                label: 'Mark as Sent',
                icon: 'dashicons:airplane',
                action: markInvoiceAsSent,
              },
            ]"
            @rowClicked="navigateToInvoice"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as bootstrap from "bootstrap";
import "assets/components/modal.scss";
import "assets/plugins/loaders/custom-loader.scss";
const supabase = useSupabaseClient<Database>();
const router = useRouter();
const config = useRuntimeConfig();

definePageMeta({
  middleware: ["auth", "has-company"],
});

const shouldRefreshData = ref(false);
const state = reactive({
  deleteItemModal: null as bootstrap.Modal | null,
  loadModal: null as bootstrap.Modal | null,
  itemToDelete: null as string | null,
});

onMounted(() => {
  state.deleteItemModal = new bootstrap.Modal("#deleteItemModal", {});
  state.loadModal = new bootstrap.Modal("#loadModal", {
    backdrop: "static",
    keyboard: false,
  });
});

const { data: invoices } = await useAsyncData(
  "invoices",
  async () => {
    const { currentCompany } = await useCurrentCompany();

    const { data } = await supabase
      .from("invoices")
      .select("*, clients (name)")
      .eq("company_id", currentCompany.value!.id);
    return data;
  },
  {
    watch: [shouldRefreshData],
  },
);

async function navigateToInvoice(invoiceId: string) {
  await router.push(`/invoices/${invoiceId}`);
}

async function confirmInvoiceDelete(invoiceId: string) {
  state.itemToDelete = invoiceId;
  state.deleteItemModal?.show();
}

async function deleteInvoice() {
  if (state.itemToDelete === null) {
    throw new Error("No item to delete");
  }

  await supabase
    .from("invoices")
    .delete()
    .eq("invoice_number", state.itemToDelete);

  state.itemToDelete = null;
  shouldRefreshData.value = !shouldRefreshData.value;
  state.deleteItemModal?.hide();
}

async function markInvoiceAsSent(invoiceId: string) {
  await supabase
    .from("invoices")
    .update({ status: "sent" })
    .eq("invoice_number", invoiceId);
  shouldRefreshData.value = !shouldRefreshData.value;
}

async function downloadInvoicePDF(invoiceId: string) {
  state.loadModal?.show();
  const invoice = invoices.value?.find((i) => i.invoice_number === invoiceId);
  if (!invoice) {
    throw new Error("Invoice not found");
  }

  const { data, error } = await supabase.functions.invoke("generate-invoice", {
    body: { invoice_number: invoice.invoice_number },
  });

  if (error) {
    // TODO: Better error handling
    state.loadModal?.hide();
    throw error;
  }

  const url = data?.invoice_url.signedUrl.replace(
    "http://kong:8000",
    config.public.supabase.url,
  );

  state.loadModal?.hide();

  await navigateTo(url, {
    open: {
      target: "_blank",
    },
    external: true,
  });
}
</script>

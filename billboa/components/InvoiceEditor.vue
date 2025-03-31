<template>
  <div class="row">
    <div class="col-xl-9 layout-top-spacing">
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing">
          <div class="statbox widget box box-shadow">
            <div class="widget-content widget-content-area br-8">
              <div class="w-header">Basic details</div>
              <div class="row">
                <div class="col-lg-4 col-sm-12">
                  <div class="form-group">
                    <label for="invoiceNumber" class="form-label"
                      >Invoice Number</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="invoiceNumber"
                      v-model="state.invoiceNumber"
                    />
                  </div>
                </div>
                <div class="col-lg-4 col-sm-12">
                  <div class="form-group">
                    <label for="client" class="form-label">Client</label>
                    <BBSelect
                      :options="
                        clients.map((client) => {
                          return client.name;
                        })
                      "
                      :default="state.client?.name || emptyClient.name"
                      @open="getClients"
                      @input="
                        state.client =
                          clients.find((client) => {
                            return client.name === $event;
                          }) || emptyClient
                      "
                    />
                  </div>
                </div>
                <div class="col-lg-2 col-sm-12">
                  <div class="form-group">
                    <label for="currency" class="form-label">Currency</label>
                    <BBSelect
                      :options="['RON', 'EUR', 'USD']"
                      :default="state.currency"
                      @input="state.currency = $event!"
                    />
                  </div>
                </div>
                <div class="col-lg-2 col-sm-12" v-if="state.currency != 'RON'">
                  <div class="form-group">
                    <label for="exchangeRate" class="form-label"
                      >Exchange rate 1 {{ state.currency }} = x RON</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="state.exchangeRate"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6 col-sm-12">
                  <div class="form-group">
                    <label for="invoiceDate" class="form-label"
                      >Invoice Date</label
                    >
                    <flat-pickr
                      v-model="state.invoiceDate"
                      class="form-control"
                      id="invoiceDate"
                      @on-change="invoiceDateChanged"
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <div class="form-group">
                    <label for="dueDate" class="form-label">Due Date</label>
                    <flat-pickr
                      v-model="state.dueDate"
                      class="form-control"
                      id="dueDate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing">
          <div class="widget box box-shadow">
            <div class="widget-content widget-content-area br-8">
              <div
                class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
              >
                <div class="w-header">Items</div>
                <div class="table-responsive">
                  <table
                    class="table table-hover dataTable no-footer"
                    style="width: 100%"
                  >
                    <thead>
                      <tr role="row">
                        <th rowspan="1" colspan="1">Name</th>
                        <th rowspan="1" colspan="1">Description</th>
                        <th rowspan="1" colspan="1">Price</th>
                        <th rowspan="1" colspan="1">Quantity</th>
                        <th rowspan="1" colspan="1">Total</th>
                        <th rowspan="1" colspan="1">Currency</th>
                        <th rowspan="1" colspan="1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr role="row" v-for="productRow in productRows">
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            v-model="productRow.name"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            v-model="productRow.description"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            v-model="productRow.price"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            v-model="productRow.quantity"
                          />
                        </td>
                        <td>
                          {{
                            (
                              productRow.price * productRow.quantity
                            ).toLocaleString()
                          }}
                        </td>
                        <td>
                          <BBSelect
                            :options="['RON', 'EUR', 'USD']"
                            :default="productRow.currency"
                            @input="productRow.currency = $event!"
                          />
                          <div v-if="productRow.currency != state.currency">
                            <span
                              >Exchange rate 1 {{ productRow.currency }} = x
                              {{ state.currency }}</span
                            >
                            <input
                              type="text"
                              class="form-control"
                              v-model="productRow.exchange_rate"
                            />
                          </div>
                        </td>
                        <td>
                          <Icon
                            name="dashicons:trash"
                            @click="
                              productRows.splice(
                                productRows.indexOf(productRow),
                                1,
                              )
                            "
                          />
                        </td>
                      </tr>
                      <tr rolw="row" @click="addProductRow">
                        <th rowspan="1" colspan="7" class="text-center">
                          <Icon name="dashicons:plus-alt2" />Add item
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-8 col-lg-8 col-sm-12 layout-top-spacing">
          <div class="statbox widget box box-shadow">
            <div class="widget-content widget-content-area br-8">
              <div class="w-header">Notes</div>
              <textarea
                class="form-control"
                rows="5"
                v-model="state.notes"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-sm-12 layout-top-spacing">
          <div class="statbox widget box box-shadow">
            <div class="widget-content widget-content-area br-8">
              <div class="w-header">Totals</div>
              <div class="totals-row">
                <div class="invoice-totals-row invoice-summary-subtotal">
                  <div class="invoice-summary-label">Subtotal</div>
                  <div class="invoice-summary-value">
                    <div class="subtotal-amount">
                      <span class="amount">
                        {{ state.totalValue.toLocaleString() }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="invoice-totals-row invoice-summary-total">
                  <div class="invoice-summary-label">Discount</div>
                  <div class="invoice-summary-value">0.0</div>
                </div>
                <div class="invoice-totals-row invoice-summary-tax">
                  <div class="invoice-summary-label">Tax</div>
                  <div class="invoice-summary-value">0.0</div>
                </div>
                <div class="invoice-totals-row invoice-summary-balance-due">
                  <div class="invoice-summary-label">Total</div>
                  <div class="invoice-summary-value">
                    {{ state.totalValue.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 layout-top-spacing">
      <div class="row">
        <div class="col-xl-12 layout-top-spacing">
          <div class="statbox widget box box-shadow">
            <div class="widget-content widget-content-area br-8">
              <div class="col-xl-12 col-md-4">
                <button
                  class="btn btn-primary"
                  style="width: 100%; margin-bottom: 20px"
                  @click="saveInvoice"
                >
                  Save
                </button>
              </div>
              <div class="col-xl-12 col-md-4">
                <button
                  class="btn btn-secondary"
                  style="width: 100%"
                  @click="previewInvoice"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <iframe
      id="invoicePreview"
      :srcdoc="invoicePreview"
      width="595"
      height="842"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "assets/apps/invoice-add.scss";

const { currentCompany } = await useCurrentCompany();
const supabase = useSupabaseClient<Database>();
const router = useRouter();

const emptyClient = {
  address: "",
  city: "",
  company_id: 0,
  country: "",
  created_at: "",
  id: -1,
  name: "Select Client",
  state: "",
  updated_at: "",
  vat_number: "",
  company_number: "",
};

const props = defineProps<{
  state: {
    id?: number;
    invoiceNumber: string;
    currency: string;
    invoiceDate: string;
    totalValue: number;
    dueDate: string;
    client?: Database["public"]["Tables"]["clients"]["Row"];
    exchangeRate: number;
    notes?: string;
    products: Product[];
  };
}>();

const productRows = ref(props.state.products);
const state = ref(props.state);

watch(productRows.value, (newVal) => {
  state.value.totalValue = newVal.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);
});

watch(
  [() => state.value.currency, () => state.value.invoiceDate],
  async ([newCurrency, newInvoiceDate]) => {
    if (newCurrency === "RON" || !newInvoiceDate) {
      return;
    }

    const invoiceDate = new Date(newInvoiceDate);
    const yesterday = new Date(invoiceDate);

    const { data: exchangeRates, error } = await supabase
      .from("exchange_rates")
      .select("rate")
      .eq("currency_from", newCurrency)
      .eq("currency_to", "RON")
      .lte("rate_date", yesterday.toDateString())
      .order("rate_date", { ascending: false });

    if (error) {
      console.error(error);
      throw error;
    }

    state.value.exchangeRate = exchangeRates![0].rate;
  },
);

const clients = ref<Database["public"]["Tables"]["clients"]["Row"][]>([
  state.value.client || emptyClient,
]);

const invoicePreview = ref("");

async function getClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("company_id", currentCompany.value!.id);

  if (error) {
    console.error(error);
    throw error;
  }

  clients.value = data!;
}

async function addProductRow() {
  productRows.value.push({
    name: "",
    description: "",
    price: 0,
    currency: "EUR",
    exchange_rate: 1,
    quantity: 0,
  });
}

async function upsertInvoice() {
  const { data, error } = await supabase
    .from("invoices")
    .upsert({
      id: state.value.id,
      invoice_number: state.value.invoiceNumber,
      currency: state.value.currency,
      date: state.value.invoiceDate,
      due_date: state.value.dueDate,
      client_id: state.value.client!.id,
      company_id: currentCompany.value!.id,
      status: "draft",
      exchange_rate: state.value.exchangeRate,
      notes: state.value.notes,
      products: state.value.products.map((product) => ({
        ...product,
        price: product.price * 10000,
      })),
    })
    .select();

  if (error) {
    console.error(error);
    throw error;
  }
}

async function saveInvoice() {
  await upsertInvoice();
  router.push("/invoices");
}

async function previewInvoice() {
  await upsertInvoice();

  const { data, error } = await supabase.functions.invoke("preview-invoice", {
    body: { invoice_number: state.value.invoiceNumber },
  });

  if (error) {
    // TODO: Better error handling
    throw error;
  }

  invoicePreview.value = data;
}

async function invoiceDateChanged() {}
</script>

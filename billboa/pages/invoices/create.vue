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
                      :default="clients[0]?.name"
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
                <div class="col-lg-4 col-sm-12">
                  <div class="form-group">
                    <label for="currency" class="form-label">Currency</label>
                    <BBSelect
                      :options="['RON', 'EUR', 'USD']"
                      default="RON"
                      @input="state.currency = $event"
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
                            v-model="productRow.product.name"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            v-model="productRow.product.description"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            v-model="productRow.product.price"
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
                              productRow.product.price * productRow.quantity
                            ).toLocaleString()
                          }}
                        </td>
                        <td>
                          <BBSelect
                            :options="['EUR', 'USD']"
                            :default="productRow.product.currency"
                            @input="productRow.product.currency = $event"
                          />
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
              <textarea class="form-control" rows="5"></textarea>
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
                <button class="btn btn-secondary" style="width: 100%">
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "assets/apps/invoice-add.scss";

definePageMeta({
  middleware: ["auth", "has-company"],
});

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

const clients = ref<Database["public"]["Tables"]["clients"]["Row"][]>([
  emptyClient,
]);

type ProductRow = {
  product: Database["public"]["Tables"]["products"]["Row"];
  quantity: number;
};

const productRows = ref<ProductRow[]>([]);

const state = reactive({
  invoiceNumber: "",
  currency: "",
  invoiceDate: "",
  totalValue: 0,
  dueDate: "",
  client: emptyClient,
});

watch(productRows.value, (newVal) => {
  state.totalValue = newVal.reduce((curr, prev) => {
    return curr + prev.product.price * prev.quantity;
  }, 0);
});

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
    product: {
      id: -1,
      name: "",
      description: "",
      price: 0,
      company_id: currentCompany.value!.id,
      created_at: "",
      updated_at: "",
      currency: "EUR",
    },
    quantity: 0,
  });
}

async function saveInvoice() {
  const { data, error } = await supabase
    .from("invoices")
    .insert([
      {
        invoice_number: state.invoiceNumber,
        currency: state.currency,
        date: state.invoiceDate,
        due_date: state.dueDate,
        client_id: state.client.id,
        company_id: currentCompany.value!.id,
        status: "draft",
        total_amount: state.totalValue,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  const invoiceId = data![0].id;

  const { data: productData, error: productError } = await supabase
    .from("products")
    .insert(
      productRows.value.map((productRow) => {
        return {
          name: productRow.product.name,
          description: productRow.product.description,
          price: productRow.product.price,
          currency: productRow.product.currency,
          company_id: currentCompany.value!.id,
        };
      }),
    )
    .select();

  if (productError) {
    console.error(productError);
    throw productError;
  }

  const { data: invoiceProductData, error: invoiceProductError } =
    await supabase.from("invoices_products").insert(
      productData!.map((product, index) => {
        return {
          invoice_id: invoiceId,
          product_id: product.id,
          quantity: productRows.value[index].quantity,
        };
      }),
    );

  if (invoiceProductError) {
    console.error(invoiceProductError);
    throw invoiceProductError;
  }

  router.push("/invoices");
}
</script>

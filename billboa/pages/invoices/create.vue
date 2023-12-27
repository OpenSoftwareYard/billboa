<template>
  <div class="row">
    <div class="col-xl-6 col-lg-6 col-sm-12 layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <div class="w-header">Basic details</div>
          <div class="form-group">
            <label for="invoiceNumber" class="form-label">Invoice Number</label>
            <input
              type="text"
              class="form-control"
              id="invoiceNumber"
              v-model="state.invoiceNumber"
            />
          </div>
          <div class="form-group">
            <label for="invoiceDate" class="form-label">Invoice Date</label>
            <flat-pickr
              v-model="state.invoiceDate"
              class="form-control"
              id="invoiceDate"
            />
          </div>
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
    <div class="col-xl-6 col-lg-6 col-sm-12 layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <div class="w-header">Client</div>
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
                  </tr>
                </thead>
                <tbody>
                  <tr rolw="row">
                    <th rowspan="1" colspan="5" class="text-center">
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
</template>

<script setup lang="ts">
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

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

const invoiceDate = ref<Date>(new Date());
const dueDate = ref<Date>(new Date());

const state = reactive({
  invoiceNumber: "",
  invoiceDate: new Date(),
  dueDate: new Date(),
  client: emptyClient,
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
</script>

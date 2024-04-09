<template>
  <div class="row" id="cancel-row">
    <div
      class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing layout-spacing"
    >
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <div class="w-header">Company details</div>
          <form class="row g-3 mt-2" @submit.prevent="submit">
            <div class="col-md-12">
              <label for="inputName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                v-model="state.name"
              />
            </div>
            <div class="col-12">
              <label for="inputAddress" class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                v-model="state.address"
              />
            </div>
            <div class="col-md-4">
              <label for="inputCity" class="form-label">City</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                v-model="state.city"
              />
            </div>
            <div class="col-md-4">
              <label for="inputState" class="form-label">State</label>
              <input
                type="text"
                id="inputState"
                class="form-control"
                v-model="state.state"
              />
            </div>
            <div class="col-md-4">
              <label for="inputCountry" class="form-label">Country</label>
              <input
                type="text"
                class="form-control"
                id="inputCountry"
                v-model="state.country"
              />
            </div>
            <div class="col-md-12">
              <label for="inputCompanyNumber" class="form-label"
                >Company Reg. Number</label
              >
              <input
                type="text"
                class="form-control"
                id="inputCompanyNumber"
                v-model="state.company_number"
              />
            </div>
            <div class="col-md-12">
              <label for="inputCompanyVATNumber" class="form-label"
                >Company VAT Number</label
              >
              <input
                type="text"
                class="form-control"
                id="inputCompanyVATNumber"
                v-model="state.company_vat_number"
              />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { currentCompany } = await useCurrentCompany();
const supabase = useSupabaseClient<Database>();
const router = useRouter();

definePageMeta({
  middleware: ["auth", "has-company"],
});

const props = defineProps<{
  state: {
    id?: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    company_number: string;
    company_vat_number: string;
  };
}>();

const state = ref(props.state);

async function submit() {
  if (currentCompany.value === null) {
    throw new Error("No company selected");
  }

  const { error } = await supabase.from("clients").upsert({
    id: state.value.id,
    name: state.value.name,
    address: state.value.address,
    city: state.value.city,
    state: state.value.state,
    country: state.value.country,
    company_number: state.value.company_number,
    vat_number: state.value.company_vat_number,
    company_id: currentCompany.value!.id,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  router.push("/clients");
}
</script>

<template>
  <div class="row" id="cancel-row">
    <div
      class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing layout-spacing"
    >
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <div class="w-header">Product details</div>
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
              <label for="inputDescriptions" class="form-label"
                >Description</label
              >
              <input
                type="text"
                class="form-control"
                id="inputDescription"
                placeholder="1234 Main St"
                v-model="state.description"
              />
            </div>
            <div class="col-md-4">
              <label for="inputPrice" class="form-label">Price</label>
              <input
                type="text"
                class="form-control"
                id="inputPrice"
                v-model="state.price"
              />
            </div>
            <div class="col-md-4">
              <label for="inputCurrency" class="form-label">Currency</label>
              <input
                type="text"
                id="inputCurrency"
                class="form-control"
                v-model="state.currency"
              />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">Create</button>
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
  middleware: ["auth"],
});

const state = reactive({
  name: "",
  description: "",
  price: "",
  currency: "",
});

async function submit() {
  if (currentCompany.value === null) {
    throw new Error("No company selected");
  }

  const { error } = await supabase.from("products").insert({
    name: state.name,
    description: state.description,
    price: Number(state.price),
    currency: state.currency,
    company_id: currentCompany.value!.id,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  router.push("/products");
}
</script>

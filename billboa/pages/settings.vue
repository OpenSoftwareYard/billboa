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
              <label for="inputName" class="form-label">Nume</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                v-model="state.name"
              />
            </div>
            <div class="col-12">
              <label for="inputAddress" class="form-label">Adresă</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                v-model="state.address"
              />
            </div>
            <div class="col-md-4">
              <label for="inputCity" class="form-label">Oraș</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                v-model="state.city"
              />
            </div>
            <div class="col-md-4">
              <label for="inputState" class="form-label">Județ</label>
              <input
                type="text"
                id="inputState"
                class="form-control"
                v-model="state.state"
              />
            </div>
            <div class="col-md-4">
              <label for="inputCountry" class="form-label">Țară</label>
              <input
                type="text"
                id="inputCountry"
                class="form-control"
                v-model="state.country"
              />
            </div>
            <div class="col-md-4">
              <label for="inputCompanyNumber" class="form-label"
                >Nr. reg. comerțului</label
              >
              <input
                type="text"
                id="inputCompanyNumber"
                class="form-control"
                v-model="state.companyNumber"
              />
            </div>
            <div class="col-md-4">
              <label for="inputVATNumber" class="form-label"
                >Cod TVA / CUI</label
              >
              <input
                type="text"
                id="inputVATNumber"
                class="form-control"
                v-model="state.vatNumber"
              />
            </div>
            <div class="col-md-4">
              <label for="inputShareValue" class="form-label"
                >Capital social</label
              >
              <input
                type="text"
                id="inputShareValue"
                class="form-control"
                v-model="state.shareValue"
              />
            </div>
            <div class="col-md-6">
              <label for="inputBankNumber" class="form-label">IBAN</label>
              <input
                type="text"
                id="inputBankNumber"
                class="form-control"
                v-model="state.bankNumber"
              />
            </div>
            <div class="col-md-6">
              <label for="inputBankName" class="form-label">Banca</label>
              <input
                type="text"
                id="inputBankName"
                class="form-control"
                v-model="state.bankName"
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
  middleware: ["auth"],
});

const state = reactive({
  name: currentCompany.value?.name ?? "",
  address: currentCompany.value?.address ?? "",
  city: currentCompany.value?.city ?? "",
  state: currentCompany.value?.state ?? "",
  country: currentCompany.value?.country ?? "",
  companyNumber: currentCompany.value?.company_number ?? "",
  vatNumber: currentCompany.value?.vat_number ?? "",
  shareValue: currentCompany.value?.share_value ?? "",
  bankNumber: currentCompany.value?.bank_number ?? "",
  bankName: currentCompany.value?.bank_name ?? "",
});

async function submit() {
  const { error } = await supabase.from("companies").upsert(
    {
      id: currentCompany.value?.id,
      name: state.name,
      address: state.address,
      city: state.city,
      state: state.state,
      country: state.country,
      company_number: state.companyNumber,
      vat_number: state.vatNumber,
      share_value: state.shareValue,
      bank_number: state.bankNumber,
      bank_name: state.bankName,
    },
    {},
  );

  if (error) {
    console.error(error);
    throw error;
  }
}
</script>

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
                disabled
              />
            </div>
            <div class="col-12">
              <label for="inputEmail" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail"
                placeholder="someone@somedomain.sometld"
                v-model="state.email"
                disabled
              />
            </div>
            <div class="col-12">
              <label for="inputPassword" class="form-label">Parola</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                v-model="state.password"
              />
            </div>
            <div class="col-12">
              <label for="inputPasswordConfirm" class="form-label"
                >Parola din nou</label
              >
              <input
                type="password"
                class="form-control"
                id="inputPasswordConfirm"
                v-model="state.passwordConfirm"
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
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const router = useRouter();

definePageMeta({
  middleware: ["auth"],
});

const state = reactive({
  name: "",
  email: user.value?.email,
  password: undefined,
  passwordConfirm: undefined,
});

async function submit() {
  if (state.password !== state.passwordConfirm) {
    alert("Passwords do not match");
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: state.password,
  });

  if (error) {
    console.error(error);
    throw error;
  }
}
</script>

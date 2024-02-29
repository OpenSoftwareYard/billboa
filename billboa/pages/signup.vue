<template>
  <div class="auth-container d-flex">
    <div class="container mx-auto align-self-center">
      <div class="row">
        <div
          class="col-6 d-lg-flex d-none h-100 my-auto top-0 start-0 text-center justify-content-center flex-column"
        >
          <div class="auth-cover-bg-image"></div>
          <div class="auth-overlay"></div>
          <div class="auth-cover">
            <div class="position-relative">
              <img src="../src/assets/img/auth-cover.svg" alt="auth-img" />
              <h2 class="mt-5 text-white font-weight-bolder px-2">
                Join the community of expert developers
              </h2>
              <p class="text-white px-2">
                It is easy to setup with great customer experience. Start your
                7-day free trial
              </p>
            </div>
          </div>
        </div>
        <div
          class="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center ms-lg-auto me-lg-0 mx-auto"
        >
          <div class="card">
            <div class="card-body">
              <div class="row">
                <form @submit.prevent="signUpNewUser">
                  <div class="col-md-12 mb-3">
                    <h2>Sign Up</h2>
                    <p>Enter your email and password to register</p>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        v-model="newUser.email"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="newUser.password"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-4">
                      <button type="submit" class="btn btn-secondary w-100">
                        SIGN UP
                      </button>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="text-center">
                      <p class="mb-0">
                        Already have an account?
                        <NuxtLink to="/signin" class="text-warning"
                          >Sign in</NuxtLink
                        >
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/authentication/auth-cover.scss";
</style>

<script setup lang="ts">
const supabase = useSupabaseClient<Database>();

definePageMeta({ layout: "fullscreen" });

const newUser = reactive({
  email: "",
  password: "",
});

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      emailRedirectTo: "http://localhost:3000/signin",
    },
  });

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}
</script>

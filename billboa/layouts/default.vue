<template>
  <div class="header-container">
    <header class="header navbar navbar-expand-sm">
      <ul class="navbar-item theme-brand flex-row text-center">
        <li class="nav-item theme-logo"><NuxtLink to="/">B</NuxtLink></li>
        <li class="nav-item theme-text">
          <NuxtLink to="/"> Billboa </NuxtLink>
        </li>
      </ul>
      <ul class="navbar-item flex-row ms-lg-auto ms-0 action-area">
        <li class="nav-item dropdown user-profile-dropdown order-lg-0 order-1">
          <a
            href="javascript:void(0);"
            class="nav-link dropdown-toggle user"
            id="userProfileDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="avatar-container">
              <div
                class="avatar avatar-sm avatar-indicators avatar-online"
              ></div>
            </div>
          </a>
          <div
            class="dropdown-menu position-absolute"
            aria-labelledby="userProfileDropdown"
          >
            <div class="user-profile-section">
              <div class="media mx-auto">
                <div class="emoji me-2">&#x1F44B;</div>
                <div class="media-body">
                  <h5>{{ user?.email }}</h5>
                </div>
              </div>
            </div>
            <div class="dropdown-item">
              <NuxtLink to="/user/settings"> User settings </NuxtLink>
            </div>
            <div class="dropdown-item">
              <a href="#" @click="signOut"> Sign Out </a>
            </div>
          </div>
        </li>
      </ul>
    </header>
  </div>

  <div :class="mainContainerClass" id="container">
    <div class="overlay"></div>

    <div class="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <div clas="shadow-bottom"></div>
        <Navigation />
      </nav>
    </div>

    <div id="content" class="main-content">
      <div class="layout-px-spacing">
        <div class="middle-content p-0">
          <div class="secondary-nav">
            <div class="breadcrumbs-container">
              <Breadcrumbs
                :breadcrumbs="breadcrumbs"
                @sidebar-toggled="toggleSidebar"
              />
            </div>
          </div>
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs();
const supabase = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser();

const mainContainerClass = ref("main-container");

function toggleSidebar(collapsed: boolean) {
  return collapsed
    ? (mainContainerClass.value = "main-container sidebar-closed sbar-open")
    : (mainContainerClass.value = "main-container");
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  } else {
    router.push("/signin");
  }
}
</script>

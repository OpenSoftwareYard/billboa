<template>
  <ul class="list-unstyled menu-categories ps" id="accordionExample">
    <li :class="routeClass('/')">
      <NuxtLink to="/" class="dropdown-toggle">
        <div class="">
          <Icon name="dashicons:admin-home" />
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> -->
          <span>Dashboard</span>
        </div>
      </NuxtLink>
    </li>

    <li :class="routeClass('clients')">
      <NuxtLink to="/clients" class="dropdown-toggle">
        <div class="">
          <Icon name="dashicons:businessperson" />
          <span>Clients</span>
        </div>
      </NuxtLink>
    </li>

    <li :class="routeClass('products')">
      <NuxtLink to="/products" class="dropdown-toggle">
        <div class="">
          <Icon name="dashicons:products" />
          <span>Products</span>
        </div>
      </NuxtLink>
    </li>

    <li :class="routeClass('invoices')">
      <NuxtLink to="/invoices" class="dropdown-toggle">
        <div class="">
          <Icon name="dashicons:media-document" />
          <span>Invoices</span>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const route = useRoute();

function routeClass(path: string) {
  if (path === "/") {
    return route.path === path ? "menu active" : "menu";
  }

  return route.path.includes(path) ? "menu active" : "menu";
}
</script>

<template>
  <header class="header navbar navbar-expand-sm">
    <a
      href="javascript:void(0);"
      class="btn-toggle sidebarCollapse"
      data-placement="bottom"
      @click="toggleSidebar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-menu"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </a>
    <div class="d-flex breadcrumb-content">
      <div class="page-header">
        <div class="page-title"></div>
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li
              v-for="item in breadcrumbs"
              :key="item.name"
              :class="activeClass(item)"
            >
              <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const props = defineProps({
  breadcrumbs: {
    type: Array<Breadcrumb>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "sidebarToggled", collpsed: boolean): void;
}>();

const sidebarCollapsed = ref(false);

function activeClass(breadcrumb: Breadcrumb) {
  return breadcrumb.active ? "breadcrumb-item active" : "breadcrumb-item";
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  emit("sidebarToggled", sidebarCollapsed.value);
}
</script>

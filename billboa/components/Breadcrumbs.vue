<template>
  <div class="d-flex breadcrumb-content">
    <div class="page-header">
      <nav class="breadcrumb-style-one mb-3" aria-label="breadcrumb">
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
</template>

<script lang="ts" setup>
const props = defineProps({
  breadcrumbs: {
    type: Array<Breadcrumb>,
    required: true,
  },
});

function activeClass(breadcrumb: Breadcrumb) {
  return breadcrumb.active ? "breadcrumb-item active" : "breadcrumb-item";
}
</script>

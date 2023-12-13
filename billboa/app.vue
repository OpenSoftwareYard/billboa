<template>
  <div class="header-container">
    <header class="header navbar navbar-expand-sm">
      <ul class="navbar-item theme-brand flex-row text-center">
        <li class="nav-item theme-logo"><NuxtLink to="/">B</NuxtLink></li>
        <li class="nav-item theme-text">
          <NuxtLink to="/"> Billboa </NuxtLink>
        </li>
      </ul>
    </header>
  </div>

  <div class="main-container" id="container">
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
              <Breadcrumbs :breadcrumbs="breadcrumbs" />
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
</script>

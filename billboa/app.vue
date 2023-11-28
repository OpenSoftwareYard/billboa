<template>
  <div class="header-container container-xxl">
    <header class="header navbar navbar-expand-sm expand-header">
      <a href="javascript:void(0);" class="sidebarCollapse">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </a>
    </header>
  </div>

  <div class="main-container" id="container">
    <div class="overlay"></div>
    
    <div class="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <div class="navbar-nav theme-brancd flex-row text-center">
          <div class="nav-logo">
            <div class="nav-item theme-logo">
              <a href="index.html">
                <img src="" class="navbar-logo" alt="logo">
              </a>
            </div>

            <div class="nav-item theme-text">
              <a href="index.html" class="nav-link"> Billboa </a>
            </div>
          </div>

          <div class="nav-item sidebar-toggle">
            <div class="btn-toggle sidebarCollapse">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
            </div>
          </div>
        </div>

        <Navigation />
      </nav>
    </div>

    <div id="content" class="main-content">
      <NuxtPage />
    </div>
  </div>
</template>
<template>
  <div id="app">
    <div class="main-wrapper">
      <nav class="navbar bg-white navbar-expand-lg main-navbar border-bottom">
        <form class="form-inline mr-auto">
          <ul class="navbar-nav mr-3">
            <li>
              <a data-toggle="sidebar" class="nav-link nav-link-lg pointer"
                ><i class="fas fa-bars text-primary"></i
              ></a>
            </li>
            <li>
              <a data-toggle="search" class="nav-link nav-link-lg d-sm-none"
                ><i class="fas fa-search"></i
              ></a>
            </li>
          </ul>
          <div class="search-element">
            <b-breadcrumb
              :items="brcumb"
              class="text-primary p-0 mb-0"
            ></b-breadcrumb>
          </div>
        </form>
        <ul class="navbar-nav navbar-right">
          <li class="dropdown text-primary pointer">
            <a
              data-toggle="dropdown"
              class="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              <img
                alt="image"
                src="../assets/img/avatar/avatar-1.png"
                class="rounded-circle mr-1"
            /></a>
            <div class="dropdown-menu dropdown-menu-right">
              <!-- <a class="dropdown-item has-icon">
                <i class="far fa-user"></i> Profile
              </a> -->
              <div class="dropdown-divider"></div>
              <a
                @click="handleLogout"
                class="dropdown-item has-icon text-danger"
              >
                <i class="fas fa-sign-out-alt"></i> {{ $t('navbar.logout') }}
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="main-sidebar sidebar-style-2 bg-primary">
        <aside id="sidebar-wrapper">
          <div class="sidebar-brand bg-primary pt-2">
            <a class="text-white">Kokarmina</a>
          </div>
          <div class="sidebar-brand sidebar-brand-sm bg-primary">
            <a class="text-white">KM</a>
          </div>
          <ul class="sidebar-menu">
            <li class="nav-item dropdown">
              <a class="nav-link text-dark pointer" @click="handleDashboard">
                <dashboardIcon /><span class="text-white">{{
                  $t('sidebar.dashboard')
                }}</span></a
              >
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link has-dropdown text-white pointer"
                ><storeIcon /><span class="text-white">{{
                  $t('sidebar.store')
                }}</span></a
              >
              <ul class="dropdown-menu bg-primary">
                <li class="pointer" @click="handleCompany">
                  <a class="nav-link nav-hover bg-primary text-white">{{
                    $t('sidebar.company')
                  }}</a>
                </li>
                <li class="pointer" @click="handleOutlet">
                  <a class="nav-link nav-hover bg-primary text-white">{{
                    $t('sidebar.outlets')
                  }}</a>
                </li>
                <li class="pointer" @click="handleDepartment">
                  <a class="nav-link nav-hover bg-primary text-white">{{
                    $t('sidebar.departments')
                  }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>

      <!-- Main Content -->
      <div class="main-content" style="height: 90vh">
        <section class="section h-100">
          <div class="section-body">
            <Main />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardIcon from '../assets/icon/dashboard-icon.vue'
import storeIcon from '../assets/icon/store-icon.vue'
import xIcon from '../assets/icon/x.vue'
import tableIcon from '../assets/icon/table-icon.vue'
import productIcon from '../assets/icon/product-icon.vue'
import paymentIcon from '../assets/icon/payment-icon.vue'
import promoIcon from '../assets/icon/promo-icon.vue'

export default {
  data() {
    return {}
  },
  components: {
    dashboardIcon,
    storeIcon,
    xIcon,
    tableIcon,
    productIcon,
    paymentIcon,
    promoIcon,
  },
  async created() {},
  computed: {
    handleNavbar() {
      let name = this.$route.name
      return name
    },
    brcumb() {
      let items = []
      let path = this.$route.name.split('-')
      path.forEach((e) => {
        items.push({
          text: e,
        })
      })
      return items
    },
  },
  methods: {
    handleDashboard() {
      this.$router.push('/')
    },

    // store
    handleOutlet() {
      this.$router.push('/store-management/outlets')
    },
    handleCompany() {
      this.$router.push('/store-management/company')
    },
    handleDepartment() {
      this.$router.push('/store-management/departments')
    },

    handleLogout() {
      this.$router.push('/login')
    },
  },
}
</script>

<style>
.breadcrumb-item.active > a {
  color: gray !important;
  cursor: default;
  text-decoration: none !important;
}
.breadcrumb-item > a {
  color: gray !important;
  cursor: default;
  text-decoration: none !important;
}
</style>

import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './pages/dashboard'
import Login from './pages/login.vue'

import Outlet from './pages/store-management/outlet'
import Company from './pages/store-management/company'
import Department from './pages/store-management/department'
import DepartmentOperation from './pages/store-management/department/edit.vue'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: '/login',
        component: Login,
        name: 'Login',
        meta: {
          title: 'Login',
        },
      },

      {
        path: '/store-management/outlets',
        component: Outlet,
        name: 'Store Management / Outlets',
        meta: {
          title: 'Outlets',
        },
      },

      {
        path: '/store-management/company',
        component: Company,
        name: 'Store Management / Company',
        meta: {
          title: 'Company',
        },
      },

      {
        path: '/store-management/departments',
        component: Department,
        name: 'Store Management / Departments',
        meta: {
          title: 'Departments',
        },
      },
      {
        path: '/store-management/departments/add',
        component: DepartmentOperation,
        name: 'Store Management / Departments / Add',
        meta: {
          title: 'Departments Add',
        },
      },
      {
        path: '/store-management/departments/:id',
        component: DepartmentOperation,
        name: 'Store Management / Departments / Edit',
        meta: {
          title: 'Departments Edit',
        },
      },
    ],
  })

  return router
}

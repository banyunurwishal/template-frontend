import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './pages/dashboard'
import Login from './pages/login.vue'

import Material from './pages/data-master/material'
import MaterialActions from './pages/data-master/material/edit.vue'
import Unit from './pages/data-master/unit'
import UnitActions from './pages/data-master/unit/edit.vue'
import Supplier from './pages/data-master/supplier'
import SupplierActions from './pages/data-master/supplier/edit.vue'
import Mdl from './pages/data-master/mdl'
import MdlActions from './pages/data-master/mdl/edit.vue'

import Outlet from './pages/store-management/outlet'
import Company from './pages/store-management/company'
import Department from './pages/store-management/department'
import DepartmentOperation from './pages/store-management/department/edit.vue'

import ProductCategory from './pages/product-management/product-category'
import ProductCategoryOperation from './pages/product-management/product-category/edit.vue'
import SideDish from './pages/product-management/side-dish'
import SideDishOperation from './pages/product-management/side-dish/edit.vue'
import Product from './pages/product-management/product'
import ProductOperation from './pages/product-management/product/edit.vue'
import ProductImport from './pages/product-management/product/import.vue'
import ProductPackage from './pages/product-management/product-package'
import ProductPackageOperation from './pages/product-management/product-package/edit.vue'

import Payment from './pages/payment-management/payment'
import PaymentOperation from './pages/payment-management/payment/edit.vue'

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
        path: '/master-data/material',
        component: Material,
        name: 'Master Data / Material',
        meta: {
          title: 'Material',
        },
      },
      {
        path: '/master-data/material/add',
        component: MaterialActions,
        name: 'Master Data / Material / Add',
        meta: {
          title: 'Add Material',
        },
      },
      {
        path: '/master-data/material/:id',
        component: MaterialActions,
        name: 'Master Data / Material / Edit',
        meta: {
          title: 'Edit Material',
        },
      },
      {
        path: '/master-data/unit',
        component: Unit,
        name: 'Master Data / Unit ',
        meta: {
          title: 'Unit',
        },
      },
      {
        path: '/master-data/unit/add',
        component: UnitActions,
        name: 'Master Data / Unit / Add',
        meta: {
          title: 'Add Unit',
        },
      },
      {
        path: '/master-data/unit/:id',
        component: UnitActions,
        name: 'Master Data / Unit / Edit',
        meta: {
          title: 'Edit Unit',
        },
      },
      {
        path: '/master-data/supplier',
        component: Supplier,
        name: 'Master Data / Supplier',
        meta: {
          title: 'Supplier',
        },
      },
      {
        path: '/master-data/supplier/add',
        component: SupplierActions,
        name: 'Master Data / Supplier / Add',
        meta: {
          title: 'Add Supplier',
        },
      },
      {
        path: '/master-data/supplier/:id',
        component: SupplierActions,
        name: 'Master Data / Supplier / Edit',
        meta: {
          title: 'Edit Supplier',
        },
      },
      {
        path: '/master-data/mdl',
        component: Mdl,
        name: 'Master Data / MDL',
        meta: {
          title: 'MDL',
        },
      },
      {
        path: '/master-data/mdl/add',
        component: MdlActions,
        name: 'Master Data / MDL / Add',
        meta: {
          title: 'Add MDL',
        },
      },
      {
        path: '/master-data/mdl/:id',
        component: MdlActions,
        name: 'Master Data / MDL / Edit',
        meta: {
          title: 'Edit MDL',
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

      {
        path: '/product-management/product-category',
        component: ProductCategory,
        name: 'Product Management / Product Category',
        meta: {
          title: 'Product Category',
        },
      },
      {
        path: '/product-management/product-category/add',
        component: ProductCategoryOperation,
        name: 'Product Management / Product Category / Add',
        meta: {
          title: 'Product Category Add',
        },
      },
      {
        path: '/product-management/product-category/:id',
        component: ProductCategoryOperation,
        name: 'Product Management / Product Category / Edit',
        meta: {
          title: 'Product Category Edit',
        },
      },

      {
        path: '/product-management/side-dish',
        component: SideDish,
        name: 'Product Management / Side Dish',
        meta: {
          title: 'Side Dish',
        },
      },
      {
        path: '/product-management/side-dish/add',
        component: SideDishOperation,
        name: 'Product Management / Side Dish / Add',
        meta: {
          title: 'Side Dish Add',
        },
      },
      {
        path: '/product-management/side-dish/:id',
        component: SideDishOperation,
        name: 'Product Management / Side Dish / Edit',
        meta: {
          title: 'Side Dish Edit',
        },
      },

      {
        path: '/product-management/product',
        component: Product,
        name: 'Product Management / Product',
        meta: {
          title: 'Product',
        },
      },
      {
        path: '/product-management/product/import',
        component: ProductImport,
        name: 'Product Management / Product / Import',
        meta: {
          title: 'Product Import',
        },
      },
      {
        path: '/product-management/product/add',
        component: ProductOperation,
        name: 'Product Management / Product / Add',
        meta: {
          title: 'Product Add',
        },
      },
      {
        path: '/product-management/product/:id',
        component: ProductOperation,
        name: 'Product Management / Product / Edit',
        meta: {
          title: 'Product Edit',
        },
      },

      {
        path: '/product-management/product-package',
        component: ProductPackage,
        name: 'Product Management / Product Package',
        meta: {
          title: 'Product Package',
        },
      },
      {
        path: '/product-management/product-package/add',
        component: ProductPackageOperation,
        name: 'Product Management / Product Package / Add',
        meta: {
          title: 'Product Package Add',
        },
      },
      {
        path: '/product-management/product-package/:id',
        component: ProductPackageOperation,
        name: 'Product Management / Product Package / Edit',
        meta: {
          title: 'Product Package Edit',
        },
      },

      {
        path: '/payment-management/payment',
        component: Payment,
        name: 'Payment Management / Payment',
        meta: {
          title: 'Payment',
        },
      },
      {
        path: '/payment-management/payment/add',
        component: PaymentOperation,
        name: 'Payment Management / Payment / Add',
        meta: {
          title: 'Payment Add',
        },
      },
      {
        path: '/payment-management/payment/:id',
        component: PaymentOperation,
        name: 'Payment Management / Payment / Edit',
        meta: {
          title: 'Payment Edit',
        },
      },
    ],
  })

  return router
}

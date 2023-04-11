<template>
  <div id="section" class="">
    <section
      class="section mt-5"
      style="padding-left: 2rem !important; padding-right: 2rem !important"
    >
      <div class="section-body">
        <b-row class="px-3">
          <b-col>
            <div>
              <h4>Product Package</h4>
            </div>
          </b-col>
          <b-col class="text-right">
            <!-- <b-button
              size="md"
              class="rounded-8 px-4"
              variant="primary"
              @click="handleAdd"
            >
              <exportIcon class="btn-icon" style="margin-bottom: 2px" />
              &nbsp;Export
            </b-button>
            <b-button
              size="md"
              class="rounded-8 px-4"
              variant="primary"
              @click="handleAdd"
            >
              <importIcon class="btn-icon" style="margin-bottom: 2px" />
              &nbsp;Import
            </b-button> -->
            <b-button
              size="md"
              class="rounded-8 px-4"
              variant="primary"
              @click="handleAdd"
            >
              <font-awesome-icon
                :icon="['fas', 'plus']"
                style="font-size: 14px"
              />
              Add New Product Package
            </b-button>
          </b-col>
        </b-row>
        <b-row class="px-3 mt-2">
          <b-col>
            <b-table
              :items="listProductPackage"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="fields"
              responsive
              hover
              striped
              class="table-header shadow-table"
              show-empty
            >
              <template #empty="data">
                <emptyTable />
              </template>
              <template #cell(outlet)="data">
                <span
                  v-for="(item, index) in data.item.product_package_has_outlets"
                  :key="index"
                >
                  {{
                    index > 0
                      ? ', ' + item.outlets.outlet_name
                      : item.outlets.outlet_name
                  }}
                </span>
              </template>
              <template #cell(actions)="data">
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                  dropleft
                >
                  <template #button-content>
                    <dots />
                  </template>
                  <b-dropdown-item @click="handleEdit(data.item)">
                    Edit
                  </b-dropdown-item>
                  <b-dropdown-item @click="handleDelete(data.item)">
                    Delete
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </b-table>
            <div class="mt-3">
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                align="right"
                class="customPagination"
              ></b-pagination>
            </div>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
import dots from '@/assets/icon/dots.vue'
import importIcon from '@/assets/icon/import.vue'
import exportIcon from '@/assets/icon/export.vue'
import { mapActions, mapState } from 'vuex'
import emptyTable from '@/components/inputable/emptyTable.vue'

export default {
  name: 'IndexPage',
  components: { importIcon, exportIcon, dots, emptyTable },
  async created() {
    this.$processLoading.SHOW({})
    await this.fetchLists()
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: [
        {
          key: 'outlet',
          label: 'Outlet Name',
        },
        {
          key: 'product_package_name',
          label: 'Product Name',
        },
        {
          key: 'product_package_price',
          label: 'Price',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      listProductPackage: (state) => state.productPackage.lists,
    }),
  },
  methods: {
    ...mapActions('productPackage', ['fetchLists', 'deleteModel']),
    handleAdd() {
      this.$router.push('/product-management/product-package/add')
    },
    handleEdit(data) {
      this.$router.push(
        '/product-management/product-package/' + data.id_product_package
      )
    },

    async handleDelete(data) {
      this.deleteModal().then(async (result) => {
        if (result.isConfirmed) {
          this.$processLoading.SHOW({})
          await this.deleteModel(data.id_product_package)
            .then((res) => {
              this.$processLoading.HIDE({})
              this.alertToastSuccess('Data Berhasil Dihapus')
              this.fetchLists()
            })
            .catch((err) => {
              console.log(err)
              this.$processLoading.HIDE({})
              this.alertToastFail('Data Gagal Dihapus')
            })
        }
      })
    },
  },
}
</script>

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
              <h4>Products</h4>
            </div>
          </b-col>
          <b-col class="text-right">
            <b-button
              size="md"
              class="rounded-8 px-4"
              variant="primary"
              @click="handleImport"
            >
              <importIcon class="btn-icon" style="margin-bottom: 2px" />
              &nbsp;Import
            </b-button>
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
              Add New Product
            </b-button>
          </b-col>
        </b-row>
        <b-row class="px-3 mt-3">
          <b-col>
            <b-table
              :items="items"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="fields"
              responsive
              hover
              striped
              class="table-header shadow-table"
            >
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
                  <b-dropdown-item> Edit </b-dropdown-item>
                  <b-dropdown-item> Delete </b-dropdown-item>
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
import plus from '@/assets/icon/plus.vue'
import importIcon from '@/assets/icon/import.vue'

export default {
  name: 'IndexPage',
  components: { dots, plus, importIcon },
  async created() {
    this.$processLoading.SHOW({})
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      items: [
        {
          outlet_name: 'name',
          department: 'name',
          category_name: 'name',
          product_name: 'name',
          price: 'name',
        },
      ],
      fields: [
        {
          key: 'outlet_name',
          label: 'Outlet Name',
        },
        {
          key: 'department',
          label: 'Department',
        },
        {
          key: 'category_name',
          label: 'Category Name',
        },
        {
          key: 'product_name',
          label: 'Product Name',
        },
        {
          key: 'price',
          label: 'Price',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
    }
  },
  computed: {},
  methods: {
    handleAdd() {
      this.$router.push('/product-management/product/add')
    },
    handleImport() {
      this.$router.push('/product-management/product/import')
    },
    handleEdit(data) {
      this.$router.push('/product-management/product/' + data.id)
    },

    async handleDelete(data) {
      this.deleteModal().then(async (result) => {
        if (result.isConfirmed) {
          this.$processLoading.SHOW({})
          await this.deleteModel(data.uuid)
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

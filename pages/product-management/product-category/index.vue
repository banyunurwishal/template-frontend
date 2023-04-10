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
              <h4>Product Category</h4>
            </div>
          </b-col>
          <b-col class="text-right">
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
              Add New Product Category
            </b-button>
          </b-col>
        </b-row>
        <b-row class="px-3 mt-3">
          <b-col>
            <b-table
              :items="listProductCategory"
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
import { mapActions, mapState } from 'vuex'
import dots from '@/assets/icon/dots.vue'
import plus from '@/assets/icon/plus.vue'

export default {
  name: 'IndexPage',
  components: { dots, plus },
  async created() {
    this.$processLoading.SHOW({})
    await this.fetchLists()
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
        },
      ],
      fields: [
        {
          key: 'outlet.outlet_name',
          label: 'Outlet Name',
        },
        {
          key: 'department.department_name',
          label: 'Department',
        },
        {
          key: 'category_name',
          label: 'Category Name',
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
      listProductCategory: (state) => state.productCategory.lists,
    }),
  },
  methods: {
    ...mapActions('productCategory', ['fetchLists', 'deleteModel']),
    handleAdd() {
      this.$router.push('/product-management/product-category/add')
    },
    handleEdit(data) {
      this.$router.push(
        '/product-management/product-category/' + data.id_product_category
      )
    },

    async handleDelete(data) {
      this.deleteModal().then(async (result) => {
        if (result.isConfirmed) {
          this.$processLoading.SHOW({})
          await this.deleteModel(data.id_product_category)
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

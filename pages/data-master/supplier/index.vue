<template>
  <div id="section">
    <section
      class="section mt-5"
      style="padding-left: 2rem !important; padding-right: 2rem !important"
    >
      <div class="section-body">
        <b-row>
          <b-col cols="10">
            <h4>Supplier</h4>
          </b-col>
          <b-col cols="2" class="text-right">
            <a
              class="btn btn-primary text-white ml-auto bg-primary-q"
              @click="handleAdd()"
            >
              <i class="fas fa-plus" style="font-size: 12px"> </i> Add Supplier
            </a>
          </b-col>
        </b-row>
        <b-row class="px-3 mt-3">
          <b-col>
            <b-table
              :items="listSupplier"
              :per-page="perPage"
              :current-page="currentPage"
              responsive
              hover
              striped
              class="table-header shadow-table"
              :fields="header"
              show-empty
            >
              <template #empty="data">
                <emptyTable />
              </template>
              <template #cell(outlet)="data">
                <span
                  v-for="(item, index) in data.item.supplier_has_outlets"
                  :key="index"
                >
                  {{
                    index > 0
                      ? ', ' + item.outlets.outlet_name
                      : item.outlets.outlet_name
                  }}
                </span>
              </template>
              <template #cell(actions)="row" class="text-right">
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                  dropleft
                >
                  <template #button-content>
                    <dots />
                  </template>
                  <b-dropdown-item @click="handleEdit(row.item)">
                    Edit
                  </b-dropdown-item>
                  <b-dropdown-item @click="handleDelete(row.item)">
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
import emptyTable from '@/components/inputable/emptyTable.vue'

export default {
  name: 'supplier',
  components: { dots, plus, emptyTable },
  async created() {
    this.$processLoading.SHOW({})
    await this.fetchLists()

    this.$processLoading.HIDE({})
  },

  data() {
    return {
      perPage: 10,
      currentPage: 1,
      header: [
        {
          key: 'outlet',
          label: 'Outlet Name',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'address',
          label: 'Adress',
        },
        {
          key: 'phone',
          label: 'Phone',
        },
        {
          key: 'pic',
          label: 'Person In Change',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.listSupplier.length
    },
    ...mapState({
      listSupplier: (state) => state.supplier.lists,
    }),
  },
  methods: {
    ...mapActions('supplier', ['fetchLists', 'deleteModel']),

    handleAdd() {
      this.$router.push('/master-data/supplier/add')
    },
    handleEdit(data) {
      this.$router.push('/master-data/supplier/' + data.id)
    },

    async handleDelete(data) {
      this.deleteModal().then(async (result) => {
        if (result.isConfirmed) {
          this.$processLoading.SHOW({})
          await this.deleteModel(data.id)
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
<style>
.table-header .table:not(.table-sm) thead th {
  background-color: #fff !important;
}
</style>

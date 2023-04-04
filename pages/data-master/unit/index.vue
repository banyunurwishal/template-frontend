<template>
  <div id="section">
    <section
      class="section mt-5"
      style="padding-left: 2rem !important; padding-right: 2rem !important"
    >
      <div class="section-body">
        <b-row>
          <b-col cols="10">
            <h4>Unit</h4>
          </b-col>
          <b-col cols="2" class="text-right">
            <a
              class="btn btn-primary text-white ml-auto bg-primary-q"
              @click="handleAdd()"
            >
              <i class="fas fa-plus" style="font-size: 12px"> </i> Add Unit
            </a>
          </b-col>
        </b-row>
        <b-row class="px-3 mt-3">
          <b-col>
            <b-table
              :items="items"
              :per-page="perPage"
              :current-page="currentPage"
              responsive
              hover
              striped
              class="table-header shadow-table"
              :fields="header"
            >
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
import dots from '@/assets/icon/dots.vue'
import plus from '@/assets/icon/plus.vue'

export default {
  name: 'unit',
  components: { dots, plus },
  async created() {
    this.$processLoading.SHOW({})
    this.$processLoading.HIDE({})
  },
  async created() {
    this.$processLoading.SHOW({})
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      header: [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'short_name',
          label: 'Short Name',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      items: [
        { id: 1, name: 'slice', short_name: 'slc' },
        { id: 1, name: 'scoop', short_name: 'sc' },
      ],
    }
  },
  computed: {},
  methods: {
    handleAdd() {
      this.$router.push('/master-data/unit/add')
    },
    handleEdit(data) {
      this.$router.push('/master-data/unit/' + data.id)
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
<style>
.table-header .table:not(.table-sm) thead th {
  background-color: #fff !important;
}
</style>

<template>
  <div id="department" class="">
    <section
      class="section mt-5"
      style="padding-left: 2rem !important; padding-right: 2rem !important"
    >
      <div class="section-body">
        <b-row class="px-3">
          <b-col>
            <div>
              <h4>Departments</h4>
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
              Add New Departments
            </b-button>
          </b-col>
        </b-row>
        <b-row class="px-3 mt-3">
          <b-col>
            <b-table
              :items="listDepartment"
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
import emptyTable from '@/components/inputable/emptyTable.vue'

export default {
  name: 'IndexPage',
  components: { dots, plus, emptyTable },
  async created() {
    this.$processLoading.SHOW({})
    // await this.fetchLists()
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
          key: 'department_name',
          label: 'Department Name',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      listDepartment: [
        {
          outlet: 'outlet',
          department_name: 'Outlet Name',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      // listDepartment: (state) => state.department.lists,
    }),
  },
  methods: {
    // ...mapActions('department', ['fetchLists', 'deleteModel']),
    handleAdd() {
      this.$router.push('/store-management/departments/add')
    },

    handleEdit(data) {
      this.$router.push('/store-management/departments/' + data.id)
    },

    async handleDelete(data) {
      // this.deleteModal().then(async (result) => {
      //   if (result.isConfirmed) {
      //     this.$processLoading.SHOW({})
      //     await this.deleteModel(data.id_department)
      //       .then((res) => {
      //         this.$processLoading.HIDE({})
      //         this.alertToastSuccess('Data Berhasil Dihapus')
      //         this.fetchLists()
      //       })
      //       .catch((err) => {
      //         console.log(err)
      //         this.$processLoading.HIDE({})
      //         this.alertToastFail('Data Gagal Dihapus')
      //       })
      //   }
      // })
    },
  },
}
</script>

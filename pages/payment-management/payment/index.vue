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
              <h4>Bank & E-Payment</h4>
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
              Add Bank & E-Payment
            </b-button>
          </b-col>
        </b-row>
        <b-row class="px-3 mt-3">
          <b-col>
            <b-table
              :items="listPayment"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="fields"
              responsive
              hover
              striped
              class="table-header shadow-table"
            >
              <template #cell(outlet)="data">
                <span
                  v-for="(item, index) in data.item.bank_has_outlets"
                  :key="index"
                >
                  {{
                    index > 0
                      ? ', ' + item.outlets.outlet_name
                      : item.outlets.outlet_name
                  }}
                </span>
              </template>
              <template #cell(type)="data">
                <div v-if="data.item.bank_type === 1"><span>Bank</span></div>
                <div v-else-if="data.item.bank_type === 2">
                  <span>E-Payment</span>
                </div>
                <div v-else>-</div>
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
          key: 'bank_name',
          label: 'Bank',
        },
        {
          key: 'type',
          label: 'Type',
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
      return this.listPayment.length
    },
    ...mapState({
      listPayment: (state) => state.payment.lists,
    }),
  },
  methods: {
    ...mapActions('payment', ['fetchLists', 'deleteModel']),
    handleAdd() {
      this.$router.push('/payment-management/payment/add')
    },
    handleEdit(data) {
      this.$router.push('/payment-management/payment/' + data.id_bank)
    },

    async handleDelete(data) {
      this.deleteModal().then(async (result) => {
        if (result.isConfirmed) {
          this.$processLoading.SHOW({})
          await this.deleteModel(data.id_bank)
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

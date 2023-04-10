<template>
  <div id="edit-section" class="">
    <section
      class="section mt-5"
      style="padding-left: 2rem !important; padding-right: 2rem !important"
    >
      <div class="section-body">
        <b-row class="px-3">
          <b-col>
            <b-row>
              <b-col>
                <h4>
                  {{
                    this.$route.params.id
                      ? 'Edit New Product Package'
                      : 'Create New Product Package'
                  }}
                </h4>
              </b-col>
            </b-row>

            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.prevent.stop="handleSubmit(onSubmit)">
                <b-row class="mt-3">
                  <b-col>
                    <b-card class="shadow-form">
                      <b-tabs content-class="mt-3" pills>
                        <b-tab title="Information">
                          <ValidationProvider
                            name="package"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Package Name*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.product_package_name"
                              >
                              </b-form-input>
                              <b-form-invalid-feedback
                                id="input-1-live-feedback"
                                >{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback
                              >
                            </b-form-group>
                          </ValidationProvider>

                          <ValidationProvider
                            name="price"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Price*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.product_package_price"
                              >
                              </b-form-input>
                              <b-form-invalid-feedback
                                id="input-1-live-feedback"
                                >{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback
                              >
                            </b-form-group>
                          </ValidationProvider>

                          <ValidationProvider
                            name="cost"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Cost of Good Sold*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.product_package_cogs"
                              >
                              </b-form-input>
                              <b-form-invalid-feedback
                                id="input-1-live-feedback"
                                >{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback
                              >
                            </b-form-group>
                          </ValidationProvider>

                          <ValidationProvider
                            name="tax"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Tax %*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.ppn"
                              >
                              </b-form-input>
                              <b-form-invalid-feedback
                                id="input-1-live-feedback"
                                >{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback
                              >
                            </b-form-group>
                          </ValidationProvider>

                          <ValidationProvider
                            name="service"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Service*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.service"
                              >
                              </b-form-input>
                              <b-form-invalid-feedback
                                id="input-1-live-feedback"
                                >{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback
                              >
                            </b-form-group>
                          </ValidationProvider>
                          <ValidationProvider
                            name="outlet"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <SelectOutlet
                              :state="getValidationState(validationContext)"
                              v-model="formModel.id_outlet"
                              :hasData="childOutlet"
                            />
                          </ValidationProvider>
                        </b-tab>
                        <b-tab title="Side Dish">
                          <div class="text-right mb-3">
                            <b-button
                              variant="primary"
                              @click="handleItemSideDish"
                            >
                              Add Side Dish
                            </b-button>
                          </div>
                          <div
                            v-for="(
                              item, index
                            ) in formModel.product_package_sidedish"
                            :key="index"
                          >
                            <div
                              class="border rounded-lg p-3"
                              :class="index > 0 ? 'my-3' : ''"
                            >
                              <b-row>
                                <b-col>
                                  <label for="">Side dish</label>
                                  <b-form-select
                                    :options="listSideDish"
                                    v-model="item.id_sidedish"
                                  >
                                  </b-form-select>
                                </b-col>
                                <b-col class="text-right" align-self="start">
                                  <b-button
                                    variant="danger"
                                    @click="handleDeleteItemSideDish(index)"
                                    :class="
                                      formModel.product_package_sidedish
                                        .length > 1
                                        ? ''
                                        : 'invisible'
                                    "
                                  >
                                    <font-awesome-icon
                                      :icon="['fas', 'trash']"
                                    />
                                  </b-button>
                                </b-col>
                              </b-row>
                            </div>
                          </div>
                        </b-tab>
                        <b-tab title="Package">
                          <div class="text-right mb-3">
                            <b-button variant="primary" @click="handleItem">
                              Add Department
                            </b-button>
                          </div>
                          <div
                            v-for="(
                              item, index
                            ) in formModel.product_package_group"
                            :key="index"
                          >
                            <div
                              class="border rounded-lg p-3"
                              :class="index > 0 ? 'my-3' : ''"
                            >
                              <b-row>
                                <b-col>
                                  <ValidationProvider
                                    name="department"
                                    :rules="{ required: true }"
                                    v-slot="validationContext"
                                  >
                                    <b-form-group label="Department">
                                      <b-form-select
                                        :state="
                                          getValidationState(validationContext)
                                        "
                                        :options="listDepartment"
                                        v-model="item.id_department"
                                      >
                                      </b-form-select>
                                      <b-form-invalid-feedback
                                        id="input-1-live-feedback"
                                        >{{
                                          validationContext.errors[0]
                                        }}</b-form-invalid-feedback
                                      >
                                    </b-form-group>
                                  </ValidationProvider>
                                  <b-form-group
                                    label="Package Item"
                                    v-for="(
                                      items, index2
                                    ) in item.product_package_menu"
                                    :key="index2"
                                  >
                                    <div class="d-flex">
                                      <b-form-select v-model="items.id_product">
                                      </b-form-select>
                                      <b-button
                                        variant="danger"
                                        class="ml-sm-3"
                                        @click="
                                          handleDeleteMenuItem(index, index2)
                                        "
                                        :class="
                                          formModel.product_package_group[index]
                                            .product_package_menu.length > 0
                                            ? ''
                                            : 'invisible'
                                        "
                                      >
                                        <font-awesome-icon
                                          :icon="['fas', 'trash']"
                                        />
                                      </b-button>
                                    </div>
                                  </b-form-group>

                                  <ValidationProvider
                                    name="Quantity"
                                    :rules="{ required: true }"
                                    v-slot="validationContext"
                                  >
                                    <b-form-group label="Quantity">
                                      <b-form-input
                                        :state="
                                          getValidationState(validationContext)
                                        "
                                        v-model="item.max_qty"
                                      >
                                      </b-form-input>
                                      <b-form-invalid-feedback
                                        id="input-1-live-feedback"
                                        >{{
                                          validationContext.errors[0]
                                        }}</b-form-invalid-feedback
                                      >
                                    </b-form-group>
                                  </ValidationProvider>
                                </b-col>
                                <b-col class="text-right" align-self="start">
                                  <b-button
                                    variant="danger"
                                    @click="handleDeleteItem(index)"
                                    :class="
                                      formModel.product_package_group.length > 1
                                        ? ''
                                        : 'invisible'
                                    "
                                  >
                                    <font-awesome-icon
                                      :icon="['fas', 'trash']"
                                    />
                                  </b-button>
                                  <b-button
                                    variant="primary"
                                    @click="handleAddMenuItem(index)"
                                  >
                                    <font-awesome-icon
                                      :icon="['fas', 'plus']"
                                    />
                                    Add Menu
                                  </b-button>
                                </b-col>
                              </b-row>
                            </div>
                          </div>
                        </b-tab>
                      </b-tabs>
                    </b-card>
                  </b-col>
                </b-row>
                <b-row class="mb-5">
                  <b-col class="text-right">
                    <b-button
                      size="md"
                      class="rounded-lg px-4"
                      variant="danger"
                      @click="handleCancelBtn"
                    >
                      <font-awesome-icon :icon="['fas', 'x']" />&nbsp; Batal
                    </b-button>
                    <b-button
                      type="submit"
                      size="md"
                      class="rounded-lg px-4"
                      variant="primary"
                    >
                      <font-awesome-icon :icon="['fas', 'check']" />&nbsp;
                      Simpan
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </ValidationObserver>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import SelectOutlet from '@/components/form/SelectOutlet/index.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    SelectOutlet,
  },
  name: 'IndexPage',
  async created() {
    this.$processLoading.SHOW({})
    await this.fetchListDepartment()
    await this.fetchListSideDish()
    if (this.$route.params.id) {
      await this.handleEditModel()
    }
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      formModel: {
        product_package_group: [
          {
            id_department: '',
            product_package_menu: [],
            max_qty: '',
          },
        ],
        product_package_sidedish: [
          {
            id_sidedish: '',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      editedModel: (state) => state.productPackage.model,
      listDepartment: (state) => {
        let data = []
        state.options.listDepartment.forEach((item) => {
          data.push({
            text: item.department_name,
            value: item.id_department,
          })
        })
        return data
      },
      listSideDish: (state) => {
        let data = []
        state.options.listSideDish.forEach((item) => {
          data.push({
            text: item.sidedish_name,
            value: item.id_sidedish,
          })
        })
        return data
      },
    }),
  },
  methods: {
    ...mapActions('productPackage', [
      'fetchLists',
      'createModel',
      'fetchModel',
      'updateModel',
    ]),
    ...mapActions('options', ['fetchListDepartment', 'fetchListSideDish']),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleItem() {
      this.formModel.product_package_group.push({
        id_department: '',
        product_package_menu: [],
        max_qty: '',
      })
    },

    handleItemSideDish() {
      this.formModel.product_package_sidedish.push({
        id_sidedish: '',
      })
    },

    handleAddMenuItem(index) {
      this.formModel.product_package_group[index].product_package_menu.push({
        id_product: '',
      })
    },

    handleDeleteItem(index) {
      this.formModel.product_package_group.splice(index, 1)
    },

    handleDeleteItemSideDish(index) {
      this.formModel.product_package_sidedish.splice(index, 1)
    },

    handleDeleteMenuItem(index, index2) {
      this.formModel.product_package_group[index].product_package_menu.splice(
        index2,
        1
      )
    },

    handleCancelBtn() {
      this.$router.push('/product-management/product-package')
    },
    async onSubmit() {},
  },
}
</script>

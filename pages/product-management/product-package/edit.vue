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
                                number
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
                                number
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
                                number
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
                                number
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
                              v-model="formModel.id_outlets"
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
                                    <b-form-group label="Department*">
                                      <b-form-select
                                        :state="
                                          getValidationState(validationContext)
                                        "
                                        :options="listDepartment"
                                        v-model="item.id_department"
                                        @change="
                                          handleChangeDepartment(
                                            item.id_department,
                                            index
                                          )
                                        "
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
                                      <b-form-select
                                        :options="item.menuObj"
                                        v-model="items.id_product"
                                      >
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
                                    <b-form-group label="Quantity*">
                                      <b-form-input
                                        :state="
                                          getValidationState(validationContext)
                                        "
                                        v-model="item.max_qty"
                                        number
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
      childOutlet: [],
      formModel: {
        product_package_group: [
          {
            menuObj: {},
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
      listProductMenu: (state) => {
        let data = []
        state.options.listProductMenu.forEach((item) => {
          data.push({
            text: item.product_name,
            value: item.id_product,
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
    ...mapActions('options', [
      'fetchListDepartment',
      'fetchListSideDish',
      'fetchListProductMenu',
    ]),
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

    async handleChangeDepartment(id, index) {
      this.$processLoading.SHOW({})
      await this.fetchListProductMenu(id)
      let menu = {}
      Object.assign(menu, this.listProductMenu)
      this.$set(this.formModel.product_package_group[index], 'menuObj', menu)
      this.$processLoading.HIDE({})
    },

    handleCancelBtn() {
      this.$router.push('/product-management/product-package')
    },

    async handleEditModel() {
      let id = await this.$route.params.id
      await this.fetchModel(id)
      if (this.editedModel) {
        let dataContainer = {}
        let outlet = []
        let sideDish = []
        let productPackage = []
        Object.assign(dataContainer, this.editedModel)
        dataContainer.product_package_has_outlets.forEach((item) => {
          outlet.push(item.outlets.id_outlet)
        })
        dataContainer.product_package_sidedish.forEach((item) => {
          sideDish.push({
            id_sidedish: item.side_dish.id_sidedish,
          })
        })
        dataContainer.product_package_group.forEach(async (item, index) => {
          let menu = []
          item.product_package_menu.forEach((e) => {
            menu.push({
              id_product: e.product.id_product,
            })
          })
          productPackage.push({
            id_department: item.id_department,
            max_qty: item.max_qty,
            product_package_menu: menu,
          })
          await this.handleChangeDepartment(item.id_department, index)
        })
        dataContainer.product_package_sidedish = sideDish
        dataContainer.product_package_group = productPackage
        this.childOutlet = outlet
        this.formModel = dataContainer
        console.log(this.formModel)
      }
    },

    async onSubmit() {
      delete this.formModel.product_package_group.forEach((item) => {
        delete item.menuObj
      })
      this.$processLoading.SHOW({})
      if (this.editedModel) {
        this.formModel.product_package_cogs = Number(
          this.formModel.product_package_cogs
        )
        this.formModel.ppn = Number(this.formModel.ppn)
        this.formModel.service = Number(this.formModel.service)
        await this.updateModel(this.formModel)
          .then((res) => {
            this.$processLoading.HIDE({})
            this.alertToastSuccess('Data Berhasil Disimpan')
            this.fetchLists()
            this.handleCancelBtn()
          })
          .catch((err) => {
            this.$processLoading.HIDE({})
            console.log(err)
            this.alertToastFail('Data gagal Disimpan')
          })
      } else {
        await this.createModel(this.formModel)
          .then((res) => {
            this.$processLoading.HIDE({})
            this.alertToastSuccess('Data Berhasil Disimpan')
            this.fetchLists()
            this.handleCancelBtn()
          })
          .catch((err) => {
            this.$processLoading.HIDE({})
            console.log(err)
            this.alertToastFail('Data gagal Disimpan')
          })
      }
    },
  },
}
</script>

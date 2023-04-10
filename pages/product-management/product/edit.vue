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
                      ? 'Edit New Product'
                      : 'Create New Product'
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
                            name="department"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Department*">
                              <b-form-select
                                :state="getValidationState(validationContext)"
                                :options="listDepartment"
                                v-model="formModel.id_department"
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

                          <ValidationProvider
                            name="category"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Category*">
                              <b-form-select
                                :state="getValidationState(validationContext)"
                                :options="listProductCategory"
                                v-model="formModel.id_product_category"
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

                          <ValidationProvider
                            name="product_name"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Product Name*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.product_name"
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
                                number
                                :state="getValidationState(validationContext)"
                                v-model="formModel.product_price"
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
                                number
                                :state="getValidationState(validationContext)"
                                v-model="formModel.product_cogs"
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
                                number
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
                                number
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
                            name="product_code"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Product Code*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.code"
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

                          <b-form-input v-model="formModel.status" hidden>
                          </b-form-input>

                          <ValidationProvider
                            name="product_image"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Product Image*">
                              <b-form-file
                                :state="getValidationState(validationContext)"
                                v-model="formModel.image"
                              >
                              </b-form-file>
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
                            v-for="(item, index) in formModel.product_sidedish"
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
                                      formModel.product_sidedish.length > 1
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
                        <b-tab title="Ingredients">
                          <div class="text-right mb-3">
                            <b-button variant="primary" @click="handleItem">
                              Add Ingredient
                            </b-button>
                          </div>
                          <div
                            v-for="(
                              item, index
                            ) in formModel.product_ingredient"
                            :key="index"
                          >
                            <div
                              class="border rounded-lg p-3"
                              :class="index > 0 ? 'my-3' : ''"
                            >
                              <b-row>
                                <b-col>
                                  <b-form-group label="Ingredient">
                                    <b-form-select
                                      :options="listMaterials"
                                      v-model="item.id_material"
                                    >
                                    </b-form-select>
                                  </b-form-group>
                                  <b-form-group label="Quantity">
                                    <b-form-input
                                      number
                                      v-model="item.quantity"
                                    >
                                    </b-form-input>
                                  </b-form-group>
                                </b-col>
                                <b-col class="text-right" align-self="start">
                                  <b-button
                                    variant="danger"
                                    @click="handleDeleteItem(index)"
                                    :class="
                                      formModel.product_ingredient.length > 1
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
    await this.fetchListMaterials()
    await this.fetchListProductCategory()
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
        product_ingredient: [
          {
            id_material: '',
            quantity: null,
          },
        ],
        product_sidedish: [
          {
            id_sidedish: '',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      editedModel: (state) => state.product.model,
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
      listMaterials: (state) => {
        let data = []
        state.options.listMaterials.forEach((item) => {
          data.push({
            text: item.name,
            value: item.id,
            unit: item.unit,
          })
        })
        return data
      },
      listProductCategory: (state) => {
        let data = []
        state.options.listProductCategory.forEach((item) => {
          data.push({
            text: item.category_name,
            value: item.id_product_category,
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
    ...mapActions('product', [
      'fetchLists',
      'createModel',
      'fetchModel',
      'updateModel',
    ]),
    ...mapActions('options', [
      'fetchListDepartment',
      'fetchListMaterials',
      'fetchListProductCategory',
      'fetchListSideDish',
    ]),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleItem() {
      this.formModel.product_ingredient.push({
        id_material: '',
        quantity: null,
      })
    },

    handleItemSideDish() {
      this.formModel.product_sidedish.push({
        id_sidedish: '',
      })
    },

    handleDeleteItem(index) {
      this.formModel.product_ingredient.splice(index, 1)
    },

    handleDeleteItemSideDish(index) {
      this.formModel.product_sidedish.splice(index, 1)
    },

    handleCancelBtn() {
      this.$router.push('/product-management/product')
    },

    async handleEditModel() {
      let id = await this.$route.params.id
      await this.fetchModel(id)
      if (this.editedModel) {
        let dataContainer = {}
        let outlet = []
        let ingred = []
        let sideDis = []
        Object.assign(dataContainer, this.editedModel)
        dataContainer.product_has_outlets.forEach((item) => {
          outlet.push(item.outlets.id_outlet)
        })
        dataContainer.product_ingredient.forEach((item) => {
          ingred.push({
            id_material: item.id_material,
            quantity: item.quantity,
          })
        })
        dataContainer.product_sidedish.forEach((item) => {
          sideDis.push({
            id_sidedish: item.id_sidedish,
          })
        })
        dataContainer.product_ingredient = ingred
        dataContainer.product_sidedish = sideDis
        this.childOutlet = outlet
        this.formModel = dataContainer
      }
    },

    async onSubmit() {
      this.formModel.status = true
      this.formModel.image = 'string'
      this.$processLoading.SHOW({})
      if (this.editedModel) {
        delete this.formModel.department
        delete this.formModel.created_at
        delete this.formModel.deleted_at
        delete this.formModel.updated_at
        delete this.formModel.product_has_outlets
        delete this.formModel.product_category
        this.formModel.product_price = Number(this.formModel.product_price)
        this.formModel.product_cogs = Number(this.formModel.product_cogs)
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

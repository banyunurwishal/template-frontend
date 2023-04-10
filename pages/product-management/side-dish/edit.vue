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
                      ? 'Edit New Side Dish'
                      : 'Create New Side Dish'
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
                            name="side_dish_name"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Side Dish Name*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
                                v-model="formModel.sidedish_name"
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
                                number
                                v-model="formModel.sidedish_price"
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
                                number
                                v-model="formModel.sidedish_cogs"
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
                        <b-tab title="Ingredients">
                          <div class="text-right mb-3">
                            <b-button variant="primary" @click="handleItem">
                              Add Ingredient
                            </b-button>
                          </div>
                          <div
                            v-for="(item, index) in formModel.ingredients"
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
                                      @change="
                                        handleChangeIngredient(
                                          item.id_material,
                                          index
                                        )
                                      "
                                    >
                                    </b-form-select>
                                  </b-form-group>
                                  <b-form-group label="Quantity">
                                    <b-form-input
                                      v-model="item.quantity"
                                      number
                                    >
                                    </b-form-input>
                                  </b-form-group>
                                  <b-form-group label="Ingredient Unit">
                                    <b-form-input
                                      v-model="item.ingredientUnit"
                                      readonly
                                    >
                                    </b-form-input>
                                  </b-form-group>
                                </b-col>
                                <b-col class="text-right" align-self="start">
                                  <b-button
                                    variant="danger"
                                    @click="handleDeleteItem(index)"
                                    :class="
                                      formModel.ingredients.length > 1
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
    if (this.$route.params.id) {
      await this.handleEditModel()
    }
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      childOutlet: [],
      formModel: {
        ingredients: [
          {
            id_material: '',
            quantity: '',
            ingredientUnit: '',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      editedModel: (state) => state.sideDish.model,
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
    }),
  },
  methods: {
    ...mapActions('sideDish', [
      'fetchLists',
      'createModel',
      'fetchModel',
      'updateModel',
    ]),
    ...mapActions('options', ['fetchListDepartment', 'fetchListMaterials']),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleItem() {
      this.formModel.ingredients.push({
        id_material: '',
        quantity: '',
        ingredientUnit: '',
      })
    },

    async handleEditModel() {
      let id = await this.$route.params.id
      await this.fetchModel(id)
      if (this.editedModel) {
        let dataContainer = {}
        let outlet = []
        let ingred = []
        Object.assign(dataContainer, this.editedModel)
        dataContainer.sidedish_has_outlets.forEach((item) => {
          outlet.push(item.outlets.id_outlet)
        })
        dataContainer.sidedish_ingredient.forEach((item) => {
          ingred.push({
            id_material: item.id_material,
            quantity: item.quantity,
          })
        })
        dataContainer.ingredients = ingred
        this.childOutlet = outlet
        this.formModel = dataContainer
      }
    },

    handleDeleteItem(index) {
      this.formModel.ingredients.splice(index, 1)
    },

    handleCancelBtn() {
      this.$router.push('/product-management/side-dish')
    },

    async onSubmit() {
      await this.formModel.ingredients.forEach((e) => {
        delete e.ingredientUnit
      })
      this.formModel.sidedish_price = Number(this.formModel.sidedish_price)
      this.formModel.sidedish_cogs = Number(this.formModel.sidedish_cogs)
      this.$processLoading.SHOW({})
      if (this.editedModel) {
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

    handleChangeIngredient(data, index) {
      this.listMaterials.find((x) => {
        if (x.value == data) {
          this.formModel.ingredients[index].ingredientUnit = x.unit.name
        }
      })
    },
  },
}
</script>

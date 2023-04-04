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
                <h4>Create New Product Package</h4>
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
                            name="outlet"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Outlet*">
                              <b-form-select
                                :options="optionsOutlet"
                                :state="getValidationState(validationContext)"
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
                            name="package"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Package Name*">
                              <b-form-select
                                :state="getValidationState(validationContext)"
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
                            name="price"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Price*">
                              <b-form-input
                                :state="getValidationState(validationContext)"
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
                            v-for="(item, index) in formModel.sideDish"
                            :key="index"
                          >
                            <div
                              class="border rounded-lg p-3"
                              :class="index > 0 ? 'my-3' : ''"
                            >
                              <b-row>
                                <b-col>
                                  <label for="">Side dish</label>
                                  <b-form-select v-model="item.sidedish">
                                  </b-form-select>
                                </b-col>
                                <b-col class="text-right" align-self="start">
                                  <b-button
                                    variant="danger"
                                    @click="handleDeleteItemSideDish(index)"
                                    :class="
                                      formModel.sideDish.length > 1
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
                            v-for="(item, index) in formModel.package"
                            :key="index"
                          >
                            <div
                              class="border rounded-lg p-3"
                              :class="index > 0 ? 'my-3' : ''"
                            >
                              <b-row>
                                <b-col>
                                  <b-form-group label="Department">
                                    <b-form-select
                                      :options="optionsDepartement"
                                      v-model="item.department"
                                    >
                                    </b-form-select>
                                  </b-form-group>
                                  <b-form-group
                                    label="Package Item"
                                    v-for="(items, index2) in item.menuItem"
                                    :key="index2"
                                  >
                                    <div class="d-flex">
                                      <b-form-select v-model="items.menu">
                                      </b-form-select>
                                      <b-button
                                        variant="danger"
                                        class="ml-sm-3"
                                        @click="
                                          handleDeleteMenuItem(index, index2)
                                        "
                                        :class="
                                          formModel.package[index].menuItem
                                            .length > 0
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

                                  <b-form-group label="Quantity">
                                    <b-form-input v-model="item.quantity">
                                    </b-form-input>
                                  </b-form-group>
                                </b-col>
                                <b-col class="text-right" align-self="start">
                                  <b-button
                                    variant="danger"
                                    @click="handleDeleteItem(index)"
                                    :class="
                                      formModel.package.length > 1
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  name: 'IndexPage',
  async created() {
    this.$processLoading.SHOW({})
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      optionsDepartement: [
        { value: null, text: 'Please select an option' },
        { value: 'q', text: 'Marketing' },
        { value: 'gudang', text: 'Gudang' },
        { value: 'pp', text: 'Sales' },
        { value: 'pp', text: 'Kasir' },
      ],
      optionsOutlet: [
        { value: null, text: 'Please select an option' },
        { value: 'kop', text: 'Kopi Kenangan Buah Batu' },
        { value: 'kop', text: 'Kopi Toko Djawa Buah Batu' },
        { value: 'kak', text: 'Kopi Janji Jiwa Buah Batu' },
        { value: 'kop', text: 'Kopi Kenangan Bandung' },
        { value: 'kop', text: 'Kopi Toko Djawa Bandung' },
        { value: 'kak', text: 'Kopi Janji Jiwa Bandung' },
      ],
      formModel: {
        package: [
          {
            department: '',
            menuItem: [],
            quantity: '',
          },
        ],
        sideDish: [
          {
            sidedish: '',
          },
        ],
      },
    }
  },
  computed: {},
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleItem() {
      this.formModel.package.push({
        department: '',
        menuItem: [],
        quantity: '',
      })
    },

    handleItemSideDish() {
      this.formModel.sideDish.push({
        sidedish: '',
      })
    },

    handleAddMenuItem(index) {
      console.log(this.formModel.package[index].menuItem)
      this.formModel.package[index].menuItem.push({
        menu: '',
      })
    },

    handleDeleteItem(index) {
      this.formModel.package.splice(index, 1)
    },

    handleDeleteItemSideDish(index) {
      this.formModel.sideDish.splice(index, 1)
    },

    handleDeleteMenuItem(index, index2) {
      this.formModel.package[index].menuItem.splice(index2, 1)
    },

    handleCancelBtn() {
      this.$router.push('/product-management/product-package')
    },
    async onSubmit() {},
  },
}
</script>

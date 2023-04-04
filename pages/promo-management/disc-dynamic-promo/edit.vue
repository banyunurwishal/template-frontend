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
                <h4>Create New Discount Promo</h4>
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
                            name="company"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Company*">
                              <b-form-select
                                :state="getValidationState(validationContext)"
                                :options="optionsCompany"
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
                            name="outlet"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Outlet*">
                              <b-form-select
                                :state="getValidationState(validationContext)"
                                :options="optionsOutlet"
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
                            name="name"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group label="Name*">
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

                          <label for="">Promo Periode</label>
                          <b-row>
                            <b-col>
                              <b-form-datepicker
                                class="datepicker-form mr-sm-3"
                                placeholder="Start Date"
                              >
                              </b-form-datepicker>
                            </b-col>
                            <b-col
                              sm="1"
                              align-self="center"
                              class="text-center"
                            >
                              -
                            </b-col>
                            <b-col>
                              <b-form-datepicker
                                class="datepicker-form mr-sm-3"
                                placeholder="End Date"
                              >
                              </b-form-datepicker>
                            </b-col>
                          </b-row>
                        </b-tab>
                        <b-tab title="Menu">
                          <div class="text-right mb-3">
                            <b-button variant="primary" @click="handleItem">
                              Add Menu
                            </b-button>
                          </div>
                          <div
                            v-for="(item, index) in formModel.menu"
                            :key="index"
                          >
                            <div
                              class="border rounded-lg p-3"
                              :class="index > 0 ? 'my-3' : ''"
                            >
                              <b-row>
                                <b-col>
                                  <b-form-group label="Product">
                                    <b-form-select v-model="item.product">
                                    </b-form-select>
                                  </b-form-group>
                                  <ValidationProvider
                                    name="type"
                                    :rules="{ required: true }"
                                    v-slot="validationContext"
                                  >
                                    <b-form-group label="Promo Type*">
                                      <b-form-radio-group
                                        v-model="item.type"
                                        :options="type"
                                        button-variant="outline-primary"
                                        size="lg"
                                        buttons
                                        :state="
                                          getValidationState(validationContext)
                                        "
                                      ></b-form-radio-group>
                                      <b-form-invalid-feedback
                                        id="input-1-live-feedback"
                                        >{{
                                          validationContext.errors[0]
                                        }}</b-form-invalid-feedback
                                      >
                                    </b-form-group>
                                  </ValidationProvider>
                                  <ValidationProvider
                                    name="type"
                                    :rules="{ required: true }"
                                    v-slot="validationContext"
                                  >
                                    <b-form-group label="Promo Price*">
                                      <b-form-input
                                        v-model="item.price"
                                        :state="
                                          getValidationState(validationContext)
                                        "
                                      >
                                      </b-form-input>
                                    </b-form-group>

                                    <b-form-invalid-feedback
                                      id="input-1-live-feedback"
                                      >{{
                                        validationContext.errors[0]
                                      }}</b-form-invalid-feedback
                                    >
                                  </ValidationProvider>
                                </b-col>
                                <b-col class="text-right" align-self="start">
                                  <b-button
                                    variant="danger"
                                    @click="handleDeleteItem(index)"
                                    :class="
                                      formModel.menu.length > 1
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
      formModel: {
        menu: [
          {
            product: '',
            type: [],
            price: '',
          },
        ],
      },
      optionsCompany: [
        { value: null, text: 'Please select an option' },
        { value: 'q', text: 'Kopi Kenangan' },
        { value: 'kak', text: 'Kopi Toko Djawa' },
        { value: 'kak', text: 'Kopi Janji Jiwa' },
      ],
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
      type: [
        { text: 'Price', value: 'price' },
        { text: 'Percentage', value: 'percentage' },
      ],
    }
  },
  computed: {},
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleItem() {
      this.formModel.menu.push({
        product: '',
        type: [],
        price: '',
      })
    },

    handleDeleteItem(index) {
      this.formModel.menu.splice(index, 1)
    },

    handleCancelBtn() {
      this.$router.push('/promo-management/disc-promo')
    },
    async onSubmit() {},
  },
}
</script>

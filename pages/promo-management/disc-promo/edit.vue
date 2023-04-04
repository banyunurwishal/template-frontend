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
                          <b-form-invalid-feedback id="input-1-live-feedback">{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
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
                          <b-form-invalid-feedback id="input-1-live-feedback">{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
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
                          <b-form-invalid-feedback id="input-1-live-feedback">{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
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
                          <b-form-invalid-feedback id="input-1-live-feedback">{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>

                      <ValidationProvider
                        name="type"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                      >
                        <b-form-group label="Type*">
                          <b-form-radio-group
                            v-model="formModel.type"
                            :options="type"
                            button-variant="outline-primary"
                            size="lg"
                            buttons
                            :state="getValidationState(validationContext)"
                          ></b-form-radio-group>
                          <b-form-invalid-feedback id="input-1-live-feedback">{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>

                      <label for="">Promo Periode</label>
                      <b-row class="mb-3">
                        <b-col>
                          <b-form-datepicker
                            class="datepicker-form mr-sm-3"
                            placeholder="Start Date"
                          >
                          </b-form-datepicker>
                        </b-col>
                        <b-col sm="1" align-self="center" class="text-center">
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
                      <div v-if="formModel.type == 'percentage'">
                        <b-form-group label="Minimum Transaction">
                          <b-form-input></b-form-input>
                        </b-form-group>
                        <b-form-group label="Category">
                          <b-form-select></b-form-select>
                        </b-form-group>
                        <FormTransfer />
                      </div>
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
import FormTransfer from '@/components/form/transfer/index.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    FormTransfer,
  },
  name: 'IndexPage',
  async created() {
    this.$processLoading.SHOW({})
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      formModel: {},
      type: [
        { text: 'Price', value: 'price' },
        { text: 'Percentage', value: 'percentage' },
      ],
      optionsOutlet: [
        { text: 'Outlet name', value: 'orange' },
        { text: 'Outlet name', value: 'apple' },
      ],
      selectedOutlet: [],
      allSelectedOutlet: false,
      indeterminateOutlet: false,
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
    }
  },
  computed: {},
  watch: {
    selectedOutlet(newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminateOutlet = false
        this.allSelectedOutlet = false
      } else if (newValue.length === this.optionsOutlet.length) {
        this.indeterminateOutlet = false
        this.allSelectedOutlet = true
      } else {
        this.indeterminateOutlet = true
        this.allSelectedOutlet = false
      }
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    toggleAll(checked) {
      let select = []
      ;(select = checked
        ? this.optionsOutlet.slice()
        : (this.selectedOutlet = [])),
        []
      console.log(select)
      if (select != []) {
        select.forEach((e) => {
          this.selectedOutlet.push(e.value)
        })
      }
    },

    handleCancelBtn() {
      this.$router.push('/promo-management/disc-dynamic-promo')
    },
    async onSubmit() {},
  },
}
</script>

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
                <h4>Create New Compliment</h4>
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
                        name="position"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                      >
                        <b-form-group label="Position*">
                          <b-form-select
                            :state="getValidationState(validationContext)"
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

                      <b-form-group label="">
                        <b-form inline>
                          <label class="mr-sm-4" for="">Limit</label>
                          <b-form-checkbox
                            class="mb-sm-4"
                            v-model="checked"
                            switch
                          >
                          </b-form-checkbox>
                        </b-form>
                        <b-form-input :disabled="checked == false">
                        </b-form-input>
                      </b-form-group>

                      <ValidationProvider
                        name="periode"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                      >
                        <b-form-group label="Periode*">
                          <b-form-radio-group
                            :options="periode"
                            button-variant="outline-primary"
                            size="lg"
                            name="radio-btn-outline"
                            buttons
                            :state="getValidationState(validationContext)"
                          ></b-form-radio-group>
                          <b-form-invalid-feedback id="input-1-live-feedback">{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>

                      <b-form-group>
                        <template #label>
                          <b>Outlet</b><br />
                          <b-form-checkbox
                            v-model="allSelectedOutlet"
                            :indeterminate="indeterminateOutlet"
                            @change="toggleAll"
                          >
                            {{
                              allSelectedOutlet ? 'Un-select All' : 'Select All'
                            }}
                          </b-form-checkbox>
                        </template>

                        <template>
                          <div class="border py-2">
                            <b-form-checkbox-group
                              v-model="selectedOutlet"
                              :options="optionsOutlet"
                              class="ml-4"
                              stacked
                            ></b-form-checkbox-group>
                          </div>
                        </template>
                      </b-form-group>
                    </b-card>
                  </b-col>
                </b-row>
                <b-row>
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
      checked: false,
      periode: [
        { text: 'Daily', value: 'daily' },
        { text: 'Weekly', value: 'weekly' },
        { text: 'Monthly', value: 'monthly' },
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
      this.$router.push('/payment-management/compliment')
    },
    async onSubmit() {},
  },
}
</script>

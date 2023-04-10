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
                <h4>Create New Payment Method</h4>
              </b-col>
            </b-row>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.prevent.stop="handleSubmit(onSubmit)">
                <b-row class="mt-3">
                  <b-col>
                    <b-card class="shadow-form">
                      <ValidationProvider
                        name="type"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                      >
                        <b-form-group label="Type*">
                          <b-form-radio-group
                            :options="type"
                            button-variant="outline-primary"
                            size="lg"
                            name="radio-btn-outline"
                            buttons
                            :state="getValidationState(validationContext)"
                            v-model="formModel.bank_type"
                          ></b-form-radio-group>
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
                            v-model="formModel.bank_name"
                          >
                          </b-form-input>
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
                        <SelectOutlet
                          :state="getValidationState(validationContext)"
                          v-model="formModel.id_outlets"
                          :hasData="childArr"
                        />
                      </ValidationProvider>
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
    await this.fetchListOutlet()
    if (this.isEdited) {
      await this.handleEditModel()
      console.log(this.editModel)
    }
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      type: [
        { text: 'Bank', value: 1 },
        { text: 'E-Payment', value: 2 },
      ],
      formModel: {},
    }
  },
  computed: {
    ...mapState({
      listOutlet: (state) => {
        let data = []
        state.options.listOutlet.forEach((item) => {
          data.push({
            text: item.outlet_name,
            value: item.id_outlet,
          })
        })
        return data
      },
      editModel: (state) => state.payment.model,
    }),
    isEdited() {
      return this.$route.params.id != null
    },
    editedModelId() {
      return this.$route.params.id
    },
  },

  methods: {
    ...mapActions('payment', [
      'createModel',
      'fetchLists',
      'fetchModel',
      'updateModel',
    ]),
    ...mapActions('options', ['fetchListOutlet']),

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleCancelBtn() {
      this.$router.push('/payment-management/payment')
    },

    async handleEditModel() {
      await this.fetchModel(this.editedModelId)
      if (this.editModel) {
        let dataContainer = {}
        let arry = []

        Object.assign(dataContainer, this.editModel)
        dataContainer.bank_has_outlets.forEach((item) => {
          arry.push(item.id_outlet)
        })
        delete dataContainer.bank_has_outlets
        Object.assign(this.formModel, dataContainer)
        this.formModel = dataContainer
        this.formModel.id_outlets = arry
        this.childArr = arry
      }
    },

    async onSubmit() {
      this.$processLoading.SHOW({})
      if (this.isEdited) {
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

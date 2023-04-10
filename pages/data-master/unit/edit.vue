<template>
  <div
    id="app"
    class=""
    style="padding-left: 2rem !important; padding-right: 2rem !important"
  >
    <section class="section mt-5">
      <div class="section-body">
        <b-row>
          <b-col cols="12">
            <h4>{{ isEdited ? 'Edit Unit' : 'Add Unit' }}</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="card h-100">
              <div class="card-body">
                <div class="clearfix mb-3"></div>
                <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                  <b-form @submit.prevent.stop="handleSubmit(onSubmit)">
                    <ValidationProvider
                      name="name"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Name*">
                        <b-form-input
                          v-model="formModel.name"
                          placeholder="Enter Name"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider
                      name="short_name"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Short Name*">
                        <b-form-input
                          v-model="formModel.short_name"
                          placeholder="Enter Short Name"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
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

                    <div class="text-right">
                      <b-button variant="danger" @click="redirectLink"
                        >Cancel</b-button
                      >
                      <b-button type="submit" variant="primary"
                        >Submit</b-button
                      >
                    </div>
                  </b-form>
                </ValidationObserver>
              </div>
            </div>
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
  async created() {
    this.$processLoading.SHOW({})
    await this.fetchListOutlet()
    if (this.isEdited) {
      await this.handleEditModel()
    }
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      formModel: {},
      childArr: [],
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
      editModel: (state) => state.unit.model,
    }),
    isEdited() {
      return this.$route.params.id != null
    },
    editedModelId() {
      return this.$route.params.id
    },
  },
  methods: {
    ...mapActions('unit', [
      'createModel',
      'fetchLists',
      'fetchModel',
      'updateModel',
    ]),
    ...mapActions('options', ['fetchListOutlet']),

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    async handleEditModel() {
      await this.fetchModel(this.editedModelId)
      if (this.editModel) {
        let dataContainer = {}
        let arry = []

        Object.assign(dataContainer, this.editModel)
        dataContainer.unit_has_outlets.forEach((item) => {
          arry.push(item.id_outlet)
        })
        delete dataContainer.unit_has_outlets
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
            this.redirectLink()
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
            this.redirectLink()
          })
          .catch((err) => {
            this.$processLoading.HIDE({})
            console.log(err)
            this.alertToastFail('Data gagal Disimpan')
          })
      }
    },
    redirectLink() {
      this.$router.push('/master-data/unit')
    },
  },
}
</script>

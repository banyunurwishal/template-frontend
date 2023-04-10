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
            <h4>{{ isEdited ? 'Edit MDL' : 'Add MDL' }}</h4>
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
                      name="supplier"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Supplier">
                        <b-form-select
                          v-model="formModel.id_supplier"
                          placeholder="Enter Name"
                          :options="listSupplier"
                          :state="getValidationState(validationContext)"
                        ></b-form-select>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider
                      name="material"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Material">
                        <b-form-select
                          v-model="formModel.id_material"
                          :state="getValidationState(validationContext)"
                          :options="listMaterial"
                        ></b-form-select>
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
                      <b-form-group label="Price">
                        <b-form-input
                          v-model="formModel.price"
                          type="number"
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
                        v-model="formModel.id_outlet"
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
    await this.fetchListsSupplier()
    await this.fetchListsMaterial()
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
      listSupplier: (state) => {
        let data = []
        state.options.listSupplier.forEach((item) => {
          data.push({
            text: item.name,
            value: item.id,
          })
        })
        return data
      },
      listMaterial: (state) => {
        let data = []
        state.options.listMaterial.forEach((item) => {
          data.push({
            text: item.name,
            value: item.id,
          })
        })
        return data
      },
      editModel: (state) => state.mdl.model,
    }),
    isEdited() {
      return this.$route.params.id != null
    },
    editedModelId() {
      return this.$route.params.id
    },
  },
  methods: {
    ...mapActions('mdl', [
      'createModel',
      'fetchLists',
      'fetchModel',
      'updateModel',
    ]),
    ...mapActions('options', ['fetchListsSupplier', 'fetchListsMaterial']),

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    async handleEditModel() {
      await this.fetchModel(this.editedModelId)
      if (this.editModel) {
        let dataContainer = {}
        let arry = []

        Object.assign(dataContainer, this.editModel)
        dataContainer.listing_has_outlets.forEach((item) => {
          arry.push(item.outlets.id_outlet)
        })
        delete dataContainer.listing_has_outlets
        delete dataContainer.materials
        delete dataContainer.suppliers
        Object.assign(this.formModel, dataContainer)
        this.formModel = dataContainer
        this.formModel.id_outlet = arry
        this.childArr = arry
      }
    },

    async onSubmit() {
      this.$processLoading.SHOW({})
      let prc = parseInt(this.formModel.price)
      this.formModel.price = prc
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
      this.$router.push('/master-data/mdl')
    },
  },
}
</script>

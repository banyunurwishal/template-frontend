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
            <h4>{{ isEdited ? 'Edit Material' : 'Add Material' }}</h4>
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
                      <b-form-group label="Name">
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
                      name="po_unit"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="PO Unit">
                        <b-form-select
                          v-model="formModel.po_unit"
                          :state="getValidationState(validationContext)"
                          :options="options"
                        ></b-form-select>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      name="ingredient"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Ingredient">
                        <b-form-select
                          v-model="formModel.ingredient"
                          :options="options"
                          :state="getValidationState(validationContext)"
                        ></b-form-select>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      name="po_unit"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Product Code (Opsional)">
                        <b-form-input
                          v-model="formModel.prodCode"
                          :state="getValidationState(validationContext)"
                          :options="options"
                        ></b-form-input>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                    <hr />
                    <div>
                      <b-row>
                        <b-col>
                          <h4 class="text-center">Conversion</h4>
                        </b-col>
                      </b-row>
                      <b-row class="mt-2">
                        <b-col cols="5">
                          <h5 class="text-center">PO Unit</h5>
                          <ValidationProvider
                            name="name"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group>
                              <b-form-input
                                v-model="formModel.unitpo"
                                type="number"
                                placeholder="Enter"
                                :state="getValidationState(validationContext)"
                              ></b-form-input>
                              <b-form-invalid-feedback
                                id="input-1-live-feedback"
                                >{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback
                              >
                            </b-form-group>
                          </ValidationProvider>
                        </b-col>
                        <b-col cols="2"><h5 class="text-center">To</h5></b-col>
                        <b-col cols="5">
                          <h5 class="text-center">Ingredient</h5>
                          <ValidationProvider
                            name="name"
                            :rules="{ required: true }"
                            v-slot="validationContext"
                          >
                            <b-form-group>
                              <b-form-input
                                type="number"
                                v-model="formModel.unit_ingredients"
                                placeholder="Enter"
                                :state="getValidationState(validationContext)"
                              ></b-form-input>
                              <b-form-invalid-feedback
                                id="input-1-live-feedback"
                                >{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback
                              >
                            </b-form-group>
                          </ValidationProvider>
                        </b-col>
                      </b-row>
                    </div>

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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  async created() {
    // this.$processLoading.SHOW({})
    // if (this.isEdited) {
    //   await this.handleEditModel()
    // }
    // this.$processLoading.HIDE({})
  },
  data() {
    return {
      formModel: {},
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'slc', text: 'Slice' },
        { value: 'scoop', text: 'Scoop' },
      ],
    }
  },
  computed: {
    ...mapState({
      //   editModel: (state) => state.companyManage.model,
    }),
    isEdited() {
      return this.$route.params.id != null
    },
    editedModelId() {
      return this.$route.params.id
    },
  },
  methods: {
    // ...mapActions('companyManage', [
    //   'createModel',
    //   'fetchLists',
    //   'fetchModel',
    //   'updateModel',
    // ]),

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    async handleEditModel() {
      await this.fetchModel(this.editedModelId)
      if (this.editModel) {
        let dataContainer = {}
        Object.assign(dataContainer, this.editModel)
        this.formModel = dataContainer
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
      this.$router.push('/master-data/material')
    },
  },
}
</script>

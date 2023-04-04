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
            <h4>{{ isEdited ? 'Edit Supplier' : 'Add Supplier' }}</h4>
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
                      name="address"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Address">
                        <b-form-textarea
                          v-model="formModel.address"
                          placeholder="Enter Address"
                          rows="3"
                          :state="getValidationState(validationContext)"
                        ></b-form-textarea>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider
                      name="phone"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Phone">
                        <b-form-input
                          type="phone"
                          v-model="formModel.phone"
                          placeholder="Enter Phone Number"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider
                      name="pic"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group label="Person In Change">
                        <b-form-input
                          v-model="formModel.pic"
                          placeholder="Enter Person In Change"
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
                      <b-form-group label="Outlet*">
                        <b-form-checkbox-group
                          :state="getValidationState(validationContext)"
                          :options="optionsOutlet"
                          stacked
                        >
                        </b-form-checkbox-group>
                        <b-form-invalid-feedback id="input-1-live-feedback">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
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
      this.$router.push('/master-data/supplier')
    },
  },
}
</script>

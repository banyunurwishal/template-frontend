<template>
  <div id="edit-department" class="">
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
                      ? 'Edit New Department'
                      : 'Create New Department'
                  }}
                </h4>
              </b-col>
            </b-row>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.prevent.stop="handleSubmit(onSubmit)">
                <b-row class="mt-3">
                  <b-col>
                    <b-card class="shadow-form">
                      <ValidationProvider
                        name="department"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                      >
                        <b-form-group label="Department Name*">
                          <b-form-input
                            v-model="formModel.department_name"
                            :state="getValidationState(validationContext)"
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
                          v-model="formModel.id_outlet"
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
    if (this.$route.params.id) {
      await this.handleEditModel()
    }
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      formModel: {},
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
    }
  },
  computed: {
    ...mapState({
      editedModel: (state) => state.department.model,
    }),
  },
  methods: {
    ...mapActions('department', [
      'fetchLists',
      'createModel',
      'fetchModel',
      'updateModel',
    ]),

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    async handleEditModel() {
      let id = await this.$route.params.id
      await this.fetchModel(id)
      if (this.editedModel) {
        let dataContainer = {}
        Object.assign(dataContainer, this.editedModel)
        this.formModel = dataContainer
      }
    },

    handleCancelBtn() {
      this.$router.push('/store-management/departments')
    },

    async onSubmit() {
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
  },
}
</script>

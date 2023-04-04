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
                <h4>Import Product</h4>
              </b-col>
            </b-row>
            <b-form @submit.prevent.stop="onSubmit">
              <b-row class="mt-3">
                <b-col>
                  <b-card class="shadow-form">
                    <b-form-group label="Company Name">
                      <b-form-select> </b-form-select>
                    </b-form-group>
                    <b-form-group label="Outlet Name">
                      <b-form-select> </b-form-select>
                    </b-form-group>
                    <b-form-group label="Department Name">
                      <b-form-select> </b-form-select>
                    </b-form-group>
                    <b-form-group label="Product Category">
                      <b-form-select> </b-form-select>
                    </b-form-group>
                    <b-form-group label="File">
                      <b-form-file> </b-form-file>
                    </b-form-group>
                  </b-card>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button
                    size="md"
                    class="rounded-lg px-4"
                    variant="outline-primary"
                  >
                    Download Template
                  </b-button>
                </b-col>
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
                    <font-awesome-icon :icon="['fas', 'check']" />&nbsp; Simpan
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
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
    return {}
  },
  computed: {},
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleCancelBtn() {
      this.$router.push('/product-management/product')
    },
    async onSubmit() {},
  },
}
</script>

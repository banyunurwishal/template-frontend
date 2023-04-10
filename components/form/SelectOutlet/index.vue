<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group>
          <template #label> Outlet*<br /> </template>

          <template>
            <div
              class="border border-primary rounded-top p-3 mt-2 border-primary"
            >
              <b-form-checkbox
                v-model="allSelected"
                :indeterminate="indeterminate"
                @change="toggleAll"
              >
                Select All
              </b-form-checkbox>
            </div>
            <div class="border border-top-0 rounded-bottom p-3 border-primary">
              <b-form-input
                v-model="search"
                class="rounded-10 border"
                type="search"
                placeholder="Search"
              ></b-form-input>
              <div
                class="py-3"
                style="position: relative; overflow-y: auto; height: 200px"
              >
                <b-form-checkbox-group
                  v-model="hasData"
                  :options="listOutlet"
                  class="ml-3"
                  :state="state"
                  stacked
                  v-if="hasData"
                  @input="$emit('input', $event)"
                  @change="$emit('change', $event)"
                ></b-form-checkbox-group>
                <b-form-checkbox-group
                  v-model="selected"
                  :options="listOutlet"
                  class="ml-3"
                  :state="state"
                  stacked
                  v-else
                  @input="$emit('input', $event)"
                  @change="$emit('change', $event)"
                ></b-form-checkbox-group>
              </div>
            </div>
          </template>
        </b-form-group>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  async created() {
    this.$processLoading.SHOW({})
    await this.fetchListOutlet()
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      search: '',
      searchTarget: '',
      selected: [],
      selectedTarget: [],
      allSelected: false,
      allselectedTarget: false,
      indeterminate: false,
      indeterminateTarget: false,
    }
  },
  props: {
    state: null,
    hasData: [],
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
    }),
    handleSearch() {
      return this.listOutlet.filter((e) => {
        return e.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {},
  methods: {
    ...mapActions('options', ['fetchListOutlet']),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async toggleAll(checked) {
      if (checked) {
        this.listOutlet.forEach((e) => {
          this.selected.push(e.value)
        })
        if (this.hasData) {
          this.listOutlet.forEach((e) => {
            this.hasData.push(e.value)
          })
        }
      } else {
        if (this.hasData) {
          this.hasData = []
        }
        this.selected = []
      }
    },
  },
  watch: {
    selected(newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newValue.length === this.listOutlet.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    },
  },
}
</script>

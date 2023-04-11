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
              <b-form-checkbox v-model="allSelected" @change="toggleAll">
                Select All
              </b-form-checkbox>
            </div>
            <div class="border border-top-0 rounded-bottom p-3 border-primary">
              <b-form-input
                v-model="search"
                class="rounded-10 border"
                type="search"
                placeholder="Search"
                @keyup="handleSearch"
              ></b-form-input>
              <div
                class="py-3"
                style="position: relative; overflow-y: auto; height: 200px"
              >
                <b-form-checkbox-group
                  v-model="selected"
                  :options="options"
                  class="ml-3"
                  :state="state"
                  stacked
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
  props: {
    state: null,
    hasData: [],
  },
  async created() {
    this.$processLoading.SHOW({})
    await this.fetchListOutlet()
    if (this.listOutlet) {
      this.listOutlet.forEach((item) => {
        this.options.push({
          text: item.text,
          value: item.value,
        })
      })
    }
    console.log(this.options)
    this.$processLoading.HIDE({})
  },
  data() {
    return {
      search: '',
      selected: [],
      options: [],
      allSelected: false,
      indeterminate: false,
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
    }),
  },
  mounted() {},
  methods: {
    ...mapActions('options', ['fetchListOutlet']),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    async toggleAll(checked) {
      checked
        ? this.listOutlet.forEach((e) => {
            this.selected.push(e.value)
          })
        : (this.selected = [])
    },

    handleSearch() {
      let filter = this.listOutlet.filter((e) => {
        return e.text.toLowerCase().includes(this.search.toLowerCase())
      })
      this.options = filter
    },
  },
  watch: {
    selected(newValue, oldValue) {
      if (newValue.length < this.options.length) {
        this.allSelected = false
      } else if (newValue.length === this.options.length) {
        this.allSelected = true
      }
    },
    hasData(value) {
      this.selected = value
    },
  },
}
</script>

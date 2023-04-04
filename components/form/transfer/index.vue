<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group>
          <template #label> Menu<br /> </template>

          <template>
            <div class="border border-primary rounded-top p-3 mt-2">
              <b-form-checkbox
                v-model="allSelected"
                :indeterminate="indeterminate"
                @change="toggleAll"
              >
                Source
              </b-form-checkbox>
            </div>
            <div class="border border-top-0 rounded-bottom border-primary p-3">
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
                  v-model="selected"
                  :options="flavours"
                  class="ml-3"
                  stacked
                ></b-form-checkbox-group>
              </div>
            </div>
          </template>
        </b-form-group>
      </b-col>
      <b-col align-self="center" class="text-center">
        <b-button
          variant="primary"
          :disabled="flavoursTarget.length < 1"
          @click="handleMoveLeft"
          >&lt;</b-button
        >
        <b-button
          variant="primary"
          :disabled="flavours.length < 1"
          @click="handleMoveRight"
          >></b-button
        >
      </b-col>
      <b-col>
        <b-form-group>
          <template #label> <br /> </template>

          <template>
            <div class="border border-primary rounded-top p-3 mt-2">
              <b-form-checkbox
                v-model="allselectedTarget"
                :indeterminate="indeterminateTarget"
                @change="toggleAll2"
              >
                Target
              </b-form-checkbox>
            </div>
            <div class="border border-top-0 rounded-bottom border-primary p-3">
              <b-form-input
                v-model="searchTarget"
                class="rounded-10 border"
                type="search"
                placeholder="Search"
              ></b-form-input>
              <div
                class="py-3"
                style="position: relative; overflow-y: auto; height: 200px"
              >
                <b-form-checkbox-group
                  v-model="selectedTarget"
                  :options="flavoursTarget"
                  stacked
                  class="ml-3"
                ></b-form-checkbox-group>
              </div>
            </div>
          </template>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flavours: ['Apple', 'Pineapple', 'Grape', 'Orange'],
      flavoursTarget: [],
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
  computed: {
    handleSearch() {
      return this.flavours.filter((e) => {
        return e.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    handlesearchTarget() {
      return this.flavoursTarget.filter((e) => {
        return e.toLowerCase().includes(this.searchTarget.toLowerCase())
      })
    },
  },
  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.flavours.slice() : []
    },
    toggleAll2(checked) {
      this.selectedTarget = checked ? this.flavoursTarget.slice() : []
    },
    handleMoveLeft() {
      let selectedSource = this.selectedTarget
      selectedSource.forEach((e) => {
        this.flavoursTarget.find((x, index) => {
          if (x == e) {
            this.flavoursTarget.splice(index, 1)
          }
        })
        this.flavours.push(e)
      })
      this.selectedTarget = []
    },
    handleMoveRight() {
      let selectedSource = this.selected
      selectedSource.forEach((e) => {
        this.flavours.find((x, index) => {
          if (x == e) {
            this.flavours.splice(index, 1)
          }
        })
        this.flavoursTarget.push(e)
      })

      this.selected = []
    },
  },
  watch: {
    selected(newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newValue.length === this.flavours.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    },
    selectedTarget(newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminateTarget = false
        this.allSelectedTarget = false
      } else if (newValue.length === this.flavoursTarget.length) {
        this.indeterminateTarget = false
        this.allSelectedTarget = true
      } else {
        this.indeterminateTarget = true
        this.allSelectedTarget = false
      }
    },
  },
}
</script>

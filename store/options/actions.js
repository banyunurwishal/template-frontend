export default {
  async fetchListOutlet({ commit, state }, params) {
    await this.$axios.get('outlet', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_OUTLET', res.data.data)
      }
    })
  },

  async fetchListsUnit({ commit, state }, params) {
    await this.$axios.get('units', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_UNIT', res.data.data)
      }
    })
  },

  async fetchListsSupplier({ commit, state }, params) {
    await this.$axios.get('suppliers', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_SUPPLIER', res.data.data)
      }
    })
  },

  async fetchListsMaterial({ commit, state }, params) {
    await this.$axios.get('materials', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_MATERIAL', res.data.data)
      }
    })
  },

  async fetchListDepartment({ commit, state }, params) {
    await this.$axios.get('department', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_DEPARTMENT', res.data.data)
      }
    })
  },
  async fetchListMaterials({ commit, state }, params) {
    await this.$axios.get('materials', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_MATERIALS', res.data.data)
      }
    })
  },
  async fetchListProductCategory({ commit, state }, params) {
    await this.$axios.get('product-category', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_PRODUCT_CATEGORY', res.data.data)
      }
    })
  },
  async fetchListSideDish({ commit, state }, params) {
    await this.$axios.get('side-dish', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_SIDE_DISH', res.data.data)
      }
    })
  },
}

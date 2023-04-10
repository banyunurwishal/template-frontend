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
}

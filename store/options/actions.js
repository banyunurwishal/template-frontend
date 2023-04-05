export default {
  async fetchListOutlet({ commit, state }, params) {
    await this.$axios.get('outlet', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_OUTLET', res.data.data)
      }
    })
  },
}

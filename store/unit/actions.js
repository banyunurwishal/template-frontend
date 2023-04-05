export default {
  async fetchLists({ commit, state }) {
    let listParams = {}

    await this.$axios.get('/units', { params: listParams }).then((res) => {
      if (res.data && res.data) {
        commit('SET_LISTS', res.data.data)
      }
    })
  },

  async setPagination({ commit, dispatch }, payload) {
    let paginationPayload = {}

    if (payload) {
      if (payload.page) {
        paginationPayload.currentPage = payload.page
      }

      if (payload.limit) {
        paginationPayload.limitPerPage = payload.limit
      }
    }

    commit('SET_PAGINATION', paginationPayload)
  },

  async createModel({ commit }, payload) {
    return await this.$axios.post('/units', payload)
  },

  async updateModel({ commit, state }, payload) {
    if (payload) {
      return await this.$axios.put('/units/' + payload.id, payload)
    }
  },

  async fetchModel({ commit }, id) {
    await this.$axios
      .get('/units/' + id)
      .then((res) => {
        if (res.data && res.data.data) {
          commit('SET_MODEL', res.data.data)
          commit('SET_EDITED_MODEL_ID', id)
        }
        return true
      })
      .catch((err) => {
        return false
      })
  },

  async deleteModel({}, id) {
    return await this.$axios.delete('/units/' + id)
  },
}
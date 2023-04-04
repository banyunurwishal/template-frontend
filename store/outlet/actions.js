export default {
  async fetchLists({ commit, state }) {
    let listParams = {}

    await this.$axios.get('/staff', { params: listParams }).then((res) => {
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
    return await this.$axios.post('/staff', payload)
  },

  async updateModel({ commit, state }, payload) {
    if (payload) {
      return await this.$axios.put('/staff/' + payload.uuid, payload)
    }
  },

  async fetchModel({ commit }, id) {
    await this.$axios
      .get('/staff/' + id)
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
    return await this.$axios.delete('/staff/' + id)
  },

  async fetchListCompany({ commit, state }, params) {
    await this.$axios.get('/company', { params }).then((res) => {
      if (res.data && res.data) {
        commit('SET_COMPANY', res.data.data)
      }
    })
  },

  async fetchListOutlet({ commit, state }, params) {
    await this.$axios.get('/outlet?company_id=' + params).then((res) => {
      if (res.data && res.data) {
        commit('SET_OUTLET', res.data.data)
      }
    })
  },

  async fetchListOutletById({ commit, state }, params) {
    await this.$axios.get('/outlet/' + params).then((res) => {
      if (res.data && res.data) {
        commit('SET_OUTLETBYID', res.data.data)
      }
    })
  },
}

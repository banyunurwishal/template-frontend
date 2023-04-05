export default {
  SET_LISTS: (state, payload) => {
    state.lists = payload
  },
  SET_PAGINATION: (state, payload) => {
    if (payload.totalData) {
      state.listPagination.totalData = payload.totalData
    }

    if (payload.currentPage) {
      state.listPagination.currentPage = payload.currentPage
    }

    if (payload.lastPage) {
      state.listPagination.lastPage = payload.lastPage
    }

    if (payload.limitPerPage) {
      state.listPagination.limitPerPage = payload.limitPerPage
    }
  },
  SET_MODEL: (state, payload) => {
    state.model = payload
  },
  SET_EDITED_MODEL_ID: (state, payload) => {
    state.editedModelId = payload
  },
  CLEAR_MODEL: (state) => {
    state.model = null
    state.editedModelId = null
  },

  SET_COMPANY: (state, payload) => {
    state.company = payload
  },

  SET_OUTLET: (state, payload) => {
    state.outlet = payload
  },
  SET_OUTLETBYID: (state, payload) => {
    state.outletById = payload
  },
}

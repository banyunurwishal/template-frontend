export const state = () => ({
  loadingMessage: '',
  isLoading: '',
})

export const mutations = {
  SET_LOADING(state, payload) {
    state.loadingMessage = payload.loadingMessage
    state.isLoading = payload.isLoading
  },
}

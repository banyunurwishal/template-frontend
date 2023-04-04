export default ({ app, store }, inject) => {
  inject('processLoading', {
    SET_LOADING({
      loadingMessage = 'Loading, please wait ...',
      isLoading = true,
    }) {
      store.commit('loading/SET_LOADING', {
        loadingMessage: loadingMessage,
        isLoading: isLoading,
      })
    },

    SHOW({ loadingMessage = 'Loading, please wait ...' }) {
      store.commit('loading/SET_LOADING', {
        loadingMessage: loadingMessage,
        isLoading: true,
      })
    },

    HIDE({ loadingMessage = 'Loading, please wait ...' }) {
      store.commit('loading/SET_LOADING', {
        loadingMessage: loadingMessage,
        isLoading: false,
      })
    },
  })
}

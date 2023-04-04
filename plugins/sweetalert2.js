import Vue from 'vue'

Vue.mixin({
  methods: {
    alertLoginSuccess(message) {
      this.$swal({
        toast: true,
        position: 'top-right',
        background: '#eff8ff',
        showConfirmButton: false,
        timer: 1000,
        icon: 'success',
        iconColor: '#ADD8E6',
        title: message,
        color: '#ADD8E6',
      })
    },

    alertLoginFail(message) {
      this.$swal({
        toast: true,
        position: 'top-right',
        background: '#f27474',
        showConfirmButton: false,
        timer: 1500,
        icon: 'error',
        iconColor: 'white',
        title: message,
        color: 'white',
      })
    },

    alertToastSuccess(message) {
      this.$swal({
        toast: true,
        position: 'top-right',
        background: '#28a745',
        showConfirmButton: false,
        timer: 2000,
        icon: 'success',
        iconColor: 'white',
        title: message,
        color: 'white',
      })
    },

    alertToastFail(message) {
      this.$swal({
        toast: true,
        position: 'top-right',
        background: '#f27474',
        showConfirmButton: false,
        timer: 2000,
        icon: 'error',
        iconColor: 'white',
        title: message,
        color: 'white',
      })
    },

    deleteModal() {
      return this.$swal({
        title: 'Are you sure you want to delete this?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#B42318',
        cancelButtonColor: '#6C6C6C',
        confirmButtonText: 'Yes, delete it!',
      })
    },
  },
})

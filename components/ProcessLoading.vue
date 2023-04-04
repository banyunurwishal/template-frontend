<template>
  <div class="loading-container" v-show="isLoading">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<style>
.loading-container {
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  width: 100%;
  height: 100%;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid white;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: white transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.message {
  padding-top: 70px;
  font-weight: 600;
  width: 600px;
  color: white;
  position: absolute;
  text-align: center;
  margin-top: 45px;
}
</style>

<script>
export default {
  data() {
    return {
      message: '',
      isLoading: '',
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'loading/SET_LOADING') {
        this.message = state.loading.loadingMessage
        this.isLoading = state.loading.isLoading
      }
    })
  },
}
</script>

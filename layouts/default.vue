<template>
  <div>
    <process-loading />
    <navbar />
  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
import Main from '../components/Main.vue'
import ProcessLoading from '../components/ProcessLoading.vue'
export default {
  name: 'default',
  created() {},
  components: {
    navbar,
    Main,
    ProcessLoading,
  },
}
</script>

<template>
  <nuxt :key="key" />
</template>

<script>
export default {
  name: 'Main',
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>

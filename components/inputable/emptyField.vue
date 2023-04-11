<template>
  <div class="text-center py-5">
    <font-awesome-icon :icon="hasIcon" style="font-size: 64px" />
    <h4 class="mt-2">{{ state }}</h4>
  </div>
</template>
<script>
export default {
  props: {
    state: '',
    hasIcon: [],
  },
}
</script>

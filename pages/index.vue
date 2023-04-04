<template>
  <div id="outlets" class="">
    <section
      class="section mt-5"
      style="padding-left: 2rem !important; padding-right: 2rem !important"
    >
      <div class="section-body">
        <b-row class="px-3">
          <b-col>
            <div>
              <h4>Outlets</h4>
            </div>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async created() {
    this.$processLoading.SHOW({})
    this.$processLoading.HIDE({})
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

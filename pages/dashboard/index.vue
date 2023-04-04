<template>
  <div id="company" class="">
    <section
      class="section mt-5"
      style="padding-left: 2rem !important; padding-right: 2rem !important"
    >
      <div class="section-body">
        <b-row class="px-3">
          <b-col>
            <b-row>
              <b-col>
                <h4>Total Sales</h4>
                <div class="clearfix mt-3"></div>
                <b-card class="rounded-10 card-dashboard">
                  <div>
                    <h5>Today</h5>
                    <h6>17 March 2023</h6>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center">
                    <div>
                      <span>Total Income</span>
                    </div>
                    <div class="ml-auto">
                      <span style="font-size: 24px">1.046.240</span>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col align-self="end">
                <b-card class="rounded-10 card-dashboard">
                  <div>
                    <h5>This Week</h5>
                    <h6>13 March - 19 March 2023</h6>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center">
                    <div>
                      <span>Total Income</span>
                    </div>
                    <div class="ml-auto">
                      <span style="font-size: 24px"> 20.956. 590</span>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col align-self="end">
                <b-card class="rounded-10 card-dashboard">
                  <div>
                    <h5>This Month</h5>
                    <h6>March 2023</h6>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center">
                    <div>
                      <span>Total Income</span>
                    </div>
                    <div class="ml-auto">
                      <span style="font-size: 24px">81.169.120</span>
                    </div>
                  </div>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h4>Total Customer</h4>
                <div class="clearfix mt-3"></div>
                <b-card class="rounded-10 card-dashboard">
                  <div>
                    <h5>Today</h5>
                    <h6>17 March 2023</h6>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center">
                    <div>
                      <span>Total Customer</span>
                    </div>
                    <div class="ml-auto">
                      <span style="font-size: 24px">4</span>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col align-self="end">
                <b-card class="rounded-10 card-dashboard">
                  <div>
                    <h5>This Week</h5>
                    <h6>13 March - 19 March 2023</h6>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center">
                    <div>
                      <span>Total Customer</span>
                    </div>
                    <div class="ml-auto">
                      <span style="font-size: 24px">204</span>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col align-self="end">
                <b-card class="rounded-10 card-dashboard">
                  <div>
                    <h5>This Month</h5>
                    <h6>March 2023</h6>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center">
                    <div>
                      <span>Total Customer</span>
                    </div>
                    <div class="ml-auto">
                      <span style="font-size: 24px">1.204</span>
                    </div>
                  </div>
                </b-card>
              </b-col>
            </b-row>
            <hr />
            <b-row class="mt-4">
              <b-col>
                <h4>Total Sales Graph</h4>
                <div class="clearfix mt-3"></div>
                <b-card class="rounded-10 card-dashboard p-5"> </b-card>
              </b-col>
              <b-col>
                <h4>Total Customer Graph</h4>
                <div class="clearfix mt-3"></div>
                <b-card class="rounded-10 card-dashboard p-5"> </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
export default {
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

<template>
  <div id="app" class="d-flex flex-col vh-100">
    <section class="section w-50 bg-primary">
      <div class="h-100 w-100 d-flex justify-content-center align-items-center">
        <div class="card bg-transparent" style="width: 350px !important">
          <div class="text-center justify-content-center">
            <h4 class="text-secondary mb-3">Kokarmina</h4>
          </div>

          <div class="card-body">
            <form @submit.prevent.stop="handleLogin">
              <div class="form-group">
                <input
                  id="email"
                  type="email"
                  v-model="formModel.email"
                  class="form-control rounded-8"
                  name="email"
                  tabindex="1"
                  required
                  autofocus
                  placeholder="Email"
                />
                <div class="invalid-feedback">Please fill in your email</div>
              </div>

              <div class="form-group">
                <input
                  id="password"
                  type="password"
                  class="form-control rounded-8"
                  name="password"
                  v-model="formModel.password"
                  tabindex="2"
                  required
                  placeholder="Password"
                />
                <div class="invalid-feedback">please fill in your password</div>
              </div>

              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-secondary btn-lg btn-block rounded-8"
                >
                  <span class="text-primary"><b>Sign in</b></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section
      class="section w-50 position-relative align-items-center overflow-hidden"
    >
      <b-img
        src="@/assets/img/img-login.png"
        class="w-100 position-absolute"
        style="bottom: 0px"
      ></b-img>
    </section>
  </div>
</template>

<script>
export default {
  name: 'login',
  layout: 'empty',
  auth: 'guest',
  data() {
    return {
      formModel: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async handleLogin() {
      let routeData = this.$router.resolve({
        name: 'Dashboard',
      })
      window.location.href = routeData.href
    },
  },
}
</script>

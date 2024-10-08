<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="text-center mb-4 text-danger">Login to Liverpool Fan Club</h1>
            <form v-on:submit.prevent="onLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-danger w-100">Login</button>
              <div class="text-danger mt-3" v-if="error">{{ error }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f9f9f9;
}

h1 {
  color: #c8102e;
}

.card {
  border: none;
  border-radius: 10px;
}

.btn-danger {
  background-color: #c8102e;
  border-color: #c8102e;
}

.text-danger {
  color: #c8102e !important;
}

.error {
  color: red;
}
</style>

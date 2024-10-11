<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Create User</h1>
    <form v-on:submit.prevent="createUser" class="bg-light p-4 rounded shadow-sm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" class="form-control" v-model="user.name" placeholder="Enter your name" required>
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name</label>
        <input type="text" id="lastname" class="form-control" v-model="user.lastname" placeholder="Enter your last name" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" v-model="user.email" placeholder="Enter your email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" v-model="user.password" placeholder="Enter your password" required>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary w-100">Create User</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    }
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
.bg-light {
  background-color: #f8f9fa !important;
}
</style>

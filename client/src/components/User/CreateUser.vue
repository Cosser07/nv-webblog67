<template>
  <div class="container mt-5 create-user-form">
    <h1 class="text-center mb-4">สร้างผู้ใช้งาน</h1>
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
      </div><br>
      <div class="text-center">
        <button type="submit" class="btn btn-primary w-100">สร้าง</button>
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
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap');

.container {
  max-width: 600px;
  font-family: 'Kanit', sans-serif;
}

h1 {
  color: #c8102e;
  font-weight: bold;
  letter-spacing: 1px;
}

.form-label {
  font-size: 1.1rem;
  color: #495057;
}

.form-control {
  border-radius: 10px;
  border: 2px solid #dee2e6;
  padding: 0.75rem 1rem;
}

.form-control:focus {
  border-color: #c8102e;
  box-shadow: 0 0 5px rgba(200, 16, 46, 0.25);
}

button {
  background-color: #c8102e;
  border-color: #c8102e;
  padding: 10px 15px;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-family: 'Kanit', sans-serif; /* ปรับฟอนต์ของปุ่ม */
}

button:hover {
  background-color: #a50e26;
  border-color: #a50e26;
}

.bg-light {
  background-color: #f8f9fa !important;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>

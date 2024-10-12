<template>
  <div class="container liverpool-theme mt-5">
    <h1 class="text-center mb-4">แก้ไขข้อมูลผู้ใช้</h1>

    <form v-on:submit.prevent="editUser" class="bg-light p-5 rounded shadow-lg">
      <div class="mb-4">
        <label for="name" class="form-label">ชื่อ</label>
        <input
          type="text"
          id="name"
          class="form-control"
          v-model="user.name"
          placeholder="กรอกชื่อของคุณ"
          required
        />
      </div>
      <div class="mb-4">
        <label for="lastname" class="form-label">นามสกุล</label>
        <input
          type="text"
          id="lastname"
          class="form-control"
          v-model="user.lastname"
          placeholder="กรอกนามสกุลของคุณ"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="form-label">อีเมล</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="user.email"
          placeholder="กรอกอีเมลของคุณ"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">รหัสผ่าน</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="user.password"
          placeholder="กรอกรหัสผ่านของคุณ"
          required
        />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-warning w-100 btn-lg">แก้ไขข้อมูล</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from "../../services/UsersService";
export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
      },
    };
  },
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push("/users");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap");

.liverpool-theme {
  font-family: "Kanit", sans-serif;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: auto;
}

h1 {
  color: #c8102e;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.form-label {
  font-weight: bold;
  color: #495057;
  font-size: 1.1rem;
}

input {
  font-family: "Kanit", sans-serif;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #dee2e6;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #c8102e;
  box-shadow: 0px 0px 5px rgba(200, 16, 46, 0.25);
}

button {
  font-family: "Kanit", sans-serif;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: black;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.bg-light {
  background-color: #f8f9fa !important;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
}
</style>

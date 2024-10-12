<template>
  <div class="container liverpool-theme mt-5">
    <h1 class="text-center mb-4">แก้ไขข้อมูลผู้ใช้</h1>

    <form v-on:submit.prevent="editUser" class="bg-light p-4 rounded shadow-sm">
      <div class="mb-3">
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
      <div class="mb-3">
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
      <div class="mb-3">
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
      <div class="mb-3">
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
        <button type="submit" class="btn btn-warning w-100">แก้ไขข้อมูล</button>
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
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #c8102e; /* สีแดงของ Liverpool */
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.form-label {
  font-weight: bold;
  color: #495057;
}

input {
  font-family: "Kanit", sans-serif;
  padding: 5px;
  border-radius: 5px;
}

button {
  font-family: "Kanit", sans-serif;
  padding: 10px 15px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: black;
}

button:hover {
  opacity: 0.8;
}
</style>

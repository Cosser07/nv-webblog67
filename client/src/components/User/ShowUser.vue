<template>
  <div class="container py-5 user-details">
    <h1 class="text-center mb-4">รายละเอียด</h1>
    <div class="card mx-auto shadow-lg" style="max-width: 600px;">
      <div class="card-body">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Lastname:</strong> {{ user.lastname }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Password:</strong> {{ user.password }}</p>
        <p><strong>Status:</strong> {{ user.status }}</p>
        <p><strong>Created At:</strong> {{ user.createdAt }}</p>
        <div class="mt-4 text-center">
          <button @click="navigateTo('/users')" class="btn btn-liverpool mt-3">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {}
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
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap");

.user-details {
  font-family: "Kanit", sans-serif;
}

h1 {
  color: #c8102e; /* สีแดงของ Liverpool */
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.card {
  background-color: #f8f9fa;
  border: none;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.card-body p {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

strong {
  color: #c8102e; /* เน้นสีแดงสำหรับข้อมูลสำคัญ */
}

.btn-liverpool {
  background-color: #c8102e;
  border-color: #c8102e;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
}

.btn-liverpool:hover {
  background-color: #a50e26;
  border-color: #a50e26;
}

.text-center {
  text-align: center;
}
</style>

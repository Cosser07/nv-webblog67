<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'lfc' }">Liverpool</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'comments' }">Comments</router-link></li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
/* Navbar Styles */
.nv-navbar {
  background-color: #c8102e; /* สีแดงธีมลิเวอร์พูล */
  width: 100%;
  padding: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nv-navbar .nav li {
  margin: 0 15px;
}

.nv-navbar .nav li a {
  color: #fff; /* สีขาวสำหรับข้อความ */
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nv-navbar .nav li a:hover {
  background-color: #a50f25; /* สีแดงเข้มขึ้นเมื่อ hover */
  color: #fff;
}

.nv-navbar .nav li a.router-link-active {
  background-color: #ffffff; /* สีทองสำหรับการเลือกเมนู */
  color: #c8102e;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nv-navbar {
    padding: 10px 0;
  }

  .nv-navbar .nav {
    flex-direction: column;
  }

  .nv-navbar .nav li {
    margin: 10px 0;
  }
}
</style>

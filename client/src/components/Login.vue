<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <form v-on:submit.prevent="onLogin" class="login">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input
              type="email"
              v-model="email"
              class="login__input"
              placeholder="User name / Email"
              required
            />
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input
              type="password"
              v-model="password"
              class="login__input"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" class="button login__submit">
            <span class="button__text">Log In Now</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
          <div class="text-danger mt-3" v-if="error">{{ error }}</div>
        </form>
        <div class="social-login">
          <h3>log in via</h3>
          <div class="social-icons">
            <a href="#" class="social-login__icon fab fa-instagram"></a>
            <a href="#" class="social-login__icon fab fa-facebook"></a>
            <a href="#" class="social-login__icon fab fa-twitter"></a>
          </div>
        </div>
      </div>
      <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape3"></span>
        <span class="screen__background__shape screen__background__shape2"></span>
        <span class="screen__background__shape screen__background__shape1"></span>
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
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}

body {
  background: linear-gradient(90deg, #C7C5F4, #776BCC);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px; /* เพิ่ม padding เพื่อให้มีระยะห่างจากขอบ */
}

.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5C5696;
  overflow: hidden; /* ป้องกันไม่ให้ background shape เกินออกมานอกขอบ */
  border-radius: 20px; /* เพิ่มขอบโค้งมนเพื่อความสวยงาม */
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}
.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #FFF;
  top: -50px;
  right: 100px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6C63AC;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5D54A4, #6A679E);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7E7BB9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875B5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: .2s;
}

.login__input:focus {
  outline: none;
  border-bottom-color: #6A679E;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #eb1414;
  cursor: pointer;
  transition: .2s;
}

.login__submit:hover {
  border-color: #6A679E;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875B5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0;
  right: 0;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;
}
</style>

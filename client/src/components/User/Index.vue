<template>
  <div class="container-fluid liverpool-theme">
    <h1 class="text-center mb-4">ผู้ใช้งานทั้งหมด</h1>

    <div class="text-end mb-3">
      <button class="btn btn-liverpool btn-lg" v-on:click="navigateTo('/user/create')">
        สร้างผู้ใช้
      </button>
    </div>

    <div v-if="users.length">
      <div class="mb-3">
        <b>จำนวนผู้ใช้งาน:</b> {{ users.length }}
      </div>

      <div class="list-group">
        <div
          v-for="user in users"
          v-bind:key="user.id"
          class="list-group-item shadow-sm rounded"
        >
          <div class="row align-items-center">
            <div class="col-md-8">
              <div><b>ID:</b> {{ user.id }}</div>
              <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
              <div><b>อีเมล:</b> {{ user.email }}</div>
              <div><b>Status:</b> {{ user.status }}</div>
              <!-- <div><b>Type:</b> {{ user.type }}</div> -->
            </div>
            <div class="col-md-4 text-end">
              <button class="btn btn-liverpool-info btn-sm me-2" v-on:click="navigateTo('/user/'+user.id)">
                ดูข้อมูล
              </button>
              <button class="btn btn-liverpool-warning btn-sm me-2" v-on:click="navigateTo('/user/edit/'+user.id)">
                แก้ไขข้อมูล
              </button>
              <button class="btn btn-liverpool-danger btn-sm" v-on:click="deleteUser(user)">
                ลบข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-end mt-4">
        <button class="btn btn-secondary" v-on:click="logout">Logout</button>
      </div>
    </div>

    <div v-else class="text-center">
      <p>ยังไม่มีผู้ใช้งาน</p>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
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
  min-height: 100vh; /* กำหนดให้ใช้ความสูงเต็มจอ */
  width: 100vw; /* กำหนดให้ใช้ความกว้างเต็มจอ */
  font-family: "Kanit", sans-serif;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #c8102e; /* สีแดงของ Liverpool */
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

button {
  font-family: 'Kanit', sans-serif; /* ใช้ฟอนต์ Kanit */
  font-size: 14px;
  font-weight: 550;
  transition: all 0.3s ease;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
}

button.btn-lg {
  font-size: 16px;
  font-weight: bold;
}

button.btn-liverpool {
  background-color: #c8102e;
  border-color: #c8102e;
}

button.btn-liverpool-info {
  background-color: #007bff;
  border-color: #007bff;
}

button.btn-liverpool-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: black;
}

button.btn-liverpool-danger {
  background-color: #c8102e;
  border-color: #c8102e;
}

button:hover {
  opacity: 0.85;
}

.list-group-item {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 1.5rem;
  transition: box-shadow 0.3s ease;
}

.list-group-item:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.text-danger {
  color: #c8102e !important;
}

p {
  color: #495057;
  font-size: 18px;
  text-align: center;
}
</style>

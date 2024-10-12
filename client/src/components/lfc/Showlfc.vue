<template>
  <div class="form-container">
    <h1>รายละเอียดการแข่งขัน</h1>
    <div v-if="lfc" class="details">
      <table class="details-table">
        <tr>
          <th>ทีมตรงข้าม:</th>
          <td>{{ lfc.opponent_team }}</td>
        </tr>
        <tr>
          <th>ผลการแข่งขัน:</th>
          <td>{{ lfc.match_result }}</td>
        </tr>
        <tr>
          <th>สกอร์:</th>
          <td>{{ lfc.score }}</td>
        </tr>
        <tr>
          <th>นาทีที่ทำประตู:</th>
          <td>{{ lfc.goal_minute }}</td>
        </tr>
        <tr>
          <th>ชื่อผู้เล่น:</th>
          <td>{{ lfc.player_name }}</td>
        </tr>
        <tr>
          <th>หมายเลขเสื้อ:</th>
          <td>{{ lfc.jersey_number }}</td>
        </tr>
      </table>
      <button @click="navigateTo('/lfc')">กลับไปยังหน้าแรก</button>
    </div>
  </div>
</template>

<script>
import lfcService from "@/services/lfcService";

export default {
  data() {
    return {
      lfc: null
    };
  },
  async created() {
    try {
      let lfcId = this.$route.params.lfcId; // ดึง lfcId จาก URL
      this.lfc = (await lfcService.show(lfcId)).data; // โหลดข้อมูล lfc จาก API
    } catch (error) {
      console.log(error);
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
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-family: 'Kanit', sans-serif;
}

/* Table Styling */
.details-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
}

.details-table th,
.details-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 16px;
}

.details-table th {
  background-color: #c8102e; /* สีแดงธีมลิเวอร์พูล */
  color: white;
  width: 35%;
  text-transform: uppercase;
}

.details-table td {
  background-color: #fff;
  font-weight: 500;
}

/* Button Styling */
button {
  margin-top: 20px;
  background-color: #c8102e; /* สีแดงธีมลิเวอร์พูล */
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #a50f25; /* สีแดงเข้มขึ้นเมื่อ hover */
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    width: 100%;
    padding: 20px;
  }

  .details-table th,
  .details-table td {
    font-size: 14px;
    padding: 10px;
  }

  button {
    font-size: 16px;
    padding: 10px 20px;
  }
}
</style>

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
  }
  
  /* Table Styling */
  .details-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .details-table th,
  .details-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .details-table th {
    background-color: #c8102e; /* สีแดงธีมลิเวอร์พูล */
    color: white;
    width: 30%;
  }
  
  .details-table td {
    background-color: #fff;
  }
  
  /* Button Styling */
  button {
    margin-top: 20px;
    background-color: #c8102e; /* สีแดงธีมลิเวอร์พูล */
    color: white;
    padding: 12px 20px;
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
  </style>
  
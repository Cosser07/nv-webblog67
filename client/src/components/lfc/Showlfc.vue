<template>
    <div class="form-container">
      <h1>รายละเอียดการแข่งขัน</h1>
      <div v-if="lfc" class="details">
        <h2>รายละเอียดการแข่งขัน</h2>
        <p><strong>Match:</strong> {{ lfc.opponent_team }}</p>
        <p><strong>Result:</strong> {{ lfc.match_result }}</p>
        <p><strong>Score:</strong> {{ lfc.score }}</p>
        <p><strong>Minute:</strong> {{ lfc.goal_minute }}</p>
        <p><strong>Player Name:</strong> {{ lfc.player_name }}</p>
        <p><strong>Jersey Number:</strong> {{ lfc.jersey_number }}</p>
        <button @click="navigateTo('/lfc')">ปิดรายละเอียด</button>
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
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
  .details p {
    font-size: 18px;
    line-height: 1.5;
  }
  button {
    margin-top: 20px;
    background-color: #007bff;
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
    background-color: #0056b3;
  }
  </style>
  
<template>
    <div class="container">
      <h1>Liverpool Premier League 2023-2024</h1>
      <p><button v-on:click="goToCreatelfc">สร้างผลการแข่งขัน</button></p>
  
      <!-- ตารางข้อมูลการแข่งขัน -->
      <table id="matches-table">
        <thead>
          <tr>
            <th>Match</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(match, index) in matchesData" :key="index">
            <td>{{ match.match }}</td>
            <td>{{ match.result }}</td>
            <td>
              <button @click="viewDetails(index)">ดูรายละเอียด</button>
              <button @click="editMatch(index)">แก้ไข</button>
              <button @click="deleteMatch(index)">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- แสดงรายละเอียด -->
      <div v-if="selectedMatch !== null" class="details">
        <h2>รายละเอียดการแข่งขัน</h2>
        <p><strong>Match:</strong> {{ selectedMatch.match }}</p>
        <p><strong>Result:</strong> {{ selectedMatch.result }}</p>
        <p><strong>Score:</strong> {{ selectedMatch.score }}</p>
        <p><strong>Goalscorer:</strong> {{ selectedMatch.goalscorer }}</p>
        <p><strong>Minute:</strong> {{ selectedMatch.minute }}</p>
        <p><strong>Player Name:</strong> {{ selectedMatch.playerName }}</p>
        <p><strong>Jersey Number:</strong> {{ selectedMatch.jerseyNumber }}</p>
        <button @click="closeDetails">ปิดรายละเอียด</button>
      </div>
    </div>
  </template>
  
  <script>
import lfcService from '@/services/lfcService'

export default {
  data() {
    return {
      lfc: [],  // เก็บข้อมูล lfc ที่ดึงมาจากฐานข้อมูล
      matchesData: [], // เก็บข้อมูลการแข่งขันที่ดึงมาจากฐานข้อมูล
      selectedMatch: null
    }
  },
  async created() {
    // โหลดข้อมูล lfc เมื่อคอมโพเนนต์ถูกสร้าง
    await this.refreshData();
  },
  methods: {
    // ฟังก์ชันดูรายละเอียดการแข่งขัน
    viewDetails(index) {
      this.selectedMatch = this.matchesData[index];
    },
    closeDetails() {
      this.selectedMatch = null;
    },
    editMatch(index) {
      let newResult = prompt("แก้ไขผลการแข่งขัน:", this.matchesData[index].result);
      if (newResult) {
        this.matchesData[index].result = newResult;
      }
    },
    deleteMatch(index) {
      let confirmed = confirm("คุณต้องการลบข้อมูลนี้หรือไม่?");
      if (confirmed) {
        this.matchesData.splice(index, 1);
      }
    },
    // นำทางไปยังหน้าสร้าง lfc
    goToCreatelfc() {
      this.$router.push('/lfc/create');
    },
    // ฟังก์ชันลบ lfc
    async deletelfc(lfcItem) {
      let result = confirm("คุณต้องการลบข้อมูลนี้หรือไม่?");
      if (result) {
        try {
          await lfcService.delete(lfcItem.id);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    // ฟังก์ชันรีเฟรชข้อมูลจากฐานข้อมูล
    async refreshData() {
      try {
        const response = await lfcService.index();
        this.lfc = response.data;
        // สร้าง matchesData จากข้อมูลที่ได้มา
        this.matchesData = this.lfc.map(item => ({
          match: item.title,
          result: item.matchResult,
          score: item.score,
          goalscorer: item.goalScorer,
          minute: item.goalMinute,
          playerName: item.playerName,
          jerseyNumber: item.playerNumber
        }));
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    }
  }
}
</script>
  
  <style scoped>
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #cc0000;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 12px;
    text-align: center;
  }
  
  th {
    background-color: #cc0000;
    color: white;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  tr:hover {
    background-color: #ddd;
  }
  
  td {
    font-size: 16px;
  }
  
  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #cc0000;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #b30000;
  }
  
  .details {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .details h2 {
    color: #cc0000;
  }
  </style>
  
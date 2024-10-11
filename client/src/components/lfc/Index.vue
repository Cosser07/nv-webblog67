<template>
  <div class="form-container">
      <h1>Liverpool Premier League 2023-2024</h1>
      <p><button v-on:click="navigateTo('/lfc/create')">สร้างผลการแข่งขัน</button></p>

      <table id="matches-table">
          <thead>
              <tr>
                  <th>Match</th>
                  <th>Result</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(match, index) in matchesData" :key="match.id"> <!-- ตรวจสอบให้แน่ใจว่า `id` ถูกต้อง -->
                  <td>{{ match.opponent_team }}</td>
                  <td>{{ match.match_result }}</td>
                  <td>
                      <button v-on:click="navigateTo('/lfc/' + match.id)">ดูรายละเอียด</button>
                      <button v-on:click="navigateTo('/lfc/edit/' + match.id)">แก้ไข</button>
                      <button v-on:click="deleteMatch(match)">ลบ</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import lfcService from '@/services/lfcService';

export default {
  data() {
      return {
          matchesData: []
      };
  },
  async created() {
      this.matchesData = (await lfcService.index()).data;
  },
  methods: {
      navigateTo(route) {
          this.$router.push(route);
      },
      async deleteMatch(match) {
          let result = confirm("ต้องการลบข้อมูลนี้หรือไม่?");
          if (result) {
              try {
                  await lfcService.delete(match.id);
                  this.refreshData(); // เรียกใช้ฟังก์ชัน refreshData เพื่ออัปเดตข้อมูลใหม่
              } catch (err) {
                  console.log(err);
              }
          }
      },
      async refreshData() {
          this.matchesData = (await lfcService.index()).data;
      }
  }
};
</script>

<style scoped>
/* เพิ่มสไตล์ตามที่ต้องการ */
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
</style>

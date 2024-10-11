<template>
  <div class="form-container">
    <h1>แก้ไขข้อมูลผลการแข่งขัน</h1>

    <form v-on:submit.prevent="editlfc" class="form">
      <!-- ฟอร์มแก้ไขข้อมูล -->
      <p>
        <strong>ทีมตรงข้าม:</strong>
        <input type="text" v-model="lfc.opponent_team" placeholder="Enter team name" class="input-field" />
      </p>

      <p>
        <strong>ผลการแข่งขัน:</strong>
        <input type="text" v-model="lfc.match_result" placeholder="Win/Draw/Loss" class="input-field" />
      </p>

      <p>
        <strong>คะแนนที่ทำได้ (สกอร์):</strong>
        <input type="text" v-model="lfc.score" placeholder="e.g., 3-1" class="input-field" />
      </p>

      <p>
        <strong>เวลาที่ทำประตู (นาทีที่):</strong>
        <input type="text" v-model="lfc.goal_minute" placeholder="Minute" class="input-field" />
      </p>

      <p>
        <strong>ชื่อผู้เล่น:</strong>
        <input type="text" v-model="lfc.player_name" placeholder="Player Name" class="input-field" />
      </p>

      <p>
        <strong>หมายเลขเสื้อ:</strong>
        <input type="text" v-model="lfc.jersey_number" placeholder="Jersey Number" class="input-field" />
      </p>

      <p>
        <button type="submit" class="btn-submit">Update lfc</button>
        <button v-on:click="navigateTo('/lfc')">กลับ</button>
      </p>
    </form>
  </div>
</template>

<script>
import lfcService from "@/services/lfcService";

export default {
  data() {
    return {
      lfc: {
        opponent_team: "",
        match_result: "",
        score: "",
        goal_minute: "",
        player_name: "",
        jersey_number: ""
      }
    };
  },
  methods: {
    async editlfc() {
      try {
        await lfcService.put(this.lfc);
        this.$router.push({ name: "lfc" });
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  async created() {
  try {
    let lfcId = this.$route.params.lfcId; // ดึง lfcId จาก URL
    this.lfc = (await lfcService.show(lfcId)).data; // โหลดข้อมูล lfc จาก API
    console.log("Loaded data:", this.lfc); // ตรวจสอบข้อมูลที่โหลดมา
  } catch (error) {
    console.log("Error loading data:", error);
  }
}
};
</script>

<style scoped>
/* เพิ่มการจัดสไตล์ตามที่ต้องการ */
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.btn-submit {
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
</style>

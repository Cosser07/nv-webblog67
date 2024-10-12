<template>
  <div class="form-container">
    <h1>แก้ไขข้อมูลผลการแข่งขัน</h1>

    <form v-on:submit.prevent="editlfc">
      <!-- ฟอร์มแก้ไขข้อมูล -->
      <div class="form-group">
        <label for="opponent_team"><strong>ทีมตรงข้าม:</strong></label>
        <input type="text" id="opponent_team" v-model="lfc.opponent_team" placeholder="Enter team name" class="input-field" />
      </div>

      <div class="form-group">
        <label for="match_result"><strong>ผลการแข่งขัน:</strong></label>
        <input type="text" id="match_result" v-model="lfc.match_result" placeholder="Win/Draw/Loss" class="input-field" />
      </div>

      <div class="form-group">
        <label for="score"><strong>คะแนนที่ทำได้ (สกอร์):</strong></label>
        <input type="text" id="score" v-model="lfc.score" placeholder="e.g., 3-1" class="input-field" />
      </div>

      <div class="form-group">
        <label for="goal_minute"><strong>เวลาที่ทำประตู (นาทีที่):</strong></label>
        <input type="text" id="goal_minute" v-model="lfc.goal_minute" placeholder="Minute" class="input-field" />
      </div>

      <div class="form-group">
        <label for="player_name"><strong>ชื่อผู้เล่น:</strong></label>
        <input type="text" id="player_name" v-model="lfc.player_name" placeholder="Player Name" class="input-field" />
      </div>

      <div class="form-group">
        <label for="jersey_number"><strong>หมายเลขเสื้อ:</strong></label>
        <input type="text" id="jersey_number" v-model="lfc.jersey_number" placeholder="Jersey Number" class="input-field" />
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-submit">อัปเดตข้อมูล</button>
        <button type="button" v-on:click="navigateTo('/lfc')" class="btn btn-cancel">กลับ</button>
      </div>
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
      let lfcId = this.$route.params.lfcId;
      this.lfc = (await lfcService.show(lfcId)).data;
    } catch (error) {
      console.log("Error loading data:", error);
    }
  }
};
</script>

<style scoped>
/* Container Styling */
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  font-family: 'Kanit', sans-serif;
}

/* Form Group Styling */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

/* Input Field Styling */
.input-field {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f1f1f1;
  transition: all 0.3s ease;
  font-size: 16px;
}

/* Button Group Styling */
.button-group {
  text-align: center;
  margin-top: 30px;
}

/* Button Styling */
.btn {
  padding: 12px 20px;
  margin: 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

/* Submit Button */
.btn-submit {
  background-color: #c8102e;
  color: white;
}

.btn-submit:hover {
  background-color: #a50d23;
}

/* Cancel Button */
.btn-cancel {
  background-color: #555;
  color: white;
}

.btn-cancel:hover {
  background-color: #333;
}

/* Form Title Styling */
h1 {
  color: #c8102e;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    width: 100%;
    padding: 20px;
  }

  .input-field {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
    padding: 10px 15px;
  }
}
</style>

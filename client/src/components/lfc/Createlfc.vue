<template>
  <div class="form-container">
    <h1>สร้างข้อมูลผลการแข่งขัน</h1>

    <!-- เพิ่มส่วนเลือกไฟล์โลโก้ทีมตรงข้ามให้อยู่บนสุด -->
    <form v-on:submit.prevent="createlfc" class="form">
      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length;"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial" class="dropbox-text">
            เลือกไฟล์โลโก้ทีมตรงข้าม (Drag your file(s) here or click to browse)
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
      </form>

      <p>
        <strong>ทีมตรงข้าม:</strong>
        <input type="text" v-model="lfc.opponent_team" placeholder="Enter team name" class="input-field"/>
      </p>

      <!-- ข้อมูลการแข่งขัน -->
      <p>
        <strong>ผลการแข่งขัน:</strong>
        <input type="text" v-model="lfc.match_result" placeholder="Win/Draw/Loss" class="input-field"/>
      </p>
      <p>
        <strong>คะแนนที่ทำได้ (สกอร์):</strong>
        <input type="text" v-model="lfc.score" placeholder="e.g., 3-1" class="input-field"/>
      </p>

      <!-- ข้อมูลผู้เล่นที่ทำประตู -->
      <p>
        <strong>เวลาที่ทำประตู (นาทีที่):</strong>
        <input type="text" v-model="lfc.goal_minute" placeholder="Minute" class="input-field"/>
      </p>

      <!-- ข้อมูลผู้เล่น -->
      <p>
        <strong>ชื่อผู้เล่น:</strong>
        <input type="text" v-model="lfc.player_name" placeholder="Player Name" class="input-field"/>
      </p>
      <p>
        <strong>หมายเลขเสื้อ:</strong>
        <input type="text" v-model="lfc.jersey_number" placeholder="Jersey Number" class="input-field"/>
      </p>

      <p>
        <button type="submit" class="btn-submit">Create lfc</button>
      </p>
    </form>
  </div>
</template>

<script>
import lfcService from "@/services/lfcService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "teamLogo", // เปลี่ยนชื่อฟิลด์ให้เหมาะสมกับการเลือกโลโก้ทีมตรงข้าม
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      matches: [], // เก็บข้อมูลการแข่งขันที่เพิ่ม
      lfc: {
        thumbnail: "null",
        pictures: "null",
        opponent_team :"",
        opponent_logo :"",
        match_result: "", // ผลการแข่งขัน win/draw/loss
        score: "", // คะแนนที่ได้ (สกอร์ เช่น 3-1)
        goal_minute: "", // เวลาที่ทำประตู
        player_name: "", // ชื่อผู้เล่น
        jersey_number:"", // หมายเลขเสื้
      },
    };
  },
  methods: {
    async createlfc() {
      this.lfc.pictures = JSON.stringify(this.pictures);
      console.log("JSON.stringify: ", this.lfc);
      try {
        // ส่งข้อมูลบล็อกไปยัง server (จำลอง)
        await lfcService.post(this.lfc);
        // เพิ่มข้อมูลการแข่งขันไปยัง matches array เพื่อแสดงในตาราง
        this.matches.push({
          opponent_team: this.lfc.opponent_team,
          match_result: this.lfc.match_result,
          score: this.lfc.score,
          goal_minute: this.lfc.goal_minute,
          player_name: this.lfc.player_name,
          jersey_number: this.lfc.jersey_number,
        });

        // ล้างข้อมูลในฟอร์ม
        this.lfc.opponent_team = "";
        this.lfc.match_result = "";
        this.lfc.score = "";
        this.lfc.goal_minute = 0;
        this.lfc.player_name = "";
        this.lfc.jersey_number = 0;

        this.$router.push({
          name: "lfc",
        });
      } catch (err) {
        console.log(err);
      }
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      formData.append(fieldName, fileList[0]); // รองรับการเลือกไฟล์แค่ 1 ไฟล์ (โลโก้ทีมตรงข้าม)
      this.pictures.push({ id: this.pictureIndex++, name: URL.createObjectURL(fileList[0]) });
    },
    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
    useThumbnail(filename) {
      console.log(filename);
      this.lfc.thumbnail = filename;
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  components: {
    VueCkeditor,
  },
  created() {
    this.currentStatus = STATUS_INITIAL;
  },
};
</script>

<style scoped>
/* General Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

/* Form Container */
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

/* Form Styling */
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #007bff;
  background-color: #ffffff;
  outline: none;
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

.btn-submit:hover {
  background-color: #0056b3;
}

/* Dropzone */
.dropbox {
  outline: 2px dashed #007bff;
  background: #e9f7ff;
  color: #333;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dropbox:hover {
  background-color: #d0eaff;
}

.thumbnail-pic img {
  max-width: 100px;
  margin: 10px 0;
}

/* Matches Table */
table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 16px;
  text-align: center;
  border: 1px solid #ddd;
  font-size: 16px;
}

th {
  background-color: #007bff;
  color: white;
}

td {
  background-color: white;
  color: #555;
}

tr:nth-child(even) td {
  background-color: #f2f2f2;
}

tr:hover td {
  background-color: #e0e0e0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    width: 95%;
    padding: 20px;
  }

  .input-field,
  .btn-submit {
    font-size: 16px;
  }

  table, th, td {
    font-size: 14px;
  }
}

</style>

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
        <label for="title"><strong>ทีมตรงข้าม:</strong></label>
        <input type="text" id="title" v-model="lfc.title" placeholder="Enter team name" class="input-field"/>
      </p>

      <!-- ข้อมูลการแข่งขัน -->
      <p>
        <strong>ผลการแข่งขัน:</strong>
        <input type="text" v-model="lfc.matchResult" placeholder="Win/Draw/Loss" class="input-field"/>
      </p>
      <p>
        <strong>คะแนนที่ทำได้ (สกอร์):</strong>
        <input type="text" v-model="lfc.score" placeholder="e.g., 3-1" class="input-field"/>
      </p>

      <!-- ข้อมูลผู้เล่นที่ทำประตู -->
      <p>
        <strong>ผู้เล่นที่ทำประตู:</strong>
        <input type="text" v-model="lfc.goalScorer" placeholder="Player who scored" class="input-field"/>
      </p>
      <p>
        <strong>เวลาที่ทำประตู (นาทีที่):</strong>
        <input type="number" v-model="lfc.goalMinute" placeholder="Minute" class="input-field"/>
      </p>

      <!-- ข้อมูลผู้เล่น -->
      <p>
        <strong>ชื่อผู้เล่น:</strong>
        <input type="text" v-model="lfc.playerName" placeholder="Player Name" class="input-field"/>
      </p>
      <p>
        <strong>หมายเลขเสื้อ:</strong>
        <input type="number" v-model="lfc.playerNumber" placeholder="Jersey Number" class="input-field"/>
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
        title: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        matchResult: "", // ผลการแข่งขัน
        score: "", // คะแนนที่ทำได้
        goalScorer: "", // ผู้เล่นที่ทำประตู
        goalMinute: 0, // เวลาที่ทำประตู
        playerName: "", // ชื่อผู้เล่น
        playerNumber: 0, // หมายเลขเสื้อ
        category: "",
        status: "saved",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
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
          title: this.lfc.title,
          result: this.lfc.matchResult,
          score: this.lfc.score,
          goalScorer: this.lfc.goalScorer,
          goalMinute: this.lfc.goalMinute,
          playerName: this.lfc.playerName,
          playerNumber: this.lfc.playerNumber,
        });

        // ล้างข้อมูลในฟอร์ม
        this.lfc.title = "";
        this.lfc.matchResult = "";
        this.lfc.score = "";
        this.lfc.goalScorer = "";
        this.lfc.goalMinute = 0;
        this.lfc.playerName = "";
        this.lfc.playerNumber = 0;

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
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

/* Form Container */
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Form Styling */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-field {
  width: 50%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #cc0000;
  outline: none;
}

.btn-submit {
  background-color: #cc0000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #b30000;
}

/* Dropzone */
.dropbox {
  outline: 2px dashed grey;
  background: lemonchiffon;
  color: dimgray;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dropbox:hover {
  background-color: khaki;
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
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #cc0000;
  color: white;
}

td {
  background-color: white;
  color: #333;
}

tr:nth-child(even) td {
  background-color: #f9f9f9;
}

tr:hover td {
  background-color: #f1f1f1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    width: 100%;
    padding: 10px;
  }

  table, th, td {
    font-size: 14px;
  }
}
</style>

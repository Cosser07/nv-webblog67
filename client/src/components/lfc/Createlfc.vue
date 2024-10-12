<template>
  <div class="form-container">
    <h1>สร้างข้อมูลผลการแข่งขัน</h1>

    <form v-on:submit.prevent="createlfc">
      <transition name="fade">
        <div class="thumbnail-pic" v-if="lfc.thumbnail != 'null'">
          <img :src="BASE_URL + lfc.thumbnail" alt="thumbnail" />
        </div>
      </transition>

      <!-- Upload Section -->
      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">เลือกโลโก้ทีมตรงข้าม (Drag your file here or click to browse)</p>
          <p v-if="isSaving">กำลังอัปโหลด {{ fileCount }} ไฟล์...</p>
          <p v-if="isSuccess">อัปโหลดสำเร็จ</p>
        </div>
      </form>

      <!-- Uploaded Pictures -->
      <div>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" v-bind:key="picture.id">
            <img
              style="margin-bottom: 5px"
              :src="BASE_URL + picture.name"
              alt="picture image"
            />
            <br />
            <button class="btn btn-sm btn-primary" v-on:click.prevent="useThumbnail(picture.name)">
              ใช้เป็น Thumbnail
            </button>
            <button class="btn btn-sm btn-danger" v-on:click.prevent="delFile(picture)">ลบ</button>
          </li>
        </transition-group>
        <div class="clearfix"></div>
      </div>

      <!-- Form Fields -->
      <div class="form-group">
        <label><strong>ทีมตรงข้าม:</strong></label>
        <input type="text" v-model="lfc.opponent_team" placeholder="กรอกชื่อทีม" class="input-field" />
      </div>

      <div class="form-group">
        <label><strong>ผลการแข่งขัน:</strong></label>
        <input type="text" v-model="lfc.match_result" placeholder="Win/Draw/Loss" class="input-field" />
      </div>

      <div class="form-group">
        <label><strong>สกอร์:</strong></label>
        <input type="text" v-model="lfc.score" placeholder="e.g., 3-1" class="input-field" />
      </div>

      <div class="form-group">
        <label><strong>เวลาที่ทำประตู:</strong></label>
        <input type="text" v-model="lfc.goal_minute" placeholder="นาทีที่ทำประตู" class="input-field" />
      </div>

      <div class="form-group">
        <label><strong>ชื่อผู้เล่น:</strong></label>
        <input type="text" v-model="lfc.player_name" placeholder="กรอกชื่อผู้เล่น" class="input-field" />
      </div>

      <div class="form-group">
        <label><strong>หมายเลขเสื้อ:</strong></label>
        <input type="text" v-model="lfc.jersey_number" placeholder="หมายเลขเสื้อ" class="input-field" />
      </div>

      <!-- Submit Button -->
      <p>
        <button type="submit" class="btn-submit">สร้าง</button>
      </p>
    </form>
  </div>
</template>

<script>
import lfcService from "@/services/lfcService";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      lfc: {
        opponent_team: "",
        match_result: "",
        score: "",
        goal_minute: "",
        player_name: "",
        jersey_number: "",
        thumbnail: "null",
      },
    };
  },
  methods: {
    async createlfc() {
      this.lfc.pictures = JSON.stringify(this.pictures);
      try {
        await lfcService.post(this.lfc);
        this.$router.push({ name: "lfc" });
      } catch (err) {
        console.log(err);
      }
    },
    async delFile(picture) {
      if (confirm("ต้องการลบรูปภาพนี้หรือไม่?")) {
        await UploadService.delete({ filename: picture.name });
        this.pictures = this.pictures.filter(p => p.id !== picture.id);
      }
    },
    useThumbnail(filename) {
      this.lfc.thumbnail = filename;
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      Array.from(fileList).forEach(file => {
        formData.append(fieldName, file, file.name);
        this.uploadedFileNames.push(file.name);
      });
      this.save(formData);
    },
    async save(formData) {
      this.currentStatus = STATUS_SAVING;
      try {
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;
        this.uploadedFileNames.forEach(uploadedFile => {
          this.pictures.push({ id: ++this.pictureIndex, name: uploadedFile });
        });
      } catch (error) {
        this.currentStatus = STATUS_FAILED;
      }
    },
  },
  computed: {
    isInitial() { return this.currentStatus === STATUS_INITIAL; },
    isSaving() { return this.currentStatus === STATUS_SAVING; },
    isSuccess() { return this.currentStatus === STATUS_SUCCESS; },
    isFailed() { return this.currentStatus === STATUS_FAILED; },
  },
  created() {
    this.currentStatus = STATUS_INITIAL;
  }
};
</script>

<style scoped>
/* General Styles */
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* Form Group Styling */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

/* Input Field Styling */
.input-field {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.input-field:focus {
  border-color: #007bff;
  background-color: #ffffff;
  outline: none;
}

/* Button Styling */
.btn-submit {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}

/* Dropzone */
.dropbox {
  outline: 2px dashed #007bff;
  background: #e9f7ff;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
}

.thumbnail-pic img {
  width: 150px;
  margin: 10px 0;
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
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

ul.pictures li {
  margin-right: 20px;
}

ul.pictures li img {
  max-width: 150px;
  margin-bottom: 10px;
}

.clearfix {
  clear: both;
}
</style>

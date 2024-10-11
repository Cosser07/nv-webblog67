<template>
  <div class="form-container">
    <h1>สร้างข้อมูลผลการแข่งขัน</h1>
    <form v-on:submit.prevent="createLfc">
      <transition name="fade">
        <div class="thumbnail-pic" v-if="lfc.thumbnail != 'null'">
          <img :src="BASE_URL + lfc.thumbnail" alt="thumbnail" />
        </div>
      </transition>
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
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p v-if="isSuccess">Upload Successful.</p>
      </div>
    </form>
    
        <div>
    <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" v-bind:key="picture.id">
            <img
              style="margin-bottom: 5px"
              :src="BASE_URL + picture.name"
              alt="picture image"
            />
            <br />
            <button v-on:click.prevent="useThumbnail(picture.name)">
              Thumbnail
            </button>
            <button v-on:click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
        <div class="clearfix"></div>
      </div>
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
        <button type="submit" class="btn-submit">Create lfc</button>
      </p>
    </form>
  </div>
</template>

<script>
import lfcService from "@/services/lfcService";
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
      // uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      lfc: {
        pictures: "null",
        opponent_team: "",
        match_result: "",
        score: "",
        goal_minute: "",
        player_name: "",
        jersey_number: "",
        thumbnail: "null", // รูปภาพโลโก้ทีมตรงข้าม
        status: "saved"
      },
    };
  },
  methods: {
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };

        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    async createlfc() {
      this.lfc.pictures = JSON.stringify(this.pictures);
      console.log("JSON.stringify: ", this.lfc);
      try {
        await lfcService.post(this.lfc);
        this.$router.push({
          name: "lfc",
        });
      } catch (err) {
        console.log(err);
      }
    },onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      // upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      // save it
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
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
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
}
</style>

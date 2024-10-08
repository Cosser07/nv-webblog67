<template>
  <div>
    <h1>Create Blog</h1>
    <form v-on:submit.prevent="createBlog">
      <p>
        title:
        <input type="text" v-model="blog.title" />
      </p>
      <transition name="fade">
        <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
          <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
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
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
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
        <strong>content:</strong>
      </p>
      <vue-ckeditor
        v-model.lazy="blog.content"
        :config="config"
        @blur="onBlur($event)"
        @focus="onFocus($event)"
      />
      <!-- ข้อมูลผลการแข่งขัน -->
      <p>
        ผลการแข่งขัน (ชนะ/เสมอ/แพ้):
        <input type="text" v-model="blog.matchResult" />
      </p>
      <p>
        คะแนนที่ทำได้ (สกอร์):
        <input type="text" v-model="blog.score" />
      </p>
      <!-- ข้อมูลผู้เล่นที่ทำประตู -->
      <p>
        ผู้เล่นที่ทำประตู:
        <input type="text" v-model="blog.goalScorer" />
      </p>
      <p>
        เวลาที่ทำประตู (นาทีที่):
        <input type="number" v-model="blog.goalMinute" />
      </p>
      <!-- ข้อมูลผู้เล่น -->
      <p>
        ชื่อผู้เล่น:
        <input type="text" v-model="blog.playerName" />
      </p>
      <p>
        หมายเลขเสื้อ:
        <input type="number" v-model="blog.playerNumber" />
      </p>
      <p>
        <button type="submit">create blog</button>
      </p>
    </form>

    <!-- ตารางข้อมูลการแข่งขัน -->
    <div class="container">
      <h2>Liverpool Premier League 2023-2024</h2>

      <table id="matches-table">
        <thead>
          <tr>
            <th>Match Title</th>
            <th>Result</th>
            <th>Score</th>
            <th>Goalscorer</th>
            <th>Minute</th>
            <th>Player Name</th>
            <th>Jersey Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(match, index) in matches" :key="index">
            <td>{{ match.title }}</td>
            <td>{{ match.result }}</td>
            <td>{{ match.score }}</td>
            <td>{{ match.goalScorer }}</td>
            <td>{{ match.goalMinute }}</td>
            <td>{{ match.playerName }}</td>
            <td>{{ match.playerNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";
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
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      matches: [], // เก็บข้อมูลการแข่งขันที่เพิ่ม
      blog: {
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
    async createBlog() {
      this.blog.pictures = JSON.stringify(this.pictures);
      console.log("JSON.stringify: ", this.blog);
      try {
        // ส่งข้อมูลบล็อกไปยัง server (จำลอง)
        await BlogsService.post(this.blog);
        // เพิ่มข้อมูลการแข่งขันไปยัง matches array เพื่อแสดงในตาราง
        this.matches.push({
          title: this.blog.title,
          result: this.blog.matchResult,
          score: this.blog.score,
          goalScorer: this.blog.goalScorer,
          goalMinute: this.blog.goalMinute,
          playerName: this.blog.playerName,
          playerNumber: this.blog.playerNumber,
        });

        // ล้างข้อมูลในฟอร์ม
        this.blog.title = "";
        this.blog.matchResult = "";
        this.blog.score = "";
        this.blog.goalScorer = "";
        this.blog.goalMinute = 0;
        this.blog.playerName = "";
        this.blog.playerNumber = 0;

        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
    useThumbnail(filename) {
      console.log(filename);
      this.blog.thumbnail = filename;
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
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: khaki;
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
.thumbnail-pic img {
  width: 200px;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #cc0000;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
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

@media (max-width: 768px) {
  table {
    font-size: 14px;
  }
}
</style>

<template>
  <div>
    <h1>Edit lfc</h1>
    <form v-on:submit.prevent="editlfc">
      <p>title: <input type="text" v-model="lfc.title" /></p>
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
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
      </form>
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
      <p><strong>content:</strong></p>
      <vue-ckeditor
        v-model.lazy="lfc.content"
        :config="config"
        @blur="onBlur($event)"
        @focus="onFocus($event)"
      />
      <!-- ข้อมูลการแข่งขัน -->
      <p>
        ผลการแข่งขัน (ชนะ/เสมอ/แพ้):
        <input type="text" v-model="lfc.matchResult" />
      </p>
      <p>
        คะแนนที่ทำได้ (สกอร์):
        <input type="text" v-model="lfc.score" />
      </p>
      <!-- ข้อมูลผู้เล่นที่ทำประตู -->
      <p>
        ผู้เล่นที่ทำประตู:
        <input type="text" v-model="lfc.goalScorer" />
      </p>
      <p>
        เวลาที่ทำประตู (นาทีที่):
        <input type="number" v-model="lfc.goalMinute" />
      </p>
      <!-- ข้อมูลผู้เล่น -->
      <p>
        ชื่อผู้เล่น:
        <input type="text" v-model="lfc.playerName" />
      </p>
      <p>
        หมายเลขเสื้อ:
        <input type="number" v-model="lfc.playerNumber" />
      </p>
      <p>
        <button type="submit">update lfc</button>
        <button v-on:click="navigateTo('/lfc')">กลับ</button>
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
  components: { VueCkeditor },
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
        status: "",
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
    async editlfc() {
      try {
        await lfcService.put(this.lfc);
        this.$router.push({
          name: "lfc",
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
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      this.save(formData);
    },
    useThumbnail(filename) {
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
  async created() {
    this.currentStatus = STATUS_INITIAL;
    try {
      let lfcId = this.$route.params.lfcId;
      this.lfc = (await lfcService.show(lfcId)).data;
      this.pictures = JSON.parse(this.lfc.pictures);
      this.pictureIndex = this.pictures.length;
    } catch (error) {
      console.log(error);
    }
  },
  async mounted() {
    try {
      let lfcId = this.$route.params.lfcId;
      this.lfc = (await lfcService.show(lfcId)).data;
      this.pictures = JSON.parse(this.lfc.pictures);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: khaki; /* when mouse over to the drop zone, change color 
*/
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
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

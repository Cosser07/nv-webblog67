<template>
  <div class="form-container">
    <h1>Liverpool Premier League 2023-2024</h1>
    <p>
      <button class="btn btn-create" v-on:click="navigateTo('/lfc/create')">สร้างผลการแข่งขัน</button>
    </p>

    <table id="matches-table">
      <thead>
        <tr>
          <th>Logo</th>
          <th>Match</th>
          <th>Result</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in matchesData" :key="match.id">
          <td>
            <div class="thumbnail-pic" v-if="match.thumbnail !== 'null'">
              <img :src="BASE_URL + match.thumbnail" alt="thumbnail" />
            </div>
          </td>
          <td>{{ match.opponent_team }}</td>
          <td>{{ match.match_result }}</td>
          <td>{{ match.pictures }}</td>
          <td>
            <button class="btn btn-view" v-on:click="navigateTo('/lfc/' + match.id)">ดูรายละเอียด</button>
            <button class="btn btn-edit" v-on:click="navigateTo('/lfc/edit/' + match.id)">แก้ไข</button>
            <button class="btn btn-delete" v-on:click="deleteMatch(match)">ลบ</button>
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
      BASE_URL: "http://localhost:8081/uploads/",
      matchesData: []
    };
  },
  async created() {
    this.fetchMatches();
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteMatch(match) {
      const result = confirm("ต้องการลบข้อมูลนี้หรือไม่?");
      if (result) {
        try {
          await lfcService.delete(match);
          this.fetchMatches(); // Refresh data after deletion
        } catch (err) {
          console.error(err);
        }
      }
    },
    async fetchMatches() {
      try {
        const response = await lfcService.index();
        this.matchesData = response.data;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
/* Container Styling */
.form-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
}

/* Table Styling */
#matches-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

#matches-table th,
#matches-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

#matches-table th {
  background-color: #c8102e; /* Liverpool theme red */
  color: #fff;
  font-weight: bold;
}

#matches-table tr:nth-child(even) {
  background-color: #f5f5f5;
}

#matches-table tr:hover {
  background-color: #ddd;
}

/* Button Styling */
.btn {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

/* Button Types */
.btn-create {
  background-color: #c8102e; /* Liverpool theme red */
  color: #fff;
}

.btn-create:hover {
  background-color: #a50f25; /* Darker red */
}

.btn-view {
  background-color: #ffffff;
  color: #c8102e;
  border: 2px solid #c8102e;
}

.btn-view:hover {
  background-color: #c8102e;
  color: #fff;
}

.btn-edit {
  background-color: #ffc107;
  color: #212529;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #c8102e; /* Liverpool theme red */
  color: #fff;
}

.btn-delete:hover {
  background-color: #a50f25; /* Darker red */
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    width: 100%;
    padding: 20px;
  }

  #matches-table th,
  #matches-table td {
    font-size: 14px;
    padding: 8px;
  }

  .btn {
    font-size: 12px;
    padding: 8px 16px;
  }
}
</style>

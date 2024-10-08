<template>
  <div>
    <h1>Create Blog</h1>
    <!-- ส่วนข้อมูลผลการแข่งขัน -->
    <section id="matches">
      <h2>ผลการแข่งขันของ Liverpool (2023-2024 พรีเมียร์ลีก)</h2>
      <table>
        <thead>
          <tr>
            <th>วันที่</th>
            <th>คู่แข่ง</th>
            <th>ผลการแข่งขัน</th>
            <th>สกอร์</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in matches" :key="match.id">
            <td>{{ match.date }}</td>
            <td>{{ match.opponent }}</td>
            <td>{{ match.result }}</td>
            <td>{{ match.score }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ส่วนผู้เล่นที่ทำประตูได้ -->
    <section id="goalScorers">
      <h2>ผู้เล่นที่ทำประตู</h2>
      <table>
        <thead>
          <tr>
            <th>ชื่อผู้เล่น</th>
            <th>หมายเลขเสื้อ</th>
            <th>นาทีที่ทำประตู</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="scorer in goalScorers" :key="scorer.id">
            <td>{{ scorer.name }}</td>
            <td>{{ scorer.number }}</td>
            <td>{{ scorer.time }} นาที</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ส่วนข้อมูลผู้เล่น -->
    <section id="players">
      <h2>ข้อมูลผู้เล่นทั้งหมด</h2>
      <table>
        <thead>
          <tr>
            <th>ชื่อผู้เล่น</th>
            <th>หมายเลขเสื้อ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players" :key="player.id">
            <td>{{ player.name }}</td>
            <td>{{ player.number }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ข้อมูลตัวอย่างผลการแข่งขัน
      matches: [
        { id: 1, date: '2023-10-01', opponent: 'Manchester City', result: 'ชนะ', score: '3-1' },
        { id: 2, date: '2023-09-15', opponent: 'Chelsea', result: 'เสมอ', score: '2-2' },
        { id: 3, date: '2023-08-28', opponent: 'Arsenal', result: 'แพ้', score: '1-2' },
      ],
      // ข้อมูลตัวอย่างผู้เล่นที่ทำประตู
      goalScorers: [
        { id: 1, name: 'Mohamed Salah', number: 11, time: 45 },
        { id: 2, name: 'Darwin Núñez', number: 9, time: 78 },
        { id: 3, name: 'Diogo Jota', number: 20, time: 32 },
      ],
      // ข้อมูลตัวอย่างผู้เล่นทั้งหมด
      players: [
        { id: 1, name: 'Mohamed Salah', number: 11 },
        { id: 2, name: 'Darwin Núñez', number: 9 },
        { id: 3, name: 'Diogo Jota', number: 20 },
        { id: 4, name: 'Virgil van Dijk', number: 4 },
        { id: 5, name: 'Alisson Becker', number: 1 },
      ],
    };
  },
};
</script>

<style scoped>
/* สไตล์สำหรับตาราง */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

table, th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}

th {
  background-color: #c8102e;
  color: #fff;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

h2 {
  color: #c8102e;
}
</style>
ผ
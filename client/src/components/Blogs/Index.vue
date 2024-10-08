<template>
    <div class="container">
        <h1>Liverpool Premier League 2023-2024</h1>

        <table id="matches-table">
            <thead>
                <tr>
                    <th>Match</th>
                    <th>Result</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(match, index) in matchesData" :key="index">
                    <td>{{ match.match }}</td>
                    <td>{{ match.result }}</td>
                    <td>
                        <button @click="viewDetails(index)">ดูรายละเอียด</button>
                        <button @click="editMatch(index)">แก้ไข</button>
                        <button @click="deleteMatch(index)">ลบ</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- แสดงรายละเอียด -->
        <div v-if="selectedMatch !== null" class="details">
            <h2>รายละเอียดการแข่งขัน</h2>
            <p><strong>Match:</strong> {{ selectedMatch.match }}</p>
            <p><strong>Result:</strong> {{ selectedMatch.result }}</p>
            <p><strong>Score:</strong> {{ selectedMatch.score }}</p>
            <p><strong>Goalscorer:</strong> {{ selectedMatch.goalscorer }}</p>
            <p><strong>Minute:</strong> {{ selectedMatch.minute }}</p>
            <p><strong>Player Name:</strong> {{ selectedMatch.playerName }}</p>
            <p><strong>Jersey Number:</strong> {{ selectedMatch.jerseyNumber }}</p>
            <button @click="closeDetails">ปิดรายละเอียด</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            matchesData: [
                {
                    match: 'Liverpool vs Man City',
                    result: 'Win',
                    score: '3-2',
                    goalscorer: 'Mohamed Salah',
                    minute: '29',
                    playerName: 'Mohamed Salah',
                    jerseyNumber: 11
                },
                {
                    match: 'Liverpool vs Chelsea',
                    result: 'Draw',
                    score: '1-1',
                    goalscorer: 'Sadio Mane',
                    minute: '45',
                    playerName: 'Sadio Mane',
                    jerseyNumber: 10
                },
                {
                    match: 'Liverpool vs Arsenal',
                    result: 'Win',
                    score: '2-1',
                    goalscorer: 'Roberto Firmino',
                    minute: '70',
                    playerName: 'Roberto Firmino',
                    jerseyNumber: 9
                }
            ],
            selectedMatch: null,
            editedMatch: null
        }
    },
    methods: {
        viewDetails(index) {
            this.selectedMatch = this.matchesData[index];
        },
        closeDetails() {
            this.selectedMatch = null;
        },
        editMatch(index) {
            let newResult = prompt("แก้ไขผลการแข่งขัน:", this.matchesData[index].result);
            if (newResult) {
                this.matchesData[index].result = newResult;
            }
        },
        deleteMatch(index) {
            let confirmed = confirm("คุณต้องการลบข้อมูลนี้หรือไม่?");
            if (confirmed) {
                this.matchesData.splice(index, 1);
            }
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #cc0000;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

table, th, td {
    border: 1px solid #ddd;
}

th, td {
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

button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #cc0000;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #b30000;
}

.details {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.details h2 {
    color: #cc0000;
}
</style>

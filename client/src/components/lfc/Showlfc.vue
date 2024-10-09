<template>
    <div class="container">
        <h1>Liverpool Premier League 2023-2024</h1>

        <table id="matches-table">
            <thead>
                <tr>
                    <th>Match</th>
                    <th>Result</th>
                    <th>Score</th>
                    <th>Goalscorer</th>
                    <th>Minute</th>
                    <th>Player Name</th>
                    <th>Jersey Number</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="match in matchesData" :key="match.match">
                    <td>{{ match.match }}</td>
                    <td>{{ match.result }}</td>
                    <td>{{ match.score }}</td>
                    <td>{{ match.goalscorer }}</td>
                    <td>{{ match.minute }}</td>
                    <td>{{ match.playerName }}</td>
                    <td>{{ match.jerseyNumber }}</td>
                </tr>
            </tbody>
        </table>
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
            ]
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

@media (max-width: 768px) {
    table {
        font-size: 14px;
    }
}
</style>

module.exports = (sequelize, DataTypes) => {
    const lfc = sequelize.define('lfc', {
        // เพิ่มฟิลด์ที่เกี่ยวข้องกับข้อมูลการแข่งขัน
        matchResult: DataTypes.STRING,  // ผลการแข่งขัน (ชนะ, เสมอ, แพ้)
        score: DataTypes.STRING,        // คะแนนที่ทำได้ (สกอร์)

        // ข้อมูลผู้เล่นที่ทำประตู
        goalScorer: DataTypes.STRING,   // ชื่อผู้เล่นที่ทำประตู
        goalMinute: DataTypes.INTEGER,  // นาทีที่ทำประตู

        // ข้อมูลผู้เล่น
        playerName: DataTypes.STRING,   // ชื่อผู้เล่น
        playerNumber: DataTypes.INTEGER // หมายเลขเสื้อของผู้เล่น
    });

    return lfc;
}

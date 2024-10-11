module.exports = (sequelize, DataTypes) => {
    const lfc = sequelize.define('lfc', {
        // เพิ่มฟิลด์ที่เกี่ยวข้องกับข้อมูลการแข่งขัน
        match_result: DataTypes.STRING,  // ผลการแข่งขัน (ชนะ, เสมอ, แพ้)
        opponent_team: DataTypes.STRING,  // 
        opponent_logo: DataTypes.STRING,  // 
        score: DataTypes.STRING,        // คะแนนที่ทำได้ (สกอร์)

        // ข้อมูลผู้เล่นที่ทำประตู
        goal_minute: DataTypes.INTEGER,  // นาทีที่ทำประตู

        // ข้อมูลผู้เล่น
        player_name: DataTypes.STRING,   // ชื่อผู้เล่น
        jersey_number: DataTypes.INTEGER // หมายเลขเสื้อของผู้เล่น
    });

    return lfc;
}

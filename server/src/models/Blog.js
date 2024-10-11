module.exports = (sequelize, DataTypes) => {
    const lfc = sequelize.define('lfc', {
        match_result: DataTypes.STRING,
        opponent_team: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING, 
        score: DataTypes.STRING,
        goal_minute: DataTypes.INTEGER,
        player_name: DataTypes.STRING,
        jersey_number: DataTypes.INTEGER
    });

    return lfc;
};

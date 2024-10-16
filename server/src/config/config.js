module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'liverdb',
        user: process.env.DB_User || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            storage: './liverdb.sqlite' // เปลี่ยนชื่อไฟล์ให้ตรงกับชื่อฐานข้อมูลใหม่
        },
    },
    authentication:{
        jwtSecret: "test"
    }
}

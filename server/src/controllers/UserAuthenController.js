const {User} = require('../models');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7; // หนึ่งสัปดาห์
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    });
}

module.exports = {
    // ลงทะเบียนผู้ใช้ใหม่
    async register(req, res) {
        try {
            const user = await User.create(req.body); // สร้างผู้ใช้ใหม่
            res.send(user.toJSON()); // ส่งข้อมูลผู้ใช้กลับไป
        } catch (err) {
            res.status(400).send({
                error: 'ข้อมูลที่ให้มาไม่ถูกต้อง' // ข้อความแสดงข้อผิดพลาด
            });
        }
    },
    
    // เข้าสู่ระบบ
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({
                where: {
                    email: email // ค้นหาผู้ใช้ตามอีเมล
                }
            });
            if (!user) {
                return res.status(403).send({
                    error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' // กรณีไม่พบผู้ใช้
                });
            }
            const isPasswordValid = await user.comparePassword(password); // ตรวจสอบรหัสผ่าน
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' // กรณีรหัสผ่านไม่ถูกต้อง
                });
            }
            const userJson = user.toJSON(); // แปลงข้อมูลผู้ใช้เป็น JSON
            res.send({
                user: userJson, // ส่งข้อมูลผู้ใช้กลับไป
                token: jwtSignUser(userJson) // ส่ง token กลับไป
            });
        } catch (err) {
            res.status(500).send({
                error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' // ข้อความแสดงข้อผิดพลาด
            });
        }
    }
};

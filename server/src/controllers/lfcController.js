const { lfc: LfcModel } = require('../models'); // เปลี่ยนชื่อโมเดลเป็น LfcModel เพื่อไม่ให้ซ้ำกับตัวแปร

module.exports = {
    // ดึงข้อมูล lfc ทั้งหมด
    async index(req, res) {
        try {
            const lfcs = await LfcModel.findAll();
            res.send(lfcs);
        } catch (err) {
            res.status(500).send({
                error: 'ข้อมูล lfc ไม่ถูกต้อง'
            });
        }
    },

    // สร้าง lfc
    async create(req, res) {
        try {
            console.log('สร้าง lfc req.body:', req.body);
            const newLfc = await LfcModel.create(req.body);
            console.log('สร้าง lfc:', newLfc);
            res.send(newLfc.toJSON());
        } catch (err) {
            console.log('เกิดข้อผิดพลาดในการสร้าง lfc:', err);
            res.status(500).send({
                error: 'การสร้าง lfc ไม่ถูกต้อง'
            });
        }
    },

    // แก้ไข lfc
    async put(req, res) {
        try {
            await LfcModel.update(req.body, {
                where: {
                    id: req.params.lfcId
                }
            });
            res.send(req.body);
        } catch (err) {
            res.status(500).send({
                error: 'การอัปเดต lfc ไม่ถูกต้อง'
            });
        }
    },

    // ลบ lfc
    async remove(req, res) {
        try {
            const lfcItem = await LfcModel.findOne({
                where: {
                    id: req.params.lfcId
                }
            });
            if (!lfcItem) {
                return res.status(403).send({
                    error: 'ข้อมูล lfc ไม่ถูกต้อง'
                });
            }
            await lfcItem.destroy();
            res.send(lfcItem);
        } catch (err) {
            res.status(500).send({
                error: 'ข้อมูล lfc ไม่ถูกต้อง'
            });
        }
    },

    // ดึงข้อมูล lfc ตาม id
    async show(req, res) {
        try {
            const lfcItem = await LfcModel.findByPk(req.params.lfcId);
            res.send(lfcItem);
        } catch (err) {
            res.status(500).send({
                error: 'ข้อมูล lfc ไม่ถูกต้อง'
            });
        }
    }
};

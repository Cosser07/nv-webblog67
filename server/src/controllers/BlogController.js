const { Blog } = require('../models');

module.exports = {
    // ดึงข้อมูล blog ทั้งหมด
    async index(req, res) {
        try {
            const blogs = await Blog.findAll();
            res.send(blogs);
        } catch (err) {
            res.status(500).send({
                error: 'ข้อมูล blog ไม่ถูกต้อง'
            });
        }
    },

    // สร้าง blog
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            console.log('สร้าง Blog req.body:', req.body);
            const blog = await Blog.create(req.body);
            console.log('สร้าง Blog:', blog);
            res.send(blog.toJSON());
        } catch (err) {
            console.log('เกิดข้อผิดพลาดในการสร้าง Blog:', err);
            res.status(500).send({
                error: 'การสร้าง blog ไม่ถูกต้อง'
            });
        }
    },

    // แก้ไข blog, ระงับการใช้งาน, เปิดใช้งาน
    async put(req, res) {
        try {
            await Blog.update(req.body, {
                where: {
                    id: req.params.blogId
                }
            });
            res.send(req.body);
        } catch (err) {
            res.status(500).send({
                error: 'การอัปเดต blog ไม่ถูกต้อง'
            });
        }
    },

    // ลบ blog
    async remove(req, res) {
        try {
            const blog = await Blog.findOne({
                where: {
                    id: req.params.blogId
                }
            });
            if (!blog) {
                return res.status(403).send({
                    error: 'ข้อมูล blog ไม่ถูกต้อง'
                });
            }
            await blog.destroy();
            res.send(blog);
        } catch (err) {
            res.status(500).send({
                error: 'ข้อมูล blog ไม่ถูกต้อง'
            });
        }
    },

    // ดึงข้อมูล blog ตาม id
    async show(req, res) {
        try {
            const blog = await Blog.findByPk(req.params.blogId);
            res.send(blog);
        } catch (err) {
            req.status(500).send({
                error: 'ข้อมูล blog ไม่ถูกต้อง'
            });
        }
    }
};

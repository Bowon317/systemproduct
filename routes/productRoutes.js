const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

console.log("🟢 Loaded productRoutes.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

router.get('/products', productController.getAllProducts);
router.get('/add-product', (req, res) => res.render('admin/add-product'));
router.get('/edit-product/:id', productController.getEditProduct); // แสดงฟอร์มแก้ไขสินค้า

router.post('/edit-product', upload.single('image'), productController.postEditProduct); // บันทึกการแก้ไขสินค้า
router.post('/add-product', upload.single('image'), productController.addProduct)
router.post('/delete-product/:id', productController.deleteProduct); // ลบสินค้า

module.exports = router;
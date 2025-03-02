const Product = require('../models/Product');
const db = require("../config/db");
    
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.render('admin/products', { products });
    } catch (err) {
        res.status(500).send('Error fetching products');
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { productCode, productName, price, quantity } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        await Product.create(productCode, productName, price, quantity, imageUrl);
        res.redirect('/admin/products');
    } catch (err) {
        res.status(500).send('Error adding product');
    }
};

// ดึงข้อมูลสินค้าสำหรับแก้ไข
exports.getEditProduct = async (req, res) => {
    try {
        console.log("🟢 Fetching product with ID:", req.params.id);
        
        const productId = req.params.id;
        const product = await Product.getById(productId);
        
        if (!product) {
            console.log("🔴 Product not found!");
            return res.status(404).send("Product not found");
        }

        console.log("🟢 Product data:", product);
        res.render("admin/edit-product", { product });

    } catch (err) {
        console.error("🔴 Error fetching product:", err);
        res.status(500).send("Error fetching product");
    }
};


// บันทึกการแก้ไขสินค้า
exports.postEditProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        const productCode = req.body.product_code;
        const productName = req.body.product_name;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const imageUrl = req.file 
            ? `/uploads/${req.file.filename}`
            : req.body.current_image_url;

        // เปลี่ยนจาก updateById เป็น update ให้ตรงกับที่มีใน Product model
        await Product.update(productId, productCode, productName, price, quantity, imageUrl);
        
        console.log("✅ อัพเดทสินค้าสำเร็จ");
        res.redirect('/admin/products');
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("เกิดข้อผิดพลาดในการอัพเดทสินค้า");
    }
};





// ลบสินค้า
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.delete(productId);
        res.redirect("/admin/products");
    } catch (err) {
        res.status(500).send("Error deleting product");
    }
};


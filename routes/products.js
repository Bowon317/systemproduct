router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const sql = `SELECT * FROM products 
                     WHERE product_name LIKE ? 
                     OR description LIKE ?`;
        const params = [`%${searchTerm}%`, `%${searchTerm}%`];
        
        const [results] = await pool.query(sql, params);
        res.render('products', { products: results });
    } catch (error) {
        console.error(error);
        res.status(500).send('เกิดข้อผิดพลาดในการค้นหาสินค้า');
    }
});

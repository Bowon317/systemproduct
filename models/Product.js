const db = require('../config/db');

class Product {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM tblproduct');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM tblproduct WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(productCode, productName, price, quantity, imageUrl) {
        const [result] = await db.execute(
            'INSERT INTO tblproduct (product_code, product_name, price, quantity, image_url) VALUES (?, ?, ?, ?, ?)',
            [productCode, productName, price, quantity, imageUrl]
        );
        return result.insertId;
    }

    static async update(id, productCode, productName, price, quantity, imageUrl) {
        const query = 'UPDATE tblproduct SET product_code = ?, product_name = ?, price = ?, quantity = ?, image_url = ? WHERE id = ?';
        const params = [productCode, productName, price, quantity, imageUrl, id];
        await db.execute(query, params);
    }

    static async delete(id) {
        await db.execute('DELETE FROM tblproduct WHERE id = ?', [id]);
    }

    static async search(searchTerm) {
        const [rows] = await db.execute(
            'SELECT * FROM tblproduct WHERE product_name LIKE ? OR product_code LIKE ?',
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }
    
}



module.exports = Product;
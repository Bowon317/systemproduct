const db = require('../config/db');

class Admin {
    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM tbladmin WHERE username = ?', [username]);
        return rows[0];
    }

    static async create(username, password, adminName, phone, email) {
        const [result] = await db.execute(
            'INSERT INTO tbladmin (username, password, admin_name, phone, email) VALUES (?, ?, ?, ?, ?)',
            [username, password, adminName, phone, email]
        );
        return result.insertId;
    }
}

module.exports = Admin;
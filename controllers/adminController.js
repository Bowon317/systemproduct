const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.register = async (req, res) => {
    try {
        const { username, password, adminName, phone, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create(username, hashedPassword, adminName, phone, email);
        res.redirect('/admin/login');
    } catch (err) {
        res.status(500).send('Error registering admin');
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findByUsername(username);
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin/dashboard');
    } catch (err) {
        res.status(500).send('Error logging in');
    }
};
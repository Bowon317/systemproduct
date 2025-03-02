const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/register', (req, res) => res.render('admin/register'));
router.post('/register', adminController.register);

router.get('/login', (req, res) => res.render('admin/login'));
router.post('/login', adminController.login);

router.get('/dashboard', (req, res) => res.render('admin/dashboard'));
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/login');
});
module.exports = router;
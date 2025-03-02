const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // รองรับ form data
app.use(express.json()); // รองรับ JSON
// Routes
app.use('/admin', adminRoutes);
app.use('/admin', productRoutes);

app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    const products = await Product.search(searchTerm);
    res.render('admin/products', { products });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
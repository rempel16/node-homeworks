require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const Category = require('./models/Category');
const Product = require('./models/Product');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// POST /categories  { "name": "Electronics" }
app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid name' });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /products  { "name": "Phone", "price": 999, "category": "<categoryId>" }
app.post('/products', async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid name' });
    }
    if (typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid price' });
    }
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const exists = await Category.findById(category);
    if (!exists) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /products (with populate)
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB connect error:', err.message);
    process.exit(1);
  }
}

start();

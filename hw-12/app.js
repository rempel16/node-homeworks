require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const { connectDB, getDB } = require('./db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// CREATE
app.post('/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid name' });
    }
    if (typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid price' });
    }

    const db = getDB();
    const result = await db.collection('products').insertOne({
      name,
      price,
      description: description || '',
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
app.get('/products', async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const db = getDB();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const { name, price, description } = req.body;
    const update = {};

    if (name !== undefined) update.name = name;
    if (price !== undefined) update.price = price;
    if (description !== undefined) update.description = description;

    const db = getDB();
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({ updated: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const db = getDB();
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// START ONLY AFTER DB CONNECT
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI, process.env.DB_NAME);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start app:', err.message);
    process.exit(1);
  }
})();

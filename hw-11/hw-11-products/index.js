import express from 'express';

const app = express();
app.use(express.json());

let products = [
  { id: 1, name: 'Product One', price: 29.99 },
  { id: 2, name: 'Product Two', price: 49.99 },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body ?? {};

  if (!name || price === undefined) {
    return res.status(400).json({ message: 'name and price are required' });
  }

  const newProduct = {
    id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    price: Number(price),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

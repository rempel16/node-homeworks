import express from "express";
import { db } from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// GET /
app.get("/", (req, res) => {
  try {
    res.send("Hello, World!");
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /
app.post("/", (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No data was sent" });
    }

    res.status(200).json({ message: "Data received", data });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "DB error", details: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "name and price are required" });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ error: "price must be a positive number" });
    }

    const [result] = await db.query(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [name, numericPrice],
    );

    res.status(201).json({
      message: "Product created",
      id: result.insertId,
      name,
      price: numericPrice,
    });
  } catch (err) {
    res.status(500).json({ error: "DB error", details: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running: http://localhost:${PORT}`);
});

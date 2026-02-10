import express from "express";
import { sequelize } from "./config/db.js";
import { Book } from "./models/book.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("Server is running. DB connected ✅");
  } catch (err) {
    res
      .status(500)
      .json({ error: "DB connection failed", details: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch books", details: err.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || year === undefined) {
      return res
        .status(400)
        .json({ error: "title, author, year are required" });
    }

    const yearNum = Number(year);
    if (!Number.isInteger(yearNum) || yearNum <= 0) {
      return res.status(400).json({ error: "year must be a positive integer" });
    }

    const created = await Book.create({ title, author, year: yearNum });
    res.status(201).json(created);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create book", details: err.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { title, author, year } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (author !== undefined) updates.author = author;
    if (year !== undefined) {
      const yearNum = Number(year);
      if (!Number.isInteger(yearNum) || yearNum <= 0) {
        return res
          .status(400)
          .json({ error: "year must be a positive integer" });
      }
      updates.year = yearNum;
    }

    const [count] = await Book.update(updates, { where: { id } });

    if (count === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updated = await Book.findByPk(id);
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update book", details: err.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const count = await Book.destroy({ where: { id } });

    if (count === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted", id });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete book", details: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
});

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require('./db');

router.get('/books', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM books');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  });
  

  router.post('/books', async (req, res) => {
    const { title, author, category } = req.body;
    try {
      await pool.query(
        'INSERT INTO books (title, author, category) VALUES ($1, $2, $3)',
        [title, author, category]
      );
      res.status(201).json({ message: 'Book added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add book' });
    }
  });
  

  router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, category } = req.body;
    try {
      await pool.query(
        'UPDATE books SET title = $1, author = $2, category = $3 WHERE id = $4',
        [title, author, category, id]
      );
      res.json({ message: 'Book updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update book' });
    }
  });
  

  router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM books WHERE id = $1', [id]);
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  });

  module.exports = router;
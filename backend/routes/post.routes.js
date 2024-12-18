const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // Initialisation du client Prisma

// Récupérer tous les livres
router.get('/books', async (req, res) => {
  try {
    const books = await prisma.books.findMany(); // Méthode findMany pour récupérer tous les livres
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Ajouter un nouveau livre
router.post('/books', async (req, res) => {
  const { title, author, category } = req.body;
  try {
    const newBook = await prisma.books.create({
      data: { title, author, category },
    });
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Mettre à jour un livre
router.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, category } = req.body;
  try {
    const updatedBook = await prisma.books.update({
      where: { id: parseInt(id) },
      data: { title, author, category },
    });
    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Supprimer un livre
router.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.books.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;

const Book = require("../models/Book")

// Get all books with optional filtering


 exports.getBooks =  async (req, res)=> {
  try{
    let query=req.query;
    let page=Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 1000;

    let skip=(page-1) *limit;

    let books=await Book.find().limit(limit).skip(skip)

    res.status(200).json({books:books, query: query})
  }catch(e){
    res.status(404).json({message: e.message})
  }
}

// Get a specific book by ID

exports.getBookById = async (req, res)=> {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
}

// Create a new book (Admin Only)
exports.createBook =  async function (req, res) {
  try {
    const { title, author, genre, price, stock } = req.body;

    const newBook = new Book({ title, author, genre, price, stock });
    await newBook.save();

    res.json({ message: 'Book created successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
}

// Update an existing book (Admin Only)
exports.updateBook =  async function (req, res) {
  try {
    const { title, author, genre, price, stock } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.price = price;
    book.stock = stock;

    await book.save();

    res.json({ message: 'Book updated successfully', book });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
}

// Delete a book (Admin Only)


exports.deleteBook =  async function (req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.remove();

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
}

// module.exports = {getBooks,getBookById,createBook,updateBook,deleteBook}
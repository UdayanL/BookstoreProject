const Book = require("../models/book.js");
const axios = require('axios');
const logger = require('../routes/logger')
const Sentry = require('../middleware/sentry.js')



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
  } catch (error) {
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
    book.count = count;


    await book.save();

    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    Sentry.captureException(error);
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
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};



// module.exports = {getBooks,getBookById,createBook,updateBook,deleteBook}



// ... Other functions ...

// Buy a book
/* exports.buyBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Check if the book exists in the database
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if there is enough stock to buy the book
    if (book.stock === 0) {
      return res.status(400).json({ error: 'Book is out of stock' });
    }

    // Call the external API for payment (Assuming you have an external payment service)
    const paymentResponse = await makePayment(book.price);

    // On successful payment, reduce the stock count and save the book
    book.stock -= 1;
    await book.save();

    // Return the payment number to the user
    res.status(200).json({ paymentNumber: paymentResponse.paymentNumber });
  } catch (error) {
    console.error('Error while buying book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mock external payment API call
const makePayment = async (amount) => {
  // This is a placeholder function to mock the external payment API call.
  // In a real-world scenario, you would integrate with a payment service provider.
  return { paymentNumber: 'PAY-123456' };
};
*/


// controllers/bookController.js

/*const axios = require('axios');

// ... Other functions ...

// Function to buy a book
exports.buyBook = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user._id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.stock <= 0) {
      return res.status(400).json({ error: 'Book is out of stock' });
    }

    // External payment API call using Axios
    const paymentResponse = await axios.post('https://example-payment-api.com/pay', {
      bookId,
      userId,
      cardDetails: req.body.cardDetails, // Make sure to validate card details before using them
    });

    const transactionId = paymentResponse.data.transactionId;
    const paymentNumber = paymentResponse.data.paymentNumber;

    // Update book stock and count
    book.stock -= 1;
    book.count += 1;
    await book.save();

    return res.json({
      message: 'Payment successful',
      transactionId,
      paymentNumber,
      bookId,
      numOfBooksBought: 1,
    });
  } catch (error) {
    console.error('Error buying book:', error);
    return res.status(500).json({ error: 'An error occurred while processing the payment' });
  }
}; */

/*const buyBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { cardDetails, quantity } = req.body;

    // Check if the book exists in the database
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if there are enough books in stock
    if (book.stock < quantity) {
      return res.status(400).json({ error: 'Not enough books in stock' });
    }

    // Calculate the total price
    const totalPrice = book.price * quantity;

    // Call the external payment API using Axios
    const paymentResponse = await axios.post('https://example-payment-api.com/pay', {
      cardDetails,
      quantity,
    });

    // Assuming the payment API returns a transaction ID
    const transactionId = paymentResponse.data.transactionId;

    // Update the book inventory after successful payment
    book.stock -= quantity;
    await book.save();

    // Return the successful transaction details in the response
    return res.json({
      paymentNumber: paymentResponse.data.paymentNumber,
      bookId: book._id,
      transactionId,
      quantity,
    });
  } catch (error) {
    console.error('Error buying the book:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  // ... Other controller functions ...
  buyBook,
}; */
 
exports.buyBook = async (req, res) => {
  try { 
    //logger.info(`User ${req.body.email} is attempting to buy book ${req.params.id}.`)

    const id = req.params.id;

    // Check if the book exists in the database
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if there are enough books in stock
    if (book.stock <= 0) {
      return res.status(400).json({ error: 'Book out of stock' });
    }
    // Call the external payment API using axios
    const paymentResponse = await axios.post('https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process',req.body)


    // Assuming the payment API returns a successful response with transactionId
    const transactionId  = paymentResponse.data.payment_id;

    // Reduce the book inventory after successful payment
    book.stock--;
    await book.save();

    // Return the successful transaction details in the response
    return res.json({
      bookId: book._id,
      transactionId,
      success: true
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error buying the book:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


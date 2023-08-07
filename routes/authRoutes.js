const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

 router.get('/homepage', (req,res)=> {
    res.sendFile('/Users/udayan.larje/Desktop/BookStoreProject/public/index.html')
 })

module.exports = router;


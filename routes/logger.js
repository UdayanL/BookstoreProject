const winston = require('winston');

 

 

const logger = winston.createLogger({

  transports: [

    new winston.transports.File({ filename: 'logs/buy-book.log'}),

    new winston.transports.Console({ level: 'debug' })

  ],

  format: winston.format.combine(

    winston.format.timestamp(),

    winston.format.json()

  ),

});

 

module.exports = logger;


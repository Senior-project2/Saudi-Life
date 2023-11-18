const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saudilife2',
    database: 'saudi_life'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Successfully connected to the database.');
});

// You don't need the insertion code here, it's usually placed where you handle user input.

// Export the connection object
module.exports = connection;

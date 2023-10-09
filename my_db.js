const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',     // The hostname of the database you are connecting to.
    user: 'root',     // The MySQL user to authenticate as.
    password: 'Saudilife2', // The password of that MySQL user.
    database: 'saudi_life'      // Name of the database to use for this connection.
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Successfully connected to the database.');
});

module.exports = connection;


// Insert dummy values into the 'locals' table
const sql = `
    INSERT INTO locals (local_id, first_name, last_name, email, phone, date_of_birth, gender)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;
const values = [2, 'John', 'Doe', 'john.doe@example.com', '+1234567890', '1990-01-01', 'Male'];

connection.query(sql, values, (error, results, fields) => {
    if (error) throw error;

    console.log('Row inserted with ID:', results.insertId);

    connection.end();
});




connection.connect();

// Change 'your_table_name' to the name of your table
connection.query('SELECT * FROM locals', (error, results, fields) => {
    if (error) throw error;

    // Display the rows
    console.log(results);

    connection.end();
});
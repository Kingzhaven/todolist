const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
// Create DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

// Error when connection fails
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Check Username in DB
app.post('/check-username', (req, res) => {
    const { username } = req.body;

    const checkUserQuery = 'SELECT * FROM Login WHERE username = ?';
    db.query(checkUserQuery, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database query error' });
        }

        if (result.length > 0) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    });
});

// Add user into DB from signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    const checkUserQuery = 'SELECT * FROM Login WHERE username = ?';
    db.query(checkUserQuery, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (result.length > 0) {
            return res.status(400).json({ success: false, message: 'Username already taken' });
        }

        const insertUserQuery = 'INSERT INTO Login (username, password) VALUES (?, ?)';
        db.query(insertUserQuery, [username, password], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting user into database' });
            }

            res.json({ success: true, message: 'User registered successfully' });
        });
    });
});


// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM Login WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (result.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Todo Table
app.get('/create-todos-table', (req, res) => {
    const sql = `CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL
    )`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Todos table created');
    });
});

// Sort Todos
app.get('/todos', (req, res) => {
    const { category } = req.query; 

    let sql = 'SELECT * FROM todos';
    let queryParams = [];

    if (category) {
        sql += ' WHERE category = ?';
        queryParams.push(category);
    }

    db.query(sql, queryParams, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add Todo
app.post('/todos', (req, res) => {
    const { task, category } = req.body;
    const sql = 'INSERT INTO todos (task, category) VALUES (?, ?)';
    db.query(sql, [task, category], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query error' });
        res.json({ id: result.insertId, task, category });
    });
});

// Delete Todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM todos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Todo deleted successfully' });
    });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

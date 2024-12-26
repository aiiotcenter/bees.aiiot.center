const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: 'http://bees.aiiot.center:5173', // Replace with the allowed origin
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};


app.use(cors());
app.use(express.json());

// Secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// In-memory user store (simulating a database for this example)
let users = [
  {
    username: 'john_doe',
    password: '$2a$10$Pn.B.zwhmuXZ2g7R.wlfuZpPY5FwPIezSlDhM6FuFFtiLO0I.pWpy' // 'password123' hashed
  }
];

// Middleware to protect routes that require authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Route to register a new user (For simplicity, we'll skip database and add static users)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the new user to the user array
  users.push({ username, password: hashedPassword });

  return res.status(201).json({ message: 'User registered successfully' });
});

// Route to log in and get a JWT token
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare the entered password with the stored hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Save the token to a file
  const tokenData = { username: user.username, token };
  fs.writeFile(`./tokens/${user.username}_token.json`, JSON.stringify(tokenData), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving token to file' });
    }
    res.json({ message: 'Login successful', token });
  });
});

// Protected route to fetch data from the database
app.get('/api/data', authenticateJWT, (req, res) => {
  const query = 'SELECT * FROM sensor_data';  // Make sure this query is correct

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database query error', error: err.message });
    }
    console.log('Fetched data:', results);
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

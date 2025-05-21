const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { name: "DevOps Engineer", role: "Node.js Developer" });
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1><p>This is a portfolio site deployed using CI/CD on AWS.</p>');
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

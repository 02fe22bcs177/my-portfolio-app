const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const portfolio = require('./models/portfolio');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  const data = portfolio.getAll();
  res.render('index', { portfolios: data });
});

app.get('/portfolios/new', (req, res) => {
  res.render('new');
});

app.post('/portfolios', upload.single('photo'), (req, res) => {
  const { name, role } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;
  portfolio.create({ name, role, photo });
  res.redirect('/');
});

app.get('/portfolios/:id', (req, res) => {
  const p = portfolio.getById(req.params.id);
  if (p) {
    res.render('show', { portfolio: p });
  } else {
    res.status(404).send('Not found');
  }
});

app.get('/portfolios/:id/edit', (req, res) => {
  const p = portfolio.getById(req.params.id);
  if (p) {
    res.render('edit', { portfolio: p });
  } else {
    res.status(404).send('Not found');
  }
});

app.put('/portfolios/:id', upload.single('photo'), (req, res) => {
  const { name, role } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : undefined;
  portfolio.update(req.params.id, { name, role, photo });
  res.redirect('/');
});

app.delete('/portfolios/:id', (req, res) => {
  portfolio.remove(req.params.id);
  res.redirect('/');
});

app.listen(3000, '0.0.0.0', () => console.log("Server running"));

});

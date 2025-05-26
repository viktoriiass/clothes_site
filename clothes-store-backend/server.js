const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const itemsRouter = require('./routes/items');


const app = express();
const basketRouter = require('./routes/basket');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Статичні файли для зображень
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API маршрути
app.use('/api/items', itemsRouter);
app.use('/api/basket', basketRouter);

app.listen(3000, () => {
  console.log('✅ Backend running on http://localhost:3000');
});


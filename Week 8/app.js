const express = require('express');
const logger = require('morgan');
const app = express();


const itemRoutes = require('./routes/items');
const basketRoutes = require('./routes/basket');

app.use(logger('dev'));
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/basket', basketRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;

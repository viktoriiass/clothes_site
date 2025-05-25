const express = require('express');
const router = express.Router();

const {
  getBasket,
  addToBasket,
  deleteFromBasket
} = require('../controllers/basketController');

// GET all items in basket
router.get('/', getBasket);

// POST to add item to basket
router.post('/', addToBasket);

// DELETE specific item (by id and optional size)
router.delete('/:id', deleteFromBasket);

module.exports = router;

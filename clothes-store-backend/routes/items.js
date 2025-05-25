const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

const {
  getAllItems,
  addItem,
  deleteItem
} = require('../controllers/itemsController');
router.delete('/:id', deleteItem);

// GET items
router.get('/', getAllItems);

// POST with image
router.post('/', upload.single('image'), (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  req.body.image = imageUrl;
  addItem(req, res);
});

module.exports = router;

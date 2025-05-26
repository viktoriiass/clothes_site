const store = require('../data/store');

function getAllItems(req, res) {
  res.json(store.inventory);
}

function getItemById(req, res) {
  const item = store.inventory.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
}


//ID generator
const generateId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}-${random}`;
};

function addItem(req, res) {
  const item = { ...req.body };
  item.id = generateId();
  item.addedAt = Date.now();
  store.inventory.push(item);
  res.status(201).json(item);
}

module.exports = { addItem };



function updateItem(req, res) {
  const index = store.inventory.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  store.inventory[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(store.inventory[index]);
}

function deleteItem(req, res) {
  const index = store.inventory.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  store.inventory.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};

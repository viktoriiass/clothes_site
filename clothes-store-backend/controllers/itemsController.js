const store = require('../data/store');

function getAllItems(req, res) {
  res.json(store.inventory);
}

function getItemById(req, res) {
  const item = store.inventory.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
}

function addItem(req, res) {
  const newItem = { id: store.getNextItemId(), ...req.body };
  store.inventory.push(newItem);
  res.status(201).json(newItem);
}

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

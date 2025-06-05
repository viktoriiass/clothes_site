const basketStore = require('../data/basket');

function getBasket(req, res) {
  res.json(basketStore.items);
}

function addToBasket(req, res) {
  const item = req.body;

  const existingIndex = basketStore.items.findIndex(
    i => i.id === item.id && i.size === item.size
  );

  if (existingIndex !== -1) {
    basketStore.items[existingIndex].quantity += 1;
  } else {
    basketStore.items.push({
      ...item,
      quantity: 1,
      addedAt: Date.now()
    });
  }

  res.status(201).json({
    message: 'Item added to basket',
    basket: basketStore.items
  });
}
function updateBasketQuantity(req, res) {
  console.log(' PUT received for item:', req.params.id, req.query.size, req.body);

  const { quantity } = req.body;
  const sizeParam = req.query.size?.toString().split(':')[0];

  const index = basketStore.items.findIndex(
    i => i.id.toString() === req.params.id.toString() && i.size === sizeParam
  );

  if (index !== -1) {
    basketStore.items[index].quantity = quantity;
    return res.json({ message: 'Quantity updated', basket: basketStore.items });
  } else {
    return res.status(404).json({ message: 'Item not found in basket' });
  }
}


function deleteFromBasket(req, res) {
  const id = req.params.id;
  const size = req.query.size;

  console.log(' DELETE request:', { id, size });
  console.log(' Current basket items:', basketStore.items);

  const index = basketStore.items.findIndex(
    item => item.id.toString() === id.toString() && (!size || item.size === size)
  );

  if (index !== -1) {
    const deletedItem = basketStore.items[index];
    basketStore.items.splice(index, 1);
    console.log(' Deleted from basket:', deletedItem);
    return res.status(200).json({ message: 'Item removed from basket' });
  } else {
    console.warn(' Not found in basket:', { id, size });
    return res.status(404).json({ message: 'Item not found in basket' });
  }
}



module.exports = {
  getBasket,
  addToBasket,
  deleteFromBasket,
  updateBasketQuantity
};

const { v4: uuidv4 } = require('uuid');

let items = require('../data');

// GET /items
const getItems = (req, reply) => reply.send(items);

// GET /items/:id
const getItem = (req, reply) => {
  const { id } = req.params;

  const item = items.find((item) => item.id === id);

  reply.send(item);
};

// POST /items
const addItem = (req, reply) => {
  const { name } = req.body;

  const item = {
    id: uuidv4(),
    name,
  };

  items = [...items, item];

  reply.code(201).send(item);
};

// DELETE /items/:id
const deleteItem = (req, reply) => {
  const { id } = req.params;

  items = items.filter((item) => item.id !== id);

  reply.send({ message: `Item ${id} has been removed` });
};

// PUT /items/:id
const updateItem = (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;

  items = items.map((item) => (item.id === id ? { id, name } : item));
  const item = items.find((item) => item.id === id);

  reply.send(item);
};

module.exports = { getItems, getItem, addItem, deleteItem, updateItem };

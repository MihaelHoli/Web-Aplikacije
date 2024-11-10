const express = require('express');
const router = express.Router();

let properties = [];

router.get('/', (req, res) => {
  res.json(properties);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid property ID' });
  }
  const property = properties.find(p => p.id === id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
});

router.post('/', (req, res) => {
  const { id, name, description, price, location, rooms, area } = req.body;
  if (!id || !name || !description || !price || !location || !rooms || !area) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (price < 0 || rooms < 0 || area < 0) {
    return res.status(400).json({ error: 'Invalid property data' });
  }
  properties.push({ id, name, description, price, location, rooms, area });
  res.status(201).json({ message: 'Property added' });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid property ID' });
  }
  const { name, description, price, location, rooms, area } = req.body;
  if (!name || !description || !price || !location || !rooms || !area) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (price < 0 || rooms < 0 || area < 0) {
    return res.status(400).json({ error: 'Invalid property data' });
  }
  const propertyIndex = properties.findIndex(p => p.id === id);
  if (propertyIndex === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }
  properties[propertyIndex] = { id, name, description, price, location, rooms, area };
  res.json({ message: 'Property updated' });
});

router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid property ID' });
  }
  const property = properties.find(p => p.id === id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  const { name, description, price, location, rooms, area } = req.body;
  if (price < 0 || rooms < 0 || area < 0) {
    return res.status(400).json({ error: 'Invalid property data' });
  }
  if (name) property.name = name;
  if (description) property.description = description;
  if (price) property.price = price;
  if (location) property.location = location;
  if (rooms) property.rooms = rooms;
  if (area) property.area = area;
  res.json({ message: 'Property partially updated' });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid property ID' });
  }
  const propertyIndex = properties.findIndex(p => p.id === id);
  if (propertyIndex === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }
  properties.splice(propertyIndex, 1);
  res.json({ message: 'Property deleted' });
});

module.exports = {
  router,
  properties
};
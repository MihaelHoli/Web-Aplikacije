const express = require('express');
const router = express.Router();

let offers = [];
const { properties } = require('./properties');

router.post('/', (req, res) => {
  const { id, propertyId, firstName, lastName, offerPrice, phoneNumber } = req.body;
  if (!id || !propertyId || !firstName || !lastName || !offerPrice || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (offerPrice < 0) {
    return res.status(400).json({ error: 'Invalid offer price' });
  }
  const property = properties.find(p => p.id === propertyId);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  offers.push({ id, propertyId, firstName, lastName, offerPrice, phoneNumber });
  res.status(201).json({ message: 'Offer added' });
});

router.get('/', (req, res) => {
  res.json(offers);
});

module.exports = router;
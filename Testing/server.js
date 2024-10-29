const express = require('express');
const app = express();

const PORT = 3000;

const pizzas = [
  { id: 1, name: 'Margherita', ingredients: ['tomato', 'mozzarella', 'basil'], price: 8.99 },
  { id: 2, name: 'Pepperoni', ingredients: ['tomato', 'mozzarella', 'pepperoni'], price: 9.99 },
  { id: 3, name: 'Hawaiian', ingredients: ['tomato', 'mozzarella', 'ham', 'pineapple'], price: 10.99 }
];

app.get('/Testing/pizze', (req, res) => {
  res.json(pizzas);
});

app.get('/Testing/pizze/:id', (req, res) => {
  const pizzaId = parseInt(req.params.id, 10);
  const pizza = pizzas.find(p => p.id === pizzaId);

  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404).send('Pizza not found');
  }
});

app.listen(PORT, error => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
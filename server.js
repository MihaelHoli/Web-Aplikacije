const express = require('express');
const app = express();

const PORT = 3000;

const pizze = [
  { id: 1, name: 'Margherita', ingredients: ['tomato', 'mozzarella', 'basil'], price: 8.99 },
  { id: 2, name: 'Pepperoni', ingredients: ['tomato', 'mozzarella', 'pepperoni'], price: 9.99 },
  { id: 3, name: 'Hawaiian', ingredients: ['tomato', 'mozzarella', 'ham', 'pineapple'], price: 10.99 },
  { id: 4, name: 'Quattro Stagioni', ingredients: ['tomato', 'mozzarella', 'mushrooms', 'ham', 'artichokes', 'olives', 'anchovies'], price: 11.99 },
  { id: 5, name: 'Capricciosa', ingredients: ['tomato', 'mozzarella', 'ham', 'mushrooms', 'artichokes'], price: 10.99 }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/Testing/pizze', (req, res) => {
  res.json(pizze);
});

app.get('/Testing/pizza/:id', (req, res) => {
  const id_pizza = parseInt(req.params.id, 10);

  for (const pizza of pizze) {
      if (pizza.id === id_pizza) {
          return res.json(pizza);
      }
  }
});

app.listen(PORT, (error) => {
    if (error) {
        console.log('greska');
    } else {
        console.log(`Server je pokrenut na http://localhost:${PORT}`);
    }
});
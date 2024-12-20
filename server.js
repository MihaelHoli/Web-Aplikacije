const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const pizze = [
  { id: 1, naziv: 'Margerita', cijena: 7.0 },
  { id: 2, naziv: 'Capricciosa', cijena: 9.0 },
  { id: 3, naziv: 'Šunka sir', cijena: 8.0 },
  { id: 4, naziv: 'Vegetariana', cijena: 12.0 },
  { id: 5, naziv: 'Quattro formaggi', cijena: 15.0 }
];

app.get('/pizze', (req, res) => {
  return res.json(pizze);
});

app.get('/pizze/:id', (req, res) => {
  const id_pizza = req.params.id;

  if (isNaN(id_pizza)) {
    return res.json({ message: 'GREŠKA! ID nije broj!' });
  }

  for (pizza of pizze) {
    if (pizza.id == id_pizza) {
      return res.json(pizza); 
    }
  }
  return res.json({ message: 'Nema pizze' });
});

app.put("/pizza/:id", (req, res) => {
    let id_pizza_req = req.params.id;
    let tijelo_zahtjeva = req.body;

    if(isNaN(id_pizza_req)){
        return res.json({ message: 'Proslijedili ste parametar koji nije broj' });
    }
 
    let index = pizze.findIndex(pizza => pizza.id == id_pizza_req);

    if (index === -1) {
        return res.json({ message: 'Pizza s tim ID-em ne postoji' });
    }

    pizze[index] = tijelo_zahtjeva;

    console.log("pizza array", pizze);

    return res.json({ message: 'Pizza uspješno ažurirana' });
});

app.patch('/pizza/:id/cijena', (req, res) => {
  const id_pizza = req.params.id;
  const { cijena } = req.body;

  if (isNaN(id_pizza)) {
    return res.json({ message: 'Proslijedili ste parametar koji nije broj' });
  }

  if (typeof cijena !== 'number' || cijena <= 0) {
    return res.json({ message: 'Proslijedili ste neispravnu cijenu' });
  }

  const pizza = pizze.find(p => p.id == id_pizza);

  if (!pizza) {
    return res.json({ message: 'Pizza s tim ID-em ne postoji' });
  }

  pizza.cijena = cijena;

  return res.json({ message: 'Cijena pizze uspješno ažurirana', pizza });
});

app.listen(PORT, error => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
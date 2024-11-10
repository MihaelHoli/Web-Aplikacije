const express = require('express');
const router = express.Router();

const pizze = [
  { id: 1, naziv: 'Margerita', cijena: 7.0 },
  { id: 2, naziv: 'Capricciosa', cijena: 9.0 },
  { id: 3, naziv: 'Šunka sir', cijena: 8.0 },
  { id: 4, naziv: 'Vegetariana', cijena: 12.0 },
  { id: 5, naziv: 'Quattro formaggi', cijena: 15.0 }
];

const narudzbe = [];

router.post('/', (req, res) => {
  const { narudzba, prezime, adresa, broj_telefona } = req.body;

  if (!Array.isArray(narudzba) || !prezime || !adresa || !broj_telefona) {
    return res.json({ message: 'Niste poslali sve potrebne podatke.' });
  }

  let ukupna_cijena = 0;

  for (const item of narudzba) {
    if (!item.pizza || !item.velicina || !item.kolicina) {
      return res.json({ message: 'Niste poslali sve potrebne podatke.' });
    }

    const pizza = pizze.find(p => p.naziv === item.pizza);
    if (!pizza) {
      return res.json({ message: `Pizza ${item.pizza} ne postoji u jelovniku.` });
    }

    ukupna_cijena += pizza.cijena * item.kolicina;
  }

  narudzbe.push({ narudzba, prezime, adresa, broj_telefona });

  const narucenePizze = narudzba.map(item => `${item.pizza} (${item.velicina})`).join(' i ');

  return res.json({
    message: `Vaša narudžba za ${narucenePizze} je uspješno zaprimljena!`,
    prezime,
    adresa,
    ukupna_cijena
  });
});

module.exports = router;
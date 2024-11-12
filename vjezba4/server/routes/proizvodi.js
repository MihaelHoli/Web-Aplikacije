import express from 'express';
import { proizvodi } from '../data.js'; // Add this line

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ proizvodi });
});

router.get('/:id', (req, res) => {
    let id_proizvod = req.params.id;

    if (isNaN(id_proizvod)) {
        res.status(400).json({ message: 'Neispravan ID proizvoda' });
    }

    let proizvod = proizvodi.find(p => p.id == id_proizvod);

    if (!proizvod) {
        return res.status(404).json({ message: 'Proizvod nije pronađen' });
    }

    return res.status(200).json({ proizvod });
});

export default router;
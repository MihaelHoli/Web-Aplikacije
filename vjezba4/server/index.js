import express from 'express';

import proizvodiRouter from './routes/proizvodi.js';
import narudzbeRouter from './routes/narudzbe.js';

const app = express();

app.use(express.json());

app.use('/proizvodi', proizvodiRouter);
app.use('/narudzbe', narudzbeRouter);

let port = 3000;

app.listen(port, error => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});
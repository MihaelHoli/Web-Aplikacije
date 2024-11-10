const express = require('express');
const bodyParser = require('body-parser');
const { router: propertiesRouter } = require('./routes/properties');
const offersRouter = require('./routes/offers');

const app = express();
app.use(bodyParser.json());

app.use('/properties', propertiesRouter);
app.use('/offers', offersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const dotenv = require('dotenv');
const categoryRouter = require('./routes/categoryRouter');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api/categories', categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

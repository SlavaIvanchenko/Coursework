'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./route');
const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
})
);

app.use(morgan('dev'));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/cars', db.getItems);
app.post('/cars/post', db.addItem);
app.delete('/cars/delete/:id', db.deleteItem);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

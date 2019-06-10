'use strict';
const pool = require('./config');

const getItems = (request, response) => {
  pool.connect((err, client) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      client.query('SELECT * FROM cars ORDER BY id ASC', (err, results) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(results.rows);
        }
      });
    }
  });
};

const addItem = (request, response) => {
  const numbers = request.body.numbers;
  const model = request.body.model;
  const id = request.body.id;
  pool.connect((err, client) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      client.query('INSERT INTO cars (numbers, model, id) VALUES($1, $2, $3)', [numbers, model, id], err => {
        if (err) {
          return response.status(400).send(err);
        } else {
          response.status(201).send({ message: 'DATA inserted' });
        }
      });
    }
  });
};

const deleteItem = (request, response) => {
  const id = request.params.id;
  pool.connect((err, client) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      client.query('DELETE FROM cars WHERE id = $1', [parseInt(id)], err => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send({ message: 'DELETE record' });
        }
      });
    }
  });
};

module.exports = {
  getItems,
  addItem,
  deleteItem
};
.
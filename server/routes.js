const express = require('express');
const models = require('./models');

// the shape of the data from the database:
// {
// productId: number,
// name: string,
// price: integer,
// prime: binary,
// imageUrl: string,
// numReviews: integer,
// avgRating: 2.5,
// }
//
// the shape the client expects:
// [ {
// "id": 70,
// "productId": 71,
// "name": "Refined Frozen Bacon",
// "price": 974,
// "prime": 1,
// "imageUrl": "https://d1ivqy59bo7rzu.cloudfront.net/glass-bead-ornaments.jpg",
// "numReviews": 72736,
// "avgRating": 5
//    } ]

const router = express.Router();

router.get('/related_products/:id', (req, res) => {
  models.products.getRelated(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/related_products/product/:id', (req, res) => {
  models.products.getProduct(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/related_products/:id', (req, res) => {
  models.products.addNew(req.params.id, req.body, (err, results) => {
    if (err) {
      // res.status(500).send(err);
      res.status(500).send('Something went wrong!');
    } else {
      res.status(201).send(results);
    }
  });
});

router.put('/related_products/:id', (req, res) => {
  models.products.updateProduct(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(500).send(err);
      // res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});

router.delete('/related_products/:id', (req, res) => {
  models.products.deleteProduct(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});


module.exports = router;

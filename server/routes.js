const express = require('express');
const models = require('./models');

const router = express.Router();

// NOTE: The original GET request involves more than querying a single item from the database and doesn't help when testing the post, delete, and update functionality.
// router.get('/related_products/:id', (req, res) => {
//   models.products.getRelated(req.params.id, (err, results) => {
//     if (err) {
//       res.status(500).send('Something went wrong!');
//     } else {
//       res.status(200).send(results);
//     }
//   });
// });
router.get('/related_products/:id', (req, res) => {
  models.products.getProduct(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/related_products/', (req, res) => {
  models.products.addNew(req.body, (err, results) => {
    if (err) {
      res.status(500).send(err);
      // res.status(500).send('Something went wrong!');
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

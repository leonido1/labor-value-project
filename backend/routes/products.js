const router = require('express').Router();
let product = require('../models/product.model');

router.route('/').get((req, res) => {
  product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const labour_input = req.body.labour_input;
  const intermediate_products = req.body.intermediate_products;
   
  const newProduct = new product({name:name,labour_input:labour_input,intermediate_products:intermediate_products});

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
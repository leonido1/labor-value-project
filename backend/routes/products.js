const router = require('express').Router();
let product = require('../models/product.model');

router.route('/').get((req, res) => {
  product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const productname = req.body.productname;
  console.log(req.body.productname)
  const newProduct = new product({name:productname});

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
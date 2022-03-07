const router = require('express').Router();
let product = require('../models/product.model');
var _ = require('lodash');


router.route('/').get((req, res) => {
  product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/edit').post(async (req,res)=>{
  
  filter = {name:req.body.productOriginalName}
  var update = { name:req.body.name,intermediate_products:req.body.intermediate_products,labour_input:req.body.labour_input  };
  const productToUpdate = await product.findOne({name:req.body.productOriginalName}) 
  

  if(!(_.isEqual(productToUpdate.intermediate_products,update.intermediate_products)&&productToUpdate.labour_input===update.intermediate_products.labour_input)){
    update.labour_value=-1;
  }


  product.findOneAndUpdate(filter, update).then((data)=>{data});
  
  
})


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
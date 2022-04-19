const router = require('express').Router();
let Product = require('../models/product.model');
var _ = require('lodash');


router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/edit').post(async (req,res)=>{
  
  filter = {name:req.body.productOriginalName}
  var update = { name:req.body.name,intermediate_products:req.body.intermediate_products,labour_input:req.body.labour_input  };
  const productToUpdate = await Product.findOne({name:req.body.productOriginalName}) 
  

  if(!(_.isEqual(productToUpdate.intermediate_products,update.intermediate_products)&&productToUpdate.labour_input===update.intermediate_products.labour_input)){
    update.labour_value=-1;
  }


  Product.findOneAndUpdate(filter, update).then((data)=>{data});
  
  
})


router.route('/add').post((req, res) => {
  const name = req.body.name;
  const labour_input = req.body.labour_input;
  const intermediate_products = req.body.intermediate_products;

  const newProduct = new Product({name:name,labour_input:labour_input,intermediate_products:intermediate_products});

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/delete').post((req, res) => {

  var productToDelete = req.body.name;
  Product.find().then(products=>{products.map((product=>{
    if(product.name==productToDelete){
      product.remove()
    }
    product.intermediate_products.map((intermediate_product,index)=>{
      if(intermediate_product.name===req.body.name){
        console.log(intermediate_product,index)
        console.log(product.intermediate_products.splice(index,1))
        console.log(product.intermediate_products)
        Product.updateOne({name:product.name},{intermediate_products:product.intermediate_products,labour_value:-1}).then(data=>{console.log(data)})
      }
      
    
    })
  
  
  }))})
  
  
  
  
    res.json({"status":200})




})




module.exports = router;

const router = require('express').Router();
const linear = require('linear-solve')

let product = require('../models/product.model');
const isAuthanticated = require('../util/auth');



router.route('/').get(isAuthanticated,async (req, res) => {

  console.log(req.session.loggedIn,"after")
  console.log(req.session.id,"after")
  console.log(req.session.user)
  req.session.save()
  let products =await product.find()
  
  let indexArr = []
  let productMatrix = []
  let labour = []
  
  products.map((product,index)=>{
    
    indexArr[product.name]=index;
    labour[index]=-product.labour_input
    productMatrix.push(Array(products.length).fill(0) )
  })

  productMatrix.map((productInputRow,row)=>{

    productMatrix[row][row]=-1;

    products[row].intermediate_products.forEach(intermediate_product => {
      productMatrix[row][indexArr[intermediate_product.name]]=productMatrix[row][indexArr[intermediate_product.name]]+parseFloat(intermediate_product.quantity)
 
    });
      
  });
  
  let solution = linear.solve(productMatrix,labour)

  products.map(async (prod,index)=>{
    products[index].labour_value = solution[index];
    let res = await product.findOneAndUpdate({name:products[index].name},{labour_value:products[index].labour_value})

  })

   
 
  res.status(200).json({status:200,mat:productMatrix,products: products, labour,solution})
});



router.route('/getLaborValueByName').get(isAuthanticated,async (req, res)=>{

  let unkownLaborValue =await product.find({ labour_value: "-1"});
 

  if(unkownLaborValue.length===0){
        
    let foundProduct = await product.find({ name: req.query.name})

    if(foundProduct.length==0)
      return res.status(200).json({})

    return res.status(200).json({labour_value:foundProduct[0].labour_value})



  }else{
    return res.status(200).json({message:"need to caclculate labor values"})
  }



    



  
})



module.exports = router;


























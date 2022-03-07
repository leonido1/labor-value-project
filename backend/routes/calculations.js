
const router = require('express').Router();
const linear = require('linear-solve')

let product = require('../models/product.model');

router.route('/').get(async (req, res) => {
  
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
      productMatrix[row][indexArr[intermediate_product.name]]=parseInt(intermediate_product.quantity)
 
    });
      
  });
  

  let solution = linear.solve(productMatrix,labour)

  products.map(async (prod,index)=>{
    products[index].labour_value = solution[index];
  
    let res = await product.findOneAndUpdate({name:products[index].name},{labour_value:products[index].labour_value})
    console.log({name:products[index].name},products[index])
    
    console.log(res)

  })

   

  res.status(200).json({status:200,mat:productMatrix,products: products, labour,solution})
});



router.route('/getLaborValueByName').get(async (req, res)=>{

  let unkownLaborValue =await product.find({ labour_value: "-1"});
 

  if(unkownLaborValue.length===0){
        
    let foundProduct = await product.find({ name: req.query.name})
    console.log(foundProduct,res)

    if(foundProduct.length==0)
      return res.status(200).json({})

    return res.status(200).json({labour_value:foundProduct[0].labour_value})



  }else{
    return res.status(200).json({message:"need to caclculate labor values"})

  }



    



  
})



module.exports = router;


























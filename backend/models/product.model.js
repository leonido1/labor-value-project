const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchem = new Schema({
    name:{
        type:"string",
        required:true,
        unique:true
    },
    labour_value:{
        type:"Number",
        default:-1
    },
    labour_input:{
        type:"Number",

    },
    intermediate_products:{
         type:Array   
    } 
 
},{
timestamps:true,
})

const Product = mongoose.model('product',productSchem)
module.exports = Product;
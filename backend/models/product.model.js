const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchem = new Schema({
    name:{
        type:"string",
        required:true,
        unique:true
    }
},{
timestamps:true,
})

const Product = mongoose.model('product',productSchem)
module.exports = Product;
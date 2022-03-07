const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open',()=>{
  console.log("MongoDB database connection established")
})
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const calculationRouter = require('./routes/calculations')
const productRouter = require('./routes/products')
app.use('/products',productRouter)
app.use('/calculations',calculationRouter)


app.listen(port,()=>{
  console.log('server is running on port:',port);
})













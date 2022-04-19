const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('express').Router();

let User = require('./models/user.model');

var session = require('express-session')


require('dotenv').config();

var MemoryStore = require('session-memory-store')(session);


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true});
const connection = mongoose.connection;

connection.once('open',async ()=>{
  console.log("MongoDB database connection established")
})
const app = express()
const port = process.env.PORT || 5000;


app.use(cors( {  
  origin:'http://localhost:3000',  
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true}));

app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  name:'uniqueSessionID',
  store: new MemoryStore() ,
  cookie: { maxAge: 1000 * 60 * 60 * 24,httpOnly: false }
}))


const calculationRouter = require('./routes/calculations')
const productRouter = require('./routes/products')
const auth = require('./routes/auth')


app.use('/auth',auth)
app.use('/products',productRouter)
app.use('/calculations',calculationRouter)


app.listen(port,()=>{
  console.log('server is running on port:',port);
})













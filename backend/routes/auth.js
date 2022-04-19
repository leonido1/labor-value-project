const router = require('express').Router();
let Product = require('../models/product.model');

let User = require('../models/user.model');


var session ;

router.route('/login').post(async (req,res)=>{
    
    console.log("body",req.session)
    console.log(req.body.password)
    //console.log(user.username ==req.body.username, user.password == req.body.password)
    
    let user = await User.findOne({name:req.body.username})
    let auth = await User.schema.methods.validPassword(req.body.password,user.password)

    if(auth){
         res.json({token:"tir234-09fie9o340fjo9h23w9fghy39fh43"})
         
         session = req.session;
         session.loggedIn = true
         session.user = {name:user.name}
         console.log(req.session.loggedIn,"session logged in")
         console.log(req.session.id)
         console.log(req.session.save())
   
    }else{
         res.json({message:"not athunticated"})
    }
        
    
    
})

router.route('/logout').post( (req,res)=>{
    
     console.log("log out",req.session)
     console.log(req.session.destroy((err)=>{console.error("error",err)}))
     console.log("after destroy",req.session)
     
     res.json({message:"logged out"})
})

module.exports = router;

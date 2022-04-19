
 function isAuthanticated(req,res,done){
  
    console.log(req.session)


    if (req.session.loggedIn == undefined ||req.session.loggedIn!=true){
      return  res.json({message:"not authanticated"})
    }else{
      return done()
  
    }
    
    
  }
  

  
  module.exports = isAuthanticated;

import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Switch,useNavigate,useLocation  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/navbar'; 
import AddProduct from './components/AddProduct';
import ProductsGraph from './components/ProductsGraph';
import EditProduct from './components/editProduct'
import DeleteProduct from './components/deleteProduct'
import ProtectRoute from './auth/protectRoute'
import { useEffect, useState } from 'react';
import Login from './auth/login';
import {Power}  from 'react-bootstrap-icons';




const Redirect=(props)=>{
  
  
  let navigate = useNavigate();
  
  const location = useLocation()
  console.log(location.pathname)

  useEffect(()=>{   

  if(props.path===undefined){
    navigate('/')
  
  }else{
    navigate(props.path)
  }

  
  },[props])
  
  
  return ""
}


function App(props) {

  let token = sessionStorage.getItem("token")
  console.log("token",typeof(token))
  console.log("token",token)

  const [loggedIn,setLoggedIn] = useState()

  console.log(props)

  try{
  token =  JSON.parse(token)
  }catch{}

  console.log(token)
  if(token=="undefined" ||token===null){
    console.log("in if")
    return(
      <>
      <Router>

      <Routes>
      <Route  path="/login" element={<Login/>} >{}</Route>
      </Routes>
      <Redirect path="login"/>
      </Router>
     </>
    
    )
  }


  return (
    <>
      <Router>
      <Navbar setLoggedIn={setLoggedIn}><Power color='Red' />  </Navbar>

    <Routes>
       <Route path="/" exact element={<ProductsGraph/>} />
       <Route path="/addProduct" exact element={<AddProduct/>} />
       <Route path="/editProduct" exact element={<EditProduct/>} />
       <Route path="/deleteProduct" exact element={<ProtectRoute  element={DeleteProduct} />  }  />
       <Route path="*"  element={<h1> 404 not found</h1>} />
  </Routes>
  <Redirect />
  
  </Router>
    
  
  </>
      );
}

export default App;

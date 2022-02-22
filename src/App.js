import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/navbar'; 
import AddProduct from './components/AddProduct';
import ProductsGraph from './components/ProductsGraph';



function App() {





  return (

   <div>
      <Router>
      <Navbar/>

    <Routes>
       <Route path="/" exact element={<ProductsGraph/>} />
       <Route path="/addProduct" exact element={<AddProduct/>} />
       
  </Routes>
  </Router>

  </div>
      );
}

export default App;

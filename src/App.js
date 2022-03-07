import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/navbar'; 
import AddProduct from './components/AddProduct';
import ProductsGraph from './components/ProductsGraph';
import EditProduct from './components/editProduct'


function App() {


  return (

      <Router>
      <Navbar/>

    <Routes>
       <Route path="/" exact element={<ProductsGraph/>} />
       <Route path="/addProduct" exact element={<AddProduct/>} />
       <Route path="/editProduct" exact element={<EditProduct/>} />
  </Routes>
  </Router>

      );
}

export default App;

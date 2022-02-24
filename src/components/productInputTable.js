import  React,{ useEffect, useState }  from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Row } from 'react-bootstrap';


import axios from 'axios';
import $ from "jquery";



export default function ProductInputTable(props){

  const[products,setProducts]= useState([])
  const[productToChoose,setProductsToChoose] = useState([])
  const[gotProductsFromServer,setGotProductsFromServer] = useState(false)
  

  const tableId = props.ProductInputTableId;


  useEffect(()=>{

    if(gotProductsFromServer)
      return

    axios.get('http://localhost:5000/products/').then((res)=>{
           setProductsToChoose(res.data.map((product)=>{return product.name }))
           setGotProductsFromServer(true)
    
    })

  })


   var typeahead=React.createRef();
   

    var tableContends = products.map((product,index) =>{ return (
      <tr key={index}>
      <td>{index}</td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>     
     </tr>

    ) });

    

    const addProductToTable = (e)=>{
      
      let arr = [...products]
      
      console.log(e)
      e.preventDefault()
  
      
      setProducts([...products ,{name:typeahead.getInput().value,quantity:$("#quantityInPut").val()}])
      setProductsToChoose(productToChoose.filter(product => product!=typeahead.getInput().value ))
      console.log($("#quantityInPut").val())
      $("#quantityInPut").val("")
      typeahead.clear()    
      
      
  } 

    return (
    <>
      <Table id = {tableId} striped bordered hover>
      <thead>
        
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
      {tableContends}
      </tbody>
    </Table>
    
  
  

    <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          options={productToChoose}
          placeholder="Choose a state..."
          value=""
          ref={ (ref)=>typeahead=ref}
      />
  
  
     <Form.Label htmlFor="quantityInPut">Quantity</Form.Label>
     <Row>
    
     <Form.Control  type="number" id="quantityInPut" />
     </Row>
      <br></br>
      <Row>
      <Button onClick={addProductToTable}>add intermediate product</Button>
      </Row>
    
    </>
   
    )
    
  }
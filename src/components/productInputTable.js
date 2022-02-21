import  React,{ useEffect, useState }  from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';


// for dev only
const devProducts= ["car","shirt","doors","pants"]



export default function ProductInputTable(){

  const[products,setProducts]= useState([])
  
  console.log(products)

    var tableContends = products.map((product,index) =>{ return (
      <tr key={index}>
      <td>{index}</td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>     
     </tr>

    ) });

    

    const addProductToTable = (e)=>{
      
      let arr = [...products]
      
      console.log(arr)
      setProducts([...products ,{name:e.target[0].value,quantity:e.target[2].value}])
      e.preventDefault()
  
  } 



    return (
    <>
      <Table striped bordered hover>
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
    
  
  

  <Form   onSubmit={addProductToTable}>
  
    <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          options={devProducts}
          placeholder="Choose a state..."
      />
  
  
     <Form.Label htmlFor="quantityInPut">Quantity</Form.Label>
     <Form.Control    type="number" id="quantityInPut" />
      <Button type="submit">Submit form</Button>
  </Form>
    
    </>
   
    )
    
  }
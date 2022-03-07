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

  console.log(props.intermediateProductsToPresent)
  const[products,setProducts]= useState([])
  
  const[productToChoose,setProductsToChoose] = useState([])
  const[gotProductsFromServer,setGotProductsFromServer] = useState(false)
  const[InterMidaite,settInterMidaite] = useState(false)

  
  const tableId = props.ProductInputTableId;

  useEffect(()=>{
    console.log(props.intermediateProductsToPresent)
  },[products])



  useEffect(()=>{
    
    setProducts(props.intermediateProductsToPresent)
    let productsInTable = props.intermediateProductsToPresent.map((product)=>{return product.name})
    console.log(productsInTable)

    console.log("run props",products)
    axios.get('http://localhost:5000/products/').then((res)=>{
      setProductsToChoose(res.data.map((product)=>{return product.name }).filter(productName=>{ return !(productsInTable.includes(productName))}))
      setGotProductsFromServer(true)

})

  },[props])


   var typeahead=React.createRef();
   

 

    var tableContends = products.map((product,index) =>{ return (
      <tr key={index}>
      <td>{index}</td>
      <td>{product.name}</td>
      <td contentEditable="true" onChange={(val)=>{console.log(val)}}>{product.quantity}</td>     
      <td>
              <span className="table-remove"
                ><button onClick={
                  (e)=>{console.log(e.target.value)
                    setProducts(products.filter((product)=>{
                      
                      //console.log(product,(product.name =! e.target.value))
                      //console.log(typeof product.name,typeof e.target.value)

                       return product.name !== e.target.value
                    }))

                    console.log(...productToChoose, e.target.value)
                    setProductsToChoose([...productToChoose, e.target.value])
                
                }} value={product.name} type="button" className="btn btn-danger btn-rounded btn-sm my-0">
                  Remove
                </button></span
              >
            </td>
     </tr>

 )})   

    const addProductToTable = (e)=>{
      console.log("click")
      let arr = [...products]
      
      console.log(e)
      
  
      
      setProducts([...products ,{name:typeahead.getInput().value,quantity:$("#quantityInPut").val()}])
      console.log([...products ,{name:typeahead.getInput().value,quantity:$("#quantityInPut").val()}])
      
      setProductsToChoose(productToChoose.filter(product => product!=typeahead.getInput().value ))
      console.log($("#quantityInPut").val())
      $("#quantityInPut").val("")
      typeahead.clear()    
      e.preventDefault()
      
  } 

    return (
    <>
      <Table id = {tableId} striped bordered hover>
      <thead>
        
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Remove</th>
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
import React, {Component, component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductInputTable from "./productInputTable"
import { Form,Button } from 'react-bootstrap'


import axios from 'axios';
import $ from "jquery";



const ProductInputTableId = "ProductInputTable"; 
const ProductNameId="ProductName";
const ProductLabourId="ProductLabour";


export default class AddProduct extends Component{

  constructor(props){
    super(props);

    this.addProduct = this.addProduct.bind(this); 

  }


  addProduct(e){
    let intermediateProducts = []
    let typeByIndexMap = {index:0,name:1,quantity:2};
    
        
    for (let index = 0; index < $("#"+ProductInputTableId).find("td" ).length; index=index+4) {
      intermediateProducts.push({name:$("#"+ProductInputTableId).find("td" )[index+typeByIndexMap.name].innerHTML,
      quantity:$("#"+ProductInputTableId).find("td" )[index+typeByIndexMap.quantity].innerHTML})
     
    }

    console.log($("#ProductName").val())
    console.log($("#ProductLabour").val())


    axios.post('http://localhost:5000/products/add',{intermediate_products:intermediateProducts,name:$("#ProductName").val(),labour_input:$("#ProductLabour").val()}).
    catch(err=>console.log(err))

    
    $("#ProductName").val("")
    $("#ProductLabour").val("")


    e.preventDefault()
  }

    render(){
      return ( 
      
      <Form onSubmit={this.addProduct}>
      
        <br></br>
      <Form.Label>Name</Form.Label>
      <Form.Control id={ProductNameId} type="text" placeholder="Enter name" />
      
        <br></br>
      <Form.Label>Labour</Form.Label>
      <Form.Control id={ProductLabourId} type="Number" placeholder="Enter Labour to produce one unit" />

      <br></br>
      <ProductInputTable intermediateProductsToPresent={[]} ProductInputTableId={ProductInputTableId}></ProductInputTable>
      

      <br></br>

        <Button type="submit">add product</Button>

      </Form>
      
      );
    }


}






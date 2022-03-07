import React, {Component, component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductInputTable from "./productInputTable"
import { Form,Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';


import axios from 'axios';
import $ from "jquery";



const ProductInputTableId = "ProductInputTable"; 
const ProductNameId="ProductName";
const ProductLabourId="ProductLabour";


export default class AddProduct extends Component{

  constructor(props){
    super(props);
    this.editProduct = this.editProduct.bind(this); 
    this.presentChoosenProduct = this.presentChoosenProduct.bind(this)
    this.state ={productToChoose:[],choosenProduct:{}}    

  }


productOriginalName="";


componentDidMount(){

    axios.get('http://localhost:5000/products/').then((res)=>{
            console.log(res)
            this.setState({productToChoose:res.data})           
        })    
    }

presentChoosenProduct(value){
    console.log(value)
        this.setState({choosenProduct:value})
    console.log(this.state)
}


editProduct(e){
    
    let intermediateProducts = []
    let typeByIndexMap = {index:0,name:1,quantity:2};
    console.log($("#"+ProductInputTableId).find("td" ).length)

    for (let index = 0; index < $("#"+ProductInputTableId).find("td" ).length; index=index+4) {
      intermediateProducts.push({name:$("#"+ProductInputTableId).find("td" )[index+typeByIndexMap.name].innerHTML,
      quantity:$("#"+ProductInputTableId).find("td" )[index+typeByIndexMap.quantity].innerHTML})
    }

    console.log($("#ProductName").val())
    console.log($("#ProductLabour").val())

    axios.post('http://localhost:5000/products/edit',{productOriginalName:this.productOriginalName,intermediate_products:intermediateProducts,name:$("#ProductName").val(),labour_input:$("#ProductLabour").val()}).
    catch(err=>console.log(err))

    $("#ProductName").val("")
    $("#ProductLabour").val("")
}

    render(){

    console.log(this.state.productToChoose.map(product=>product.name))
    console.log("render",this.state.choosenProduct[0])


    var nameToShoow="";
    var labourToShow =""
    var intermediateProductsToPresent=[];

    if(this.state.choosenProduct.length){
        console.log("in if")
        nameToShoow=this.state.choosenProduct[0].name;
        labourToShow=this.state.choosenProduct[0].labour_input;
        intermediateProductsToPresent = this.state.choosenProduct[0].intermediate_products
    }
        
    console.log(this.state.choosenProduct.length)

      return ( 
      
      <Form onSubmit={this.editProduct}>
        
    <Typeahead
          id="select-product-to-edit"
          labelKey="name"
          options={this.state.productToChoose}
          placeholder="A product to edit"
          value=""
          onChange ={(value)=>{try {
            this.productOriginalName=value[0].name 
          } catch (error) {
            
          }; this.presentChoosenProduct(value)}}
      />

        <br></br>
      <Form.Label>Name</Form.Label>
      <Form.Control id={ProductNameId} onChange={(e)=>{console.log({...this.state.choosenProduct[0],name:e.target.labour_input})
                                                        this.setState({choosenProduct:[{...this.state.choosenProduct[0],name:e.target.labour_input}]})    }} 
                                                        type="text" placeholder="Enter name" value={nameToShoow} />
      
        <br></br>
      <Form.Label>Labour</Form.Label>
      <Form.Control id={ProductLabourId} type="Number" 
    onChange={(e)=>{console.log({...this.state.choosenProduct[0],labour_input:e.target.value})
    this.setState({choosenProduct:[{...this.state.choosenProduct[0],labour_input:e.target.value}]})    }}

      placeholder="Enter Labour to produce one unit" value={labourToShow} />
      <br></br>
      <ProductInputTable intermediateProductsToPresent={intermediateProductsToPresent} ProductInputTableId={ProductInputTableId}  ></ProductInputTable>
      
      <br></br>

        <Button type="submit">edit product</Button>

      </Form>
      
      );
    }


}






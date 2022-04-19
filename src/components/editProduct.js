import React, {Component, component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductInputTable from "./productInputTable"
import { Form,Button,Col,Row,Container } from 'react-bootstrap';
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
    this.typeahead = React.createRef();

  }


productOriginalName="";


componentDidMount(){

    axios.get('http://localhost:5000/products/').then((res)=>{
            this.setState({productToChoose:res.data})           
        })    
    }

presentChoosenProduct(value){
        this.setState({choosenProduct:value})
}


editProduct(e){
    
    let intermediateProducts = []
    let typeByIndexMap = {index:0,name:1,quantity:2};

    for (let index = 0; index < $("#"+ProductInputTableId).find("td" ).length; index=index+4) {
      intermediateProducts.push({name:$("#"+ProductInputTableId).find("td" )[index+typeByIndexMap.name].innerHTML,
      quantity:$("#"+ProductInputTableId).find("td" )[index+typeByIndexMap.quantity].innerHTML})


    }

    //$("#"+ProductInputTableId+" > tbody")[0].innerHTML="";


    axios.post('http://localhost:5000/products/edit',{productOriginalName:this.productOriginalName,intermediate_products:intermediateProducts,name:$("#ProductName").val(),labour_input:$("#ProductLabour").val()}).
    catch(err=>console.log(err))

    this.presentChoosenProduct({})
    this.typeahead.clear()
    
    e.preventDefault()

}

    render(){


    console.log(this.state)
    var nameToShoow="";
    var labourToShow =""
    var intermediateProductsToPresent=[];

    if(this.state.choosenProduct.length){
 
        nameToShoow=this.state.choosenProduct[0].name;
        labourToShow=this.state.choosenProduct[0].labour_input;
        intermediateProductsToPresent = this.state.choosenProduct[0].intermediate_products
    }

      return ( 
  
      <Form onSubmit={this.editProduct}>
        <br></br>
        <Row> <Col ></Col><Col><div className="d-grid gap-1">  <h4 style={{"text-align": "center"}}>Edit Product</h4></div></Col> <Col ></Col></Row> 
      <Row>
    
      <Col></Col>
        <Col>
        <Form.Label>Choose product to edit</Form.Label>
     <Typeahead
          id="select-product-to-edit"
          labelKey="name"
          options={[...this.state.productToChoose]}
          placeholder="A product to edit"
          onChange ={(value)=>{try {
            this.productOriginalName=value[0].name 
          } catch (error) {
            console.log("error")
          }; console.log("value",value); this.presentChoosenProduct(value)}}
          ref={ (ref)=>this.typeahead=ref}
      
      />

        <br></br>
      <Form.Label>Name</Form.Label>
      <Form.Control id={ProductNameId} onChange={(e)=>{
                                                        this.setState({choosenProduct:[{...this.state.choosenProduct[0],name:e.target.labour_input}]})    }} 
                                                        type="text" placeholder="Enter name" value={nameToShoow} />
      
        <br></br>
      <Form.Label>Labour</Form.Label>
      <Form.Control id={ProductLabourId} type="Number" 
    onChange={(e)=>{
    this.setState({choosenProduct:[{...this.state.choosenProduct[0],labour_input:e.target.value}]})    }}

      placeholder="Enter Labour to produce one unit" value={labourToShow} />
      <br></br>
      </Col>
      <Col></Col>

      </Row>
  

      <Row>
      <Col></Col>

      <Col>
      <Container style={{"background": "azure"}}>
      <ProductInputTable intermediateProductsToPresent={intermediateProductsToPresent} ProductInputTableId={ProductInputTableId}  ></ProductInputTable>
      </Container>
      </Col>
      <Col></Col>
      </Row>
      
      <br></br>
        

      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
        <div className="d-grid gap-1">
        <Button type="submit">edit product</Button>
        </div>
        </Col>
        <Col></Col>
        <Col></Col>
        </Row>
      </Form>
      );
    }


}






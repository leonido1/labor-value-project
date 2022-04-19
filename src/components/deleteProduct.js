import React, {Component, component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductInputTable from "./productInputTable"
import { Form,Button,Container,Row,Col } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015


import axios from 'axios';



export default class DeleteProduct extends Component{

    constructor(){
        super()
        this.state = {productToChoose:[],productToDelete:""};
        this.deleteProduct = this.deleteProduct.bind(this);
        this.typeahead=React.createRef();
    }


    deleteProduct(e){
        console.log(this.state.productToDelete)
        axios.post("http://localhost:5000/products/delete",{name:this.state.productToDelete}).then((data)=>{console.log(data)})
        e.preventDefault()
        this.setState({productToChoose:this.state.productToChoose.filter((product)=>{return product.name !=this.state.productToDelete})})
        this.typeahead.clear()
    }

    
    componentDidMount(){

        axios.get('http://localhost:5000/products/').then((res)=>{
                console.log(res)
                this.setState({productToChoose:res.data})           
            })    
    }


    render(){
        return(<Form onSubmit={this.deleteProduct}>
         <br></br>
        <Container style={{"background": "azure"}}>
        <br></br>
        <Form.Label>Choose product to delete</Form.Label>
    <Typeahead
          id="select-product-to-edit"
          labelKey="name"
          options={this.state.productToChoose}
          placeholder="A product to edit"
          value=""
          onChange ={(value)=>{try {
            this.setState({productToDelete:value[0].name}) 
          } catch (error) {
            
          };}}
          ref = {(ref)=>{this.typeahead=ref}}
      
      />
        
          <br></br>

        <Row>
            <Col></Col>
            <Col></Col>
         <Col>
            <div className="d-grid gap-1">
                <Button  type="submit">delete product</Button>
            </div>
        </Col>
            <Col></Col>
            <Col></Col>
        </Row>
        <br></br>
        </Container> 
        </Form>)
    }
}






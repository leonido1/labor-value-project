import React, {Component, component} from 'react';
import vis from 'vis';
import axios from 'axios';
import { Form,Button,Row,Col,Container } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import Labourvalue from './LabourValue';

export default class ProductsGraph extends Component{


    constructor(props){
        super(props)
        this.state = {products:[],choosenProduct:{name:''}}
        this.showProductByName = this.showProductByName.bind(this);
        this.getProductObjectByName = this.getProductObjectByName.bind(this);
        this.changeChoosenProduct = this.changeChoosenProduct.bind(this);
        
        //this.typeaheadValue="";
        
    }

    changeChoosenProduct(value){
        console.log(value)
        this.setState({choosenProduct:value})
    }


    showProductByName(productName){
        
        const choosenProduct = this.state.choosenProduct;

        console.log(this.getProductObjectByName("chair"))
        
        var edgesSet =[]
        var nodeSet = []                                                                         
        
        let checkIfNodeIn = {}

        var nodeQueue=[choosenProduct]
        
        while(nodeQueue.length>0){
            
            let currentProd = nodeQueue.shift()
            console.log(currentProd,"current product")
            
            nodeSet.push(currentProd)
            
            currentProd.intermediate_products.forEach(product => {
           
           
                edgesSet.push({from:product.name,to:currentProd.name, arrows: { to: { enabled: true }},label:product.quantity})
           
                if(checkIfNodeIn[product.name]==undefined){    
                    checkIfNodeIn[product.name]=1;
                    nodeQueue.push(this.getProductObjectByName(product.name))
                }
            });

        }
        
        checkIfNodeIn={}
        nodeSet = nodeSet.map((product)=>{
            
            if(checkIfNodeIn[product.name]==undefined){    
                checkIfNodeIn[product.name]=1;
                return {id:product.name,label:product.name}
            }
        }).filter((prod)=>{if(prod!=undefined){return true}else return false})
        console.log(nodeSet,edgesSet)

        var nodes = new vis.DataSet(nodeSet)
        
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: nodes,
            edges: edgesSet,
        };
    
        var network = new vis.Network(container, data, {});

    
    }
    
    getProductObjectByName(name){
        return this.state.products.filter((product)=>{return product.name == name})[0]
    }

    componentDidMount(){

        axios.get("http://localhost:5000/products").then(res=>{
            
            this.setState({products:res.data})
            var nodeSet = res.data.map((product) =>{return {id:product.name,label:product.name}})
            console.log(nodeSet)    
            var nodes = new vis.DataSet(nodeSet)
        
            var edgesSet =[] 
            
                res.data.map((product) =>{   
                 (product.intermediate_products.map((intermediate_product)=>{
                    console.log(intermediate_product)
                    edgesSet.push ({from:intermediate_product.name,to:product.name, arrows: {
                        to: { enabled: true }
                      },
                      label:intermediate_product.quantity
                    })
                     }))
                })
 
            
        var edges = new vis.DataSet(edgesSet);

                    
        // create a network
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: nodes,
            edges: edges,
        };
        var options = {};
        var network = new vis.Network(container, data, options);  

        })
    }

    render(){

        console.log(this.state)
       
       
        var productName='';
       
       
        try {
            console.log(productName)
            productName =  this.state.choosenProduct.name
     
        } catch (error) {
            productName='leonid';
            console.log(error)
        
        }
        
        console.log(productName.toString().toString(),"sdadas")
      
      
      
        return (
      <div>

    
      <br></br>
      <Container style={{"background": "azure"}}>
      <br></br>
      <Row>
      <Col></Col>
    <Col>

      <Typeahead
          id="select-product-name"
          labelKey="name"
          options={this.state.products}
          placeholder="A product tree to show"
          value=""
          onChange={(value)=>{ this.changeChoosenProduct(value[0])}}
        />
    </Col>
    <Col></Col>
    </Row>
    
    <Row><br></br></Row>

    <Row>
    <Col></Col>   
    <Col><Labourvalue key={productName} name={productName} ></Labourvalue ></Col>
    <Col></Col>
    </Row>

    <Row>
        <Col  xs={5}></Col>
      <Col xs={2}><Row><Button onClick={this.showProductByName}>show graph</Button></Row></Col>
      <Col xs={5} ></Col>
      
    </Row>
    <br></br>
    </Container>

      <Row style={{height: "400px"}} id='mynetwork'><br></br> </Row>
      
      
      </div>);
    }


}


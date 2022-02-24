import React, {Component, component} from 'react';
import vis from 'vis';
import axios from 'axios';


export default class ProductsGraph extends Component{


    componentDidMount(){

        axios.get("http://localhost:5000/products").then(res=>{
            console.log(res)
            console.log(res.data)

            var nodeSet = res.data.map((product) =>{return {id:product.name,label:product.name}})
            console.log(nodeSet)
     
            var nodes = new vis.DataSet(nodeSet)
        
            var edgesSet =[] 
            
                res.data.map((product) =>{   
                 (product.intermediate_products.map((intermediate_product)=>{
                    edgesSet.push ({from:intermediate_product.name,to:product.name, arrows: {
                        to: { enabled: true }
                      },
                      label:intermediate_product.quantity
                    })
                     }))
                })
 
            console.log(edgesSet)

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
      return (<div id='mynetwork'> </div>);
    }


}


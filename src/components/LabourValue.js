import axios from 'axios';
import React, {Component, component} from 'react';
import {Button,Row,Col} from 'react-bootstrap'

export default class LabourValue extends Component{

    constructor(props){
        super(props)
        console.log(props)
        this.name=props.name;
        this.state = {productName:props.name,labourValue:"",needToRecalculate:false};
        this.recalculate=this.recalculate.bind(this);
        this.recalculateButton = this.recalculateButton.bind(this);

    }

    componentDidMount(){

        axios.get("http://localhost:5000/calculations/getLaborValueByName",{  withCredentials: true,params:{name:this.state.productName}}).then(res=>{

            if(res.data.message=='need to caclculate labor values'){
                console.log(res)
                this.setState({labourValue:"need to recalculate",needToRecalculate:true})

                return
            }
            
            console.log(res)

            this.setState({labourValue:res.data.labour_value})


        }).catch((err)=>{console.log(err)})


    }
    


    recalculateButton(){
        if(this.state.needToRecalculate||true){
            return <Row><Col xs={3}></Col><Col xs={6}> <div className="d-grid gap-1"><Button type='submit' onClick={this.recalculate}>Recalculate</Button></div></Col><Col xs={3}></Col></Row>
        }else {
            return <></>
        }
    }
    
    recalculate(){


        console.log(document.cookie)
        axios.get("http://localhost:5000/calculations/",{ 
            withCredentials: true
          }).then(data=>{ console.log("then") 
          this.setState({needToRecalculate:false,labourValue:""})}).catch((err)=>{console.log(err)})
    }




    render(){       
        console.log("in value render")
        
        return(<>
       
        <h3>Labour value:{(()=>{
            if(parseFloat(this.state.labourValue).toFixed(2) ==="NaN")
                return "";
            return parseFloat(this.state.labourValue).toFixed(2)})()}</h3>
          {this.state.needToRecalculate&&this.recalculateButton()}
              
            <br></br>        
            
        </>)

    }












}
import axios from 'axios';
import React, {Component, component} from 'react';


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

        axios.get("http://localhost:5000/calculations/getLaborValueByName",{params:{name:this.state.productName}}).then(res=>{

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
        if(this.state.needToRecalculate){
            return <button type='submit' onClick={this.recalculate}>Recalculate</button>
        }else {
            return <></>
        }
    }
    
    recalculate(){

        axios.get("http://localhost:5000/calculations/").then(data=>{this.setState({needToRecalculate:false,labourValue:""})})
    }




    render(){
        console.log("in value render")
        
        return(<>
        <h1>Labour value:{this.state.labourValue}</h1>
          {this.state.needToRecalculate&&this.recalculateButton()}
              
            <br></br>
        </>)

    }












}
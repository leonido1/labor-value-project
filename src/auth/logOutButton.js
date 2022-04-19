
import React, { Component, useState ,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import {Power}  from 'react-bootstrap-icons';
import axios from 'axios';
import {useNavigate  } from 'react-router-dom';


const Redirect=(props)=>{
  
  
    let navigate = useNavigate();
    
   
    useEffect(()=>{   
    
      navigate('/login')
    
    },[props])
    
    
    return ""
  }
  
  

export default function LogOutButton(props) {


const [logOut,setlogOut] = useState(false)




const  logOutButton = async ()=>{
    console.log("click")

    

   let res = await axios.post("http://localhost:5000/auth/logout",{},{ 
    withCredentials: true}).then((res)=>{
        sessionStorage.setItem("token",null); 
        props.setLoggedIn(false);
        console.log(res)
      

        }).catch(err=>{
        console.log(err)
    })

    console.log(res,"res")


}




return(
<>
    <Button onClick={logOutButton}><Power/>  </Button>
   
    </>
    )





}


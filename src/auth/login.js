import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Axios from 'axios';
import {Row,Col,Form,Button} from 'react-bootstrap'

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showNotAuthnticatedMessage, setshowNotAuthnticatedMessage]=useState(false);



  const loginUser = async e => {
    
  e.preventDefault()

  let res=await Axios.post('http://localhost:5000/auth/login',{username:username,password:password},{ 
    withCredentials: true})
 
  if(res.data.token==undefined){
    setshowNotAuthnticatedMessage(true)
    return
  }



  sessionStorage.setItem("token",res.data.token)
  window.location.reload();

  }




  return(


<>
<br></br><br></br>
<Row>

<Col></Col>

<Col>
{showNotAuthnticatedMessage&&<a style={{color:"red"}}>User Not Authnticated   </a>}

<Form onSubmit={loginUser}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>User name</Form.Label>
    <Form.Control onChange={e => setUserName(e.target.value)} type="text" placeholder="Enter user name" />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Row>
    
<Col></Col>


<Col>
  <Button style={{width: "inherit"}} variant="primary" type="submit">
    Login
  </Button>
</Col>

<Col></Col>

  </Row>
</Form>
</Col>

<Col></Col>

</Row>
</>
    )
}
































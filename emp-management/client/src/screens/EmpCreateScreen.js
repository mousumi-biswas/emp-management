import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

const Empcreatescreen = () => {
    
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
 
 // Submit button
  const submitHandler = (e) =>{
     e.preventDefault();
     axios.post("http://localhost:8000/api/insert", 
     {firstName: firstName,
     lastName: lastName,
     email:email
     }).then(()=>{
       alert('successfully inserted')
     })
     setFirstName('')
     setLastName('')
     setEmail('')
  }
 

 
    return (
         <>
        <Link to='/' className='btn btn-light my-3'>
          Go Back
        </Link>
          <FormContainer>
            <h1 >Create Employee</h1>
          
              <Form onSubmit={submitHandler}>

                 <Form.Group controlId='firstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
            

                  <Form.Group controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter last name'
                    value={lastName}

                    onChange={(e) => setLastName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              
                <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            
              <Button type='submit' variant='success' className='mt-3' >
                Add
              </Button>
          </Form>
        
      </FormContainer>
    </>
    );
}

export default Empcreatescreen;

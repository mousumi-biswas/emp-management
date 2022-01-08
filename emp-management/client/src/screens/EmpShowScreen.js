import React, {useState,useEffect} from 'react';

import { Table, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Pagination from '../components/Pagination';
import FormContainer from '../components/FormContainer'

const Empshowscreen = () => {
   const [empList, setEmpList] = useState([])
   const [currentPage, setCurrentPage] = useState(1);
   const [listPerPage] = useState(5);

   const history=useHistory();

  useEffect(()=>{
     axios.get("http://localhost:8000/api/get")
     .then((res)=>{
       setEmpList(res.data)
     
     })
  },[])

  const btnHandler = ()=>{
    history.push('/employee')
  }
  const csvHandler = ()=>{
    history.push('/upload')
  }

  // Get current posts
  const indexOfLastPage = currentPage * listPerPage;
  const indexOfFirstPage = indexOfLastPage - listPerPage;
  const currentList = empList.slice(indexOfFirstPage, indexOfLastPage);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
      <>
      <Row className='align-items-center'>
        <Col>
          <h1>Employees</h1>
        </Col>
        <Col className='text-right'>
          <Button variant='success' className='my-3'onClick={btnHandler} >
            <i className='fas fa-plus'></i> Create Employee
          </Button>
         
          <Button variant='success' className='my-3 ml-2'onClick={csvHandler} >
            <i className='fas fa-plus'></i> Upload CSV
          </Button>
        </Col>
      </Row>
     
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
              
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  
                  <td>{emp.email}</td>
                
                </tr>
              ))}
            </tbody>
            
          </Table>
          <FormContainer>
            <Pagination
        listPerPage={listPerPage}
        totalList={empList.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </FormContainer>
      
     </>
     </>
    );
}

export default Empshowscreen;

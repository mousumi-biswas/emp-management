import React from 'react';
import {Nav, ListGroup, Button} from 'react-bootstrap'

const Pagination = ({ listPerPage, totalList, paginate, currentPage,setCurrentPage }) => {
  const pageNumbers = [];

  const numPages = Math.ceil(totalList / listPerPage);
  for (let i = 1; i <= numPages; i++) {
  if (i <= 5 || //the first five pages
 
      i === numPages || //the last page
      Math.abs(currentPage - i) <= 1 //the current page and the one before and after
     )
     
    pageNumbers.push(i);
    
}


   const handlePrev =()=>{
        if(currentPage === 1) return
        setCurrentPage(currentPage - 1)
    }
    const handleNext =()=>{
        setCurrentPage(currentPage + 1)
    }

  return (
    <Nav>
   
      
         <Button className="mr-1" variant="success" onClick={handlePrev} >
         <i className="fas fa-arrow-circle-left mr-2"></i>
            prev
        </Button>
           {pageNumbers.map(number => (
          <ListGroup key={number}   >
          <ListGroup.Item variant="success" action onClick={() => paginate(number)}>
             
              {number}
            </ListGroup.Item>
          </ListGroup>

        ))}
    <Button  className="ml-1" variant="success" onClick={handleNext}>
        next
     <i className="fas fa-arrow-circle-right ml-2"></i>
    </Button>
     
    </Nav>
  
  );
};

export default Pagination;
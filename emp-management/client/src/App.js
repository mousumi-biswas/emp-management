import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import EmpCreateScreen from './screens/EmpCreateScreen'
import EmpShowScreen from './screens/EmpShowScreen'
import UploadCsvScreen from './screens/UploadCsvScreen'



function App() {
  return (
   <Router>
   <Header/>
   <main className='py-3'>
   <Container>
     <Route path='/' component={EmpShowScreen} exact/>
     <Route path='/upload' component={UploadCsvScreen} exact/>
     <Route path='/employee' component={EmpCreateScreen} exact/>
     <Route path='/search/:keyword' component={EmpShowScreen} exact />
  </Container>
   </main>


   </Router>
  );
}

export default App;

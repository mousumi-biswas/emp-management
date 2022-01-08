import React, {useState} from 'react';
import axios from 'axios'
import {Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'

const Uploadcsvscreen = () => {
   const [file, setFile] = useState();
   const [fileName, setFileName] = useState("");
 
   const saveFile = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      };
 
     const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
          const res = await axios.post(
            "http://localhost:8000/api/upload",
            formData
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
    
        }
  return (
    <>
     <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
    
     <div className="form-group">
      <label className="mt-5" htmlFor="formGroupExampleInput">Upload CSV File</label>
      <input
        type="file"
        className="form-control"
        id="formGroupExampleInput"
        onChange={saveFile}
        accept='csv'
      />
       <Button variant="success" className="mt-3" onClick={uploadFile}>Upload</Button>
    </div>
    </FormContainer>
  </>
    );
}


export default Uploadcsvscreen;

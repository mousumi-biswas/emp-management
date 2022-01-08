const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')


const app = express();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'empmanagement'

})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});






//@type   POST
// upload csv to database
app.post('/api/upload', upload.single("file"), (req, res) =>{
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database '  );
});
 
function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let uniqueCsvData = [...new Set(csvData)]
    let csvStream = csv
        .parse()
        .on("data", function (data) {
               
        })
        .on("end", function () {
          
            // Remove Header ROW
                csvData.shift();
              
  
           
                    const insertCsv = 'INSERT INTO csvusers (firstName, lastName, email) VALUES ?';
                    db.query(insertCsv, [uniqueCsvData], ( result) => {
                        console.log( result);
                    });
                });
             
            // delete file after saving to MySQL database
           
            fs.unlinkSync(filePath)
        
  
    stream.pipe(csvStream);
}

app.post('/api/insert', (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const insertEmp = "INSERT INTO employee (firstName, lastName, email) VALUES (?,?,?)";
    db.query(insertEmp, [firstName, lastName, email], (err, result)=>{
      console.log(result)
    })
})

app.get('/api/get', (req,res)=>{
    const getEmp = "SELECT * FROM employee";
    db.query(getEmp, (err, result)=>{
       res.send(result)
    })
})




const PORT = 8000;

app.listen(PORT, ()=>console.log(`running on ${PORT}`))
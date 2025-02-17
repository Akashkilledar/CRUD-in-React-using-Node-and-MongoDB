// import express from 'express';   
let express = require('express');
let bodyparser = require('body-parser');
var cors = require('cors')
let mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/college')
// mongoose.connect('mongodb://localhost:27017/college')
    .then((res) => {
        console.log("Database Connect........");
    }).catch((err) => {
        console.log("DB Connection Error ::::::::::::::: " + err);
    });


let studentSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    contact: String
});

// Create Model 
let Students = mongoose.model("students", studentSchema);

let app = express();
app.use(express.json());

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Node Server Running Succesfully!!!<h1/>")
});

app.get("/students", async (req, res) => {

  try{

      let allStudents = await Students.find({});
      
      console.log(allStudents);
      res.json({status : "Success", data : allStudents})

    }catch(err){
        res.json({status : "Failed", data : err})
    }
});

app.get("/students/:id", async (req, res) => {
    let singleStudent = await Students.findById(req.params.id);

    console.log(singleStudent);
    res.json(singleStudent)
});

app.post("/students", async (req, res) => {
    try{

        // console.log(req.body);
        let body = req.body;
        
        let singleUser = await Students.create({
            name: body.name,
            surname: body.surname,
            email: body.email,
            contact: body.contact
        });
        
        console.log(singleUser);
        res.send({staus: "Success", data: singleUser})

    }catch(err){
        console.log(err);
        
        res.send({staus: "Failed", data: err})
    }
});

app.put("/students/:id", async (req, res) => {
    // console.log(req.params.id);
    let userId = req.params.id;
    let body = req.body;

    let updatedUser = await Students.findByIdAndUpdate(userId, body, { new: true })

    res.send(updatedUser)
});

app.delete("/students/:id", async (req, res) => {
    let userId = req.params.id;
    let deletedStudent = await Students.findByIdAndDelete(userId)

    res.send(deletedStudent)
});

app.listen(8080, () => {
    console.log("Server Running on http://localhost:8080");
});
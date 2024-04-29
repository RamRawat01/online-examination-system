const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const collection = require("./config");
const quiz = require("./quiz");


const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));


app.set('view engine' , 'html');


app.use(express.static("public"));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/index.html",function(req,res){
    
    res.sendFile(__dirname + "/index.html");
});

app.get("/SignUp.html",function(req,res){
    
    res.sendFile(__dirname + "/SignUp.html");
});
app.get("/Login.html",function(req,res){
    
    res.sendFile(__dirname + "/Login.html");
});
app.get("/quiz.html",function(req,res){
    
    res.sendFile(__dirname + "/quiz.html");
});

app.post("/Sign.html" , async(req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const userdata = await collection.insertMany(data);
    console.log(userdata);
})


app.listen(3000 , function(){
    console.log("server started at port 3000");
});
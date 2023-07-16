const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.send("oo its up!");
});

mongoose.connect("mongodb://127.0.0.1:27017/db",{useNewUrlParser:true}).then(()=>{console.log("connected success")}).catch((err)=>{console.error(err)});


const articalSchema = {
    title:"string",
    content : "string"
}

const Article = mongoose.model("Article",articalSchema);

app.get("/articles",(req,res)=>{
    Article.find().then((foundArt)=>{
        //console.log(foundArt)
        res.send(foundArt);
    }).catch((err)=>{console.error(err)})
})





app.listen(3000, function() {
    console.log("server up on 3000");
});
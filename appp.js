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

app.route("/articles")

//requesting all data on articles
.get((req,res)=>{
    Article.find().then((foundArt)=>{
        //console.log(foundArt)
        res.send(foundArt);
    }).catch((err)=>{console.error(err)})
    }).post((req,res)=>{
    // console.log(req.body.title)
    // console.log(req.body.content)

    //add new data and using thunderbod to send the data
    const newArticle = new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save().then(()=>{
        console.log("saved successfully")
    }).catch((err)=>{console.error(err)});
    })

.delete((req,res) =>{
    Article.deleteMany().then(()=>{
        res.send("deleted all articles");
    }).catch((err)=>{res.send(err)});
    });

// app.get("/articles",)

// app.post("/articles",);

// app.delete("/articles",);


app.listen(3000, function() {
    console.log("server up on 3000");
});
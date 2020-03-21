const express = require("express");

const app = express();

const hbs = require("hbs");

const path = require("path");

const covid = require('novelcovid');
const fetch = require("node-fetch");

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }));


;




app.get("/", async (req, res) => {
    let data = await fetch('https://corona.lmao.ninja/all')
        .then(response => {
            return response.json()
        })
        .then(data => {
            var d = new Date(); // for now
            d.getHours(); // => 9
            d.getMinutes(); // =>  30
            d.getSeconds();
            // Work with JSON data here
            res.render("home", { data,d });
            //console.log(data)
        })
        .catch(err => {
            // Do something for an error here
        })
        
        
  
});

app.get('/countryWise',async(req,res)=>{
    let data = await fetch('https://corona.lmao.ninja/countries')
        .then(response => {
            return response.json()
        })
        .then(data => {
            
            // Work with JSON data here
           // data = JSON.stringify(data)
            res.render("countryWise", { data:data});
            //console.log(data)
        })
        .catch(err => {
            // Do something for an error here
        })
})
app.listen(8080, () => {
  console.log("Running on 8080");
});

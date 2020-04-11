
const express = require("express");

const app = express();

const hbs = require("hbs");

const path = require("path");

const covid = require('novelcovid');
const fetch = require("node-fetch");

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }));

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
            var x=data.recovered+data.deaths;
            //console.log(x);
            
            res.render("home", { data,d ,x});
            //console.log(data)
        })
        .catch(err => {
            // Do something for an error here
        })
        
        
  
});
app.get("/yesterday", async (req, res) => {
    let data = await fetch('https://corona.lmao.ninja/yesterday/all')
        .then(response => {
            return response.json()
        })
        .then(data => {
            var d = new Date(); // Today!
            d.setDate(d.getDate() - 1);
            
            var x = data.recovered + data.deaths;
            // Work with JSON data here
            res.render("Yeshome", { data, d,x });
            //console.log(data)
        })
        .catch(err => {
            // Do something for an error here
        })



});
app.get('/countryWise',async(req,res)=>{
    let data = await fetch('https://corona.lmao.ninja/countries?sort=cases')
        .then(response => {
            return response.json()
        })
        .then(data => {
            //data.sort((a, b) => parseFloat(b.cases) - parseFloat(a.cases));
            // Work with JSON data here
           // data = JSON.stringify(data)
            res.render("countryWise", { data:data});
            //console.log(data)
        })
        .catch(err => {
            // Do something for an error here
        })
})
app.get('/countryWiseYesterday', async (req, res) => {
    let data = await fetch('https://corona.lmao.ninja/yesterday?sort=cases')
        .then(response => {
            return response.json()
        })
        .then(data => {
            //data.sort((a, b) => parseFloat(b.cases) - parseFloat(a.cases));
            // Work with JSON data here
            // data = JSON.stringify(data)
            res.render("countryYesterday", { data: data });
            //console.log(data)
        })
        .catch(err => {
            // Do something for an error here
        })
})
app.get('/USAstates', async (req, res) => {
    let data = await fetch('https://corona.lmao.ninja/states')
        .then(response => {
            return response.json()
        })
        .then(data => {
            data.sort((a, b) => parseFloat(b.cases) - parseFloat(a.cases));
            // Work with JSON data here
            // data = JSON.stringify(data)
            res.render("stateWise", { data: data });
            //console.log(data)
        })
        .catch(err => {
            // Do something for an error here
        })
})

app.listen(process.env.PORT || 3000, process.env.IP);

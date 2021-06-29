var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use((req,res,next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip)
    next();
})

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/now',
    (req,res,next) => {
        req.time = new Date().toString()
        next()
    },
    (req, res) => {
        res.send({time: req.time})
    }
)

app.get('/:word/echo', (req,res,next) => {
    let word = req.params.word;
    res.send({echo: word})
})

app.get('/name', (req,res,next) => {
    res.send({ name: req.query.first + ' ' + req.query.last })
})

app.get('/json',(req,res) => {
        res.json({"message": "Hello json"})
})
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/views/index.html')
})

module.exports = app;

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = new express()
app.use(cors())

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//database Schemas
let Person = require('./person.model')

//mongodb+srv://milan:test123@cluster0.bab1yhp.mongodb.net/SampleDB?retryWrites=true&w=majority


mongoose.connect('mongodb+srv://milan:test123@cluster0.bab1yhp.mongodb.net/SampleDB?retryWrites=true&w=majority')
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB connection extablished')
})


const persons = [
    {name: "Milan", place: "Thrissur"},
    {name: "Tony", place: "Thrissur"},
    {name: "Goutham", place: "Thrissur"}
]

const users = [
    {name: "Anand", place: "Ijk"},
    {name: "Tony", place: "Guruvayur"},
    {name: "Alan", place: "Amballur"},
    {name: "Goutham", place: "oorakam"}
]

app.get("/", (req, res) => {
    res.json("Hello World")
})

app.get("/persons", async (req, res) => {
    let data = await Person.find().catch((_) => {
        res.json("Error finding data")
    })
    res.json(data)
})

app.post("/persons", (req, res) => {
    let person = new Person(req.body)
    person.save().then(_ => {
        res.json("Data Saved")
    }).catch(_ => {
        res.json("Not Saved")
    })
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})

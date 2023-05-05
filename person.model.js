const mongoose = require('mongoose')

//make schema(table structure(which all column, their data types))

const Schema = mongoose.Schema

let Person = new Schema({
    person_name: {type: String},
    person_place: {type: String} 
})

module.exports = mongoose.model('Persons', Person)
const {model, Schema, Types: {ObjectId}} = require('mongoose')

const DataSchema = new Schema({
    content: {type: String, require: true},
})

const Data = model('data', DataSchema)
module.exports = {Data}
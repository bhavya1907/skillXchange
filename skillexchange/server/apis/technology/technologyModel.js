const mongoose = require("mongoose")

const technologySchema = new mongoose.Schema({
    name:{type:String,default:""},
    description:{type:String,default:""},
    thumbnail:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports = new mongoose.model("technologies",technologySchema)
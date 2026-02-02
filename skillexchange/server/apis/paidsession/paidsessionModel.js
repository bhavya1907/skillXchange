const mongoose = require("mongoose")

const paidSessionSchema = new mongoose.Schema({
    name:{type:String,default:""},
    addedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    technologyId:{type:mongoose.Schema.Types.ObjectId,ref:"technologies"},
    description:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})
module.exports = new mongoose.model("paidsessions",paidSessionSchema)
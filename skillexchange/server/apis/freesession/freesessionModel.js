const mongoose = require("mongoose")

const freeSessionSchema = new mongoose.Schema({
    title:{type:String,default:""},
    addedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    technologyId:{type:mongoose.Schema.Types.ObjectId,ref:"technologies"},
    description:{type:String,default:""},
    attachment:{type:String,default:""},
    playlist:{type:String,default:""},
    noofvids:{type:Number, default:0}
})
module.exports = new mongoose.model("freesessions",freeSessionSchema)
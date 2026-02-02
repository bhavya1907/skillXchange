const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    title:{type:String,default:""},
    sessionId:{type:mongoose.Schema.Types.ObjectId,ref:"paidsessions"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    message:{type:String, default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid"
    },

    paymentType: {
        type: String,
        enum: ["online", "offline"],
        default: "online"
    },


})
module.exports = new mongoose.model("requests",requestSchema)

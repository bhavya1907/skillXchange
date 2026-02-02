
const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",    
    },

    review: { type: String, default: "" },

    Totalmarks: { type: Number, default: 0 },

    obtainedMarks: { type: Number, default: 0 },
    status:{type:Boolean,default:true},

    createdAt: { type: Date, default: Date.now() }

});

module.exports = mongoose.model("progress", progressSchema);
const mongoose = require("mongoose")
const mongoUrl = process.env.MONGO_URL || "mongodb+srv://bhavyavermasv:GSUiNk6D3gjdWo4Y@bhavyacls.cuc2lov.mongodb.net/skillexchange"

module.exports = mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("database connected!!")
        return true
    })
    .catch((err) => {
        console.log("database not connected:", err.message)
        return false
    })

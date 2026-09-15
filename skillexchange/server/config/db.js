const mongoUrl = process.env.MONGO_URL

if (!mongoUrl) {
    console.warn("MONGO_URL is not configured. API data features will be unavailable until it is set.")
    module.exports = Promise.resolve(false)
} else {
    const mongoose = require("mongoose")
    module.exports = mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("database connected!!")
        return true
    })
    .catch((err) => {
        console.log("database not connected:", err.message)
        return false
    })
}

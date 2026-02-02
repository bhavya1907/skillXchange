const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://bhavyavermasv:GSUiNk6D3gjdWo4Y@bhavyacls.cuc2lov.mongodb.net/skillexchange")
.then(()=>{
    console.log("database connected!!");
})
.catch((err)=>{
    console.log("err while connecting db", err);
    
})
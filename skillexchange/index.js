const express = require("express")
const app = express()
const port = 5001
const db = require("./server/config/db")

app.use(express.urlencoded({extended:true}))
const apiroutes = require("./server/routes/apiroutes")
apiroutes.use("/apis", apiroutes)
app.use("/apis", apiroutes)

app.listen(5001,(err)=>{
    if(err !=null){
        console.log("server is not connected",err);
    }
    else{
        console.log("server is connected", 5001);
    
    }
})
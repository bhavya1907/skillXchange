const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5055
const db = require("./server/config/db")
const seeder = require("./server/config/seeder")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const apiroutes = require("./server/routes/apiroutes")
const adminroutes = require("./server/routes/adminroutes")

app.use("/apis", apiroutes)
app.use("/admin", adminroutes)

app.get("/", (req, res) => {
    res.send({
        status: 200,
        success: true,
        message: "SkillXchange server is running"
    })
})

db.then((isConnected) => {
    if(isConnected){
        seeder.adminreg()
    }
    else{
        console.log("admin seeder skipped because database is not connected")
    }
})

app.listen(port,(err)=>{
    if(err !=null){
        console.log("server is not connected",err);
    }
    else{
        console.log("server is connected", port);
    
    }
})

const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5055
const db = require("./server/config/db")
const seeder = require("./server/config/seeder")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const apiroutes = require("./server/routes/apiroutes")
const adminroutes = require("./server/routes/adminroutes")

app.use("/apis", apiroutes)
app.use("/admin", adminroutes)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/health", (req, res) => res.status(200).json({
    status: 200,
    success: true,
    service: "SkillXchange API",
    timestamp: new Date().toISOString()
}))

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

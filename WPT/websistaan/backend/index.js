import express from "express";
import { establishConection } from "./db config/dbconfig.js";
import courserouter from "./routes/courseroutes.js";
 import cors from "cors"
import auth from "./routes/loginroutes.js";

const app=express();
app.use(cors());
// app.use(cors({
//     origin: 'http://127.0.0.1:5500'
// }));
app.use(express.json())

// app.use('/',(req,res)=>{
//     res.send("hiii")
// })


app.use("/course",courserouter);
app.use("/user",auth);


const port=4700
app.listen(port,()=>{
    establishConection()
    console.log("server is started")
})
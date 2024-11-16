import {Router} from "express"
import { deletecourse, getcourse, postcourse, updatecourse } from "../controller/addcourse.js";
import { verifytoken } from "../middleware/verifytoken.js";


const courserouter=Router();
courserouter.get("/getcourse",verifytoken,getcourse);
courserouter.post("/postcourse",verifytoken,postcourse);
courserouter.put("/putcourse/:CourseName",verifytoken,updatecourse);
courserouter.delete("/deletecourse/:CourseName",verifytoken,deletecourse);

export default courserouter;

import {Router} from "express"
import { signup ,login} from "../controller/auth.js"
import { verifytoken } from "../middleware/verifytoken.js"
const auth=Router()
auth.post('/signup',signup) 
auth.post('/login',login)

export default auth;
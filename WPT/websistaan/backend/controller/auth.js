import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';

import { createConnectionObject } from "../db config/dbconfig.js";
const connection=createConnectionObject();
export const signup=(req,res)=>{
    try {
        const reqdata=req.body
    const encrypeted=bcrypt.hashSync(reqdata.password,12)
    const insertQry=`insert into logcourse values (${reqdata.id},'${reqdata.name}',${reqdata.phone},'${encrypeted}')`
    connection.query(insertQry,(error,result)=>{
        if(result){
            res.status(200).send({message:'sign up done'})

        }else{
            res.status(500).send({message:'Something went wrong',error})

        }
    })
        
    } catch (error) {
        console.log("hiiiii")
        res.status(500).send({message:'Something went wrong',error})
        
    }
    



}

export const login=(req,res)=>{
    try {
        const reqdata=req.body;
        const selectQry=`select * from logcourse where name='${reqdata.name}' `;
        connection.query(selectQry,(error,result)=>{
            if(error){
                res.status(500).send({message:'Something went wrong'});
            }
            else{
                if(result.length>0){
                    if(bcrypt.compareSync(reqdata.password,result[0].password)){
                        jwt.sign({studentId:result[0].id},"prakash",(error,token)=>{
                            if(error){
                                res.status(500).send({message:'Something went wrong'})
                            }else{
                                res.status(200).send({message:'Login successful',token});
    
                            }
                        })
    
                    }else{
                        res.status(400).send({message:'Password is incorrect'});
    
                    }
                }else{
                    res.status(400).send({message:'Username is not valid'}); 
    
                }
            }
    
    
        })

    
} catch (error) {
    console.log("hii2222    ")
    res.status(500).send({message:'Something went wrong',error})
    
    
}


    
}

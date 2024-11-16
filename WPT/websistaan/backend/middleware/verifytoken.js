import jwt from 'jsonwebtoken'
export function verifytoken(req,res,next){
    try {
        const authHeader=req.get("Authorization")
        if(authHeader){
            const token=authHeader.split(" ")[1];
            jwt.verify(token,"prakash",(error,payload)=>{
                if(error){
                    res.status(401).send({message:"Invalid token"});
                }
                else{
                    
                    next();
                }
    
            })
    
        }else{
            res.status(401).send({message:"Token is missing"})
        }
        
    } catch (error) {
        res.status(401).send({message:"somethimg went wrong"})

        
    }
   

}
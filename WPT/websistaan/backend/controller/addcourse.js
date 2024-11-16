import { createConnectionObject } from "../db config/dbconfig.js";
const connection=createConnectionObject();


export function postcourse(request,response){
 
    try {
        const data = request.body;
        const insertQuery = `INSERT INTO  course VALUES ('${data.CourseName}','${data.Duration}',${data.Price},'${data.Validations}')`;
        
        connection.query(insertQuery,(error,result)=>{
            if(error){
                console.log(error);
                response.status(500).send({message:"Something went wrong"})
            }
            else{
                response.status(200).send({message:"add course done",result})
            }
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({message:"Something went wrong"})
    }
}



export function getcourse(req,res){
    try {

        const insertQry=`select * from course`
        connection.query(insertQry,(error,result)=>{
            if( result){
            
                res.status(200).send( result);
            }else{
                res.status(400).send({message:"course not found,",error});
    
            }

        })
 
        
    } catch (error) {
        res.status(500).send({message:"somthing went wrong"});
 
    }

}



export function updatecourse(req,res){

	const coursename= req.params.CourseName;
    

	const Duration = req.body.Duration;

	const Price = req.body.Price;

	const Validations = req.body.Validations;
    

    try {
        const updateQry = `
	UPDATE course 
	SET 
	Duration = '${Duration}', 
	Price = ${Price}, 
	Validations = '${Validations}' 
	WHERE CourseName = '${coursename}'
	`;
    console.log(coursename)
        // const updateQry=`update   course set ${CourseName},${Duration},${Price},${Validations} where CourseName=${CourseName}`;
        connection.query(updateQry,(error,result)=>{
            console.log(result);
            if( result){
            
                res.status(200).send({message:`"${coursename } : course update succesfully"`,result} );
            }else{
              
                res.status(400).send({message:"course not founded",error});
    
            }

        })
        
    } catch (error) {
        res.status(400).send({message:"something went wrong",error});


        
    }


}


export function deletecourse(req,res){ 
    const courseName=(req.params.CourseName);
console.log(courseName)
    try {
        const deletQry=`delete  from course where CourseName='${courseName}'`;
        connection.query(deletQry,(error,result)=>{
            console.log(result);
            if( result){
            
                res.status(200).send({message:`"${courseName } : course delete succesfully"`} );
            }else{
              
                res.status(400).send({message:"course not founded",error});
    
            }

        })
        
    } catch (error) {
        res.status(400).send({message:"something went wrong"});


        
    }

}

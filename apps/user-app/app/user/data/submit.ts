
"use server"
import { PrismaClient } from "@repo/db/client"
import { JSONParser } from "formidable/parsers";
const prisma =new PrismaClient();

export async function  submitData(obj:{title:string,description:string,startDate:Date,endDate:Date,authorId:number}){
  console.log("SUBMIT CALLED");
 



  
    let one=obj.startDate;
    let two=obj.endDate;
    console.log();
    
    if(two<=one){
       return  {msg:"starting time should be before ending time"}
    }

    const conflictingTodos = await prisma.todo.findMany({
        where: {
          OR: [
            {
              startDate: { lte: one },
              endDate: { gte: one },
            },
            {
                startDate: { lte: two },
                endDate: { gte: two },
            },
            {
                startDate: { gte: one },
                endDate: { lte: two },
            },
            {
                startDate: { lte: one },
                endDate: { gte: two },
            }
          ],
        },
      });



      if(conflictingTodos.length>0){
        return {
            msg:"conflicting todos found ",
            todos:conflictingTodos
        }
      }


      else{

      let data= await prisma.todo.create({
            
            data:{
           
                title:obj.title,
                description:obj.description,
                startDate:obj.startDate,
                endDate:obj.endDate,
                authorId:obj.authorId

                
            }

        })


        if(data){
            return {
                msg:"Task assigned Successfully !",
                id:data.id
            }
        }

      }
}
"use server"
import { atom, atomFamily, selectorFamily } from "recoil";
import axios, { Axios } from "axios";
import { PrismaClient } from "@repo/db/client";
import { output } from "framer-motion/client";
const prisma =new  PrismaClient();

 let data:(any)="new";


export async function getConflict(){
    
    return data;
}

export async function dataShow(params: { authorId: number }) {
    let body={id:params.authorId}

       let data=await  axios.post("http://localhost:3000/get-image",body);

       console.log(data.data.output);
       
      return data.data.output;



      

}

export   async  function pingCons (params: { authorId: number, startDate: Date }){

    console.log("CALCULATING LOAD!  + ",params.authorId);
    
   
    const { authorId, startDate } = params;
  
      // Define start and end of the day to filter by date only
      const startOfDay = new Date(
        params.startDate.getFullYear(),
        params.startDate.getMonth(),
        params.startDate.getDate(),
        0, 1, 0, 0
      );
  
      const endOfDay = new Date(
        params.startDate.getFullYear(),
        params.startDate.getMonth(),
        params.startDate.getDate(),
        23, 59, 59, 999
      );
 
      console.log(startDate);
      console.log(authorId);
      
      
      // Fetch todos from Prisma
      const todos = await prisma.todo.findMany({
        where: {
          authorId: params.authorId,
          startDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      console.log(todos);
      
    
      if(todos.length==0){
        data="good"
      }else{
             data=todos; 
      }

      return todos;






}



export   async  function completeData (params: { authorId: number, startDate: Date }){

    
    console.log("completeData");
    
    
   
    const { authorId, startDate } = params;
  
      // Define start and end of the day to filter by date only
      const startOfDay = new Date(
        params.startDate.getFullYear(),
        params.startDate.getMonth(),
        params.startDate.getDate(),
        0, 1, 0, 0
      );
  
      const endOfDay = new Date(
        params.startDate.getFullYear(),
        params.startDate.getMonth(),
        params.startDate.getDate(),
        23, 59, 59, 999
      );
 
      console.log(startDate);
      console.log(authorId);
      
      
      // Fetch todos from Prisma
      const todos = await prisma.todo.findMany({
        where: {
          authorId: params.authorId,
          startDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
      console.log("tods ,",todos);
      
      for(let i=0;i<todos.length;i++){
        let filez:any=await dataShow({authorId:todos[i]?.id as number})
        let obj:any={...todos[i],file:filez};

        todos[i]=obj;
      
      }
      
    
      if(todos.length==0){
        data="good"
      }else{
             data=todos; 
      }

      return todos;






}






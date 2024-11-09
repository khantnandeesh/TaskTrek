"use client"
import { useSession } from "next-auth/react";
import { AddTodo } from "../../../components/ui/add-todo";
import { BackgroundLines } from "../../../components/ui/background-lines";
import { RecoilRoot } from "recoil";
import {  getConflict } from "../../store/items/atoms";
import { useEffect, useState } from "react";
import { Loaderx } from "../../../components/loader";
import { TypewriterEffect, TypewriterEffectSmooth } from "../../../components/ui/typewrite";
import { Button } from "../../../components/ui/moving-border";


function Card({ title, description, startDate, endDate }:any) {
   return (
     <Button duration={4000} className="bg-white dark:bg-gray-800 z-100 dark:text-white shadow-md rounded-lg p-4 m-2">
       <h3 className="font-semibold text-lg">{title || "No Title"}</h3>
       <p className="text-sm text-gray-600 dark:text-gray-400">{description || "No description available."}</p>
       <p className="text-sm mt-2">
         <span className="font-semibold">Start:</span> {new Date(startDate).toLocaleString()}
       </p>
       <p className="text-sm">
         <span className="font-semibold">End:</span> {new Date(endDate).toLocaleString()}
       </p>
     </Button>
   );
 }

 const words = [
   {
     text: "Conflicting",
   },
   {
     text: "tasks",
   },
   
   {
     text: "List :-",
     className: "text-blue-500 dark:text-blue-500",
   },
 ];
 
export default function (){

   

   let [loding,setLoding]=useState(true);
   let [data,setData]=useState({state:"mounted",arr:[]})
   console.log(loding);
   
   useEffect(()=>{

      

         setInterval(()=>{
      getConflict().then((data)=>{
         
         console.log("pinged !");
         console.log(data);
         
         
         if(data!=null && data=="good"){
                  setData({state:"good",arr:[]});
                  setLoding(false);
         }
         else if(data!=null && data=="new"){
            

            setLoding(true);
         }
         else if(data!=null && data.length>0){
            setData({state:"bad",arr:data})
         }
    
      })

},10000)


   },[])




   let session:any=useSession()
   console.log(session);


   if(session.data==null){
      return <p>Signup first !</p>
   }
   
   
   
   
   return   <div className="grid grid-cols-10 h-screen">
      <div className="col-span-6 bg-black border-r flex items-center ">  <RecoilRoot><AddTodo  >{session.data.user.id}</AddTodo></RecoilRoot> </div>
     <div className="col-span-4 h-screen bg-black text-white p-2"> <BackgroundLines>
      <div className="flex justify-center text-sm"> <TypewriterEffectSmooth words={words}/></div>
    
     {loding?<Loaderx/>:
         <p>{data.state=="bad"?<Render items={data.arr}></Render>:""}</p>
            
            
         
         
      }
      </BackgroundLines>
      
       </div>

   
   </div> 
}



function Render({items}:any){
   
  
   return <div className="pl-2">
  

<div className="overflow-y-auto max-h-96 space-y-4">
        {items.map((item:any) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        ))}
      </div>
   </div>
}
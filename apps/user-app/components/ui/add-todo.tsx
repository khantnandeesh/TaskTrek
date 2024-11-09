"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Session } from "inspector/promises";
import { submitData } from "../../app/user/data/submit";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { pingCons } from "../../app/store/items/atoms";


export function AddTodo({children}:{children:React.ReactNode}) {
  let a:any=useRef();
  let [title,setT]=useState("");
  let [discription,setD]=useState("");
  let [startDate,setSD]=useState<any>();
  let [endDate,setED]=useState<any>();
  let [err,setErr]=useState<Boolean>(false);
  let [errD,setErrD]=useState<string>("");
  let [file, setFile] = useState<any >();
  console.log(children);



  


  useEffect(()=>{
    console.log("effect called !");
    console.log(startDate);
    
    
    if(startDate<endDate){
      setErr(false);
    }else{
      setErr(true)
    }

    let authorId:number=children as number;

    if(startDate){


     let data=()=>{
        console.log("PROCESSING ...");
        
        if(startDate!=null){
          pingCons({authorId,startDate}).then((data)=>{
          ;console.log(data);




            
          
          }).catch((err)=>{console.log(err);
          })
        }
        

     }
     data();
        
        
        
    }
  },[startDate,endDate])
  

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();


    const formData=new FormData();
    formData.append("image",file)
    
    
   let data= await axios.post("http://localhost:3000/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" 
      },
    });
    let fcuk;
    if(data){
    fcuk  =data.data.loc;
      console.log(fcuk);
    }



    












    console.log("attemting submitting !");
    
    let authorId=children as number;
    let description=discription;
 


    
   let response=await  submitData({title,description,startDate,endDate,authorId});
 
   console.log(response);


   let ress= await axios.post("http://localhost:3000/posti", {id:response?.id})
    
   console.log(ress);
   

  
    e.preventDefault();
    console.log("Form submitted");
  };
  
  
  return (
    
    <div className="z-10 mx-auto my-auto w-3/4 max-w-md rounded-none md:rounded-2xl md:p-8 shadow-input  bg-black dark:bg-neutral-700  text-white">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Add your work 
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Ensure you add your right data!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Title</Label>
            <Input onChange={(e)=>{
              setT(e.target.value)
            }}
             id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
        
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Discription</Label>
          <textarea onChange={(e)=>{
              setD(e.target.value)
            }} id="email" placeholder="lorem epsum" className="p-2" style={{border: "1px solid black" }} ></textarea>
          <BottomGradient/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Start Date</Label>
          <Input  id="password"  type="datetime-local" onChange={(e)=>{let asd=new Date(e.target.value);console.log(asd);setSD(asd)}} />
          <button className= "p-1 m-2 border-2 " type="button" onClick={()=>{
            let ele:HTMLInputElement=document.getElementById("password") as HTMLInputElement
            ele.value=(new Date()).toISOString().slice(0,16);
            setSD(new Date());
          }}>CurrTime</button>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="enddate">End Date</Label>
          <Input  id="enddate"  type="datetime-local" onChange={(e)=>{;let asd=new Date(e.target.value);setED(asd);
            if(startDate>endDate){
              setErr(true);
              setErrD("end time must be greater than start");

            }else{
              setErr(false)
            }

            console.log(asd)}} />
        </LabelInputContainer>


        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Profile Image</Label>
          <Input
            id="file"
            placeholder="••••••••"
            type="file"
            accept="image/*"
    
            onChange={(e)=>{
              console.dir(e.target.files?e.target.files[0]:"");
              
              if(e.target.files!=null){
                setFile(e.target.files[0])
              }

            }}
          />
        </LabelInputContainer>

        <p className="text-red-600"> {err? errD:""}</p>

        <button 
          id="myBtn"
          ref={a}
          className="bg-gradient-to-br  relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Add Todo ! &rarr;
          <BottomGradient />
        </button>

        

        
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

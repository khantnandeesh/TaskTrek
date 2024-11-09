"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import {
  
  IconBrandGoogle,
 
} from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { Loaderx } from "../../components/loader";
import { Meteors } from "../../components/ui/metors";
import { BackgroundLines } from "../../components/ui/background-lines";


export default function SignIn() {

  // State variables for name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [file, setFile] = useState<any >();
  let [loading,setL]=useState<boolean>(false)
  


  const handleSubmit = async (e: React.FormEvent) => {
    setL(true)
    e.preventDefault();
    
    const formData=new FormData();
    formData.append("image",file)
   
    
   let data= await axios.post("http://localhost:3000/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(data){
      
    }
    let loc=data.data.loc;
    console.log(loc);
    


    const result = await signIn('credentials', {
      redirect: false,
      name,
      email,
      file:loc,
      password,
    });

    if (result && result.error) {
      
    } else {
      window.location.href = '/';
    }




    // Refresh images after upload
  };



  if(loading){
    return <Loaderx></Loaderx>
  }

  return (
    <div className="h-screen mt-0">
    <BackgroundLines className="h-screen flex items-center">
    <div className="z-20 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-blue-800 dark:bg-black ">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to TaskTrek
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login and signup
      </p>

      <form  className="my-8" onSubmit={handleSubmit} >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Tyler"
              type="text"
           // Bind the value to state
              onChange={(e) => {console.log(e.target.value);;setName(e.target.value)}} // Update state on change
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email} // Bind the value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password} // Bind the value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />
        </LabelInputContainer>



        <LabelInputContainer className="mb-4 dark:text-white" >
          <Label htmlFor="password">Profile Image</Label>
          <Input
            id="file"
            placeholder="••••••••"
            type="file"
            accept="image/*"
            className="text-white"
            onChange={(e)=>{
              console.dir(e.target.files?e.target.files[0]:"");
              
              if(e.target.files!=null){
                setFile(e.target.files[0])
              }

            }}
          />
        </LabelInputContainer>
        
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[2px] w-full flex justify-center items-center font-bold text-3lg dark:text-white " ><p>OR</p></div>

        <div className="flex flex-col space-y-4">
          <button onClick={()=>{console.log("buttin clicked");setL(true);
         }}
           type="submit" className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            
          >
            <IconBrandGoogle className=" h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text -neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>

      </form>
    
    </div>
    </BackgroundLines>
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
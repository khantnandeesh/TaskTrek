
"use client"
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useBalance } from "@repo/store/useBalance";
import { signIn, signOut, useSession } from "next-auth/react";
import { Loaderx } from "../components/loader";
import { BackgroundLines } from "../components/ui/background-lines";
import React ,{useState}from "react";
import { cn } from "../lib/utils";

import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { Menu,MenuItem,HoveredLink,ProductItem } from "../components/ui/navbar";
import { Session } from "inspector/promises";





export default function BackgroundLinesDemo() {

  let {data}=useSession() ;
  if(data){


    return <div className="h-screen">  <BackgroundLines className="relative flex items-center justify-center w-full flex-col px-4 h-screen bg-[#000000]">
        <Navbar2 className="top-2  text-white" />

    

 <p className="text-white">{JSON.stringify(data.user)}</p>

</BackgroundLines></div>
  


    
  }
  
  
  return (
    <div className="h-screen">


<BackgroundLines className="relative flex items-center justify-center w-full flex-col px-4 h-screen bg-[#000000]">
          <Navbar className="top-2  text-white" />
    <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-100 to-neutral-500 dark:from-neutral-400 dark:to-white text-3xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        TaskTREK,  <br /> 
    </h2>
    <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-300 dark:text-neutral-100 text-center">
    We’ve spent over a decade refining Todoist to be an extension of your mind. Capture and organize tasks instantly using easy-flowing, natural language.
    </p>
    <p className="text-white">{JSON.stringify(data)}</p>
</BackgroundLines>


    </div>
    
  );
}




function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10   inset-x-0 max-w-sm w-auto mx-auto z-50 ", className)}
    >
      <Menu  setActive={setActive} >
        <MenuItem setActive={setActive}  active={active} item="Login">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/signin">Login</HoveredLink>
            <HoveredLink onClick={()=>{signOut()}} href="/signin">SignIn</HoveredLink>
            <HoveredLink onClick={signOut} href="/seo">Signout</HoveredLink>
            
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="  text-sm grid grid-cols-2 gap-5 p-4">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Login</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Signup">
          <div className="flex flex-col space-y-4 text-sm">
            
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}





function Navbar2({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10   inset-x-0 max-w-sm w-auto mx-auto z-50 ", className)}
    >
      <Menu  setActive={setActive} >
        <MenuItem setActive={setActive}  active={active} item="user">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/signin">Details</HoveredLink>
            <HoveredLink href="/signin">Logout</HoveredLink>
            <HoveredLink onClick={signOut} href="/seo">Delete Acount</HoveredLink>
            
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="  text-sm grid grid-cols-2 gap-5 p-4">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Login</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Navigate">
          <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/user/data">Add work</HoveredLink>
          <HoveredLink href="/show">Show weekly schedule</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}


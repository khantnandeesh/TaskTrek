import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@repo/db/client"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export  async function POST(req: NextApiRequest) {
 
    console.log("BACKEND RUNNING sll check cleared !");
    
    
  // Ensure only POST requests are handled
  if (req.method !== 'POST') {
    return NextResponse.json({msg:"err"})
  }

  const { id, file } = req.body;
  console.log(file);
  
  // Check if both id and file are provided
  if (!id || !file) {
    return NextResponse.json({msg:"err"})
  }

  try {
    // Update the Todo model to add the file
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { file },
    });

    // If the update is successful, send a 200 status
    if (updatedTodo) {
        NextResponse.json({msg:"DONE!"})
    } else {
        NextResponse.json({msg:"todo not found"})
    }
  } catch (error) {
    NextResponse.json({msg:"err"});
  }
}

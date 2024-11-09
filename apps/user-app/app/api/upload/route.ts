// app/api/upload/route.ts
import formidable from 'formidable';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing by Next.js
  },
};

// Create an upload directory if it doesn't exist
const uploadDir = path.join(process.cwd(), '/uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

async function parseFormData(request: Request): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    uploadDir, // Set the directory for file uploads
    keepExtensions: true, // Keep file extensions
  });

  return new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(request: Request) {
  try {
    const { fields, files } = await parseFormData(request);

    // You can log or process `fields` and `files` as needed
    console.log('Fields:', fields);
    console.log('Files:', files);

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

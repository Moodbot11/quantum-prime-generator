import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Make sure we're using the correct environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // Let's add some logging to help debug
    console.log("Received message:", message);

    const result = await model.generateContent(message);
    const response = result.response.text();

    // Log the response for debugging
    console.log("AI response:", response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


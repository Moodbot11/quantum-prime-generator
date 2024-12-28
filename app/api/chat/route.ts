import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

// Initialize the model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Convert messages to Gemini format
    const geminiMessages = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Start a chat session
    const chat = model.startChat({
      history: geminiMessages.slice(0, -1),
    });

    // Generate content using the new method
    const result = await chat.sendMessage(geminiMessages[geminiMessages.length - 1].parts[0].text);
    const response = await result.response;
    const text = response.text();

    // Convert the response to a streaming format
    const stream = GoogleGenerativeAIStream(text);

    // Return a StreamingTextResponse, which can be consumed by the client
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({
      error: error.message || "An error occurred during the request"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


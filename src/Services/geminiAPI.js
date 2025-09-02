import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Vite env variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `${
  import.meta.env.VITE_GEMINI_API_URL
}?key=${GEMINI_API_KEY}`;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env
  .VITE_SUPABASE_SERVICE_ROLE_KEY;

// --- Init Supabase & Gemini ---
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- Helper: generate content using embeddings + Gemini ---
export const generateContent = async (message, history = "") => {
  try {
    if (!GEMINI_API_KEY) throw new Error("No Gemini API key found");

    // Get embedding for user question
    const embeddingModel = ai.getGenerativeModel({
      model: "text-embedding-004",
    });
    const queryEmbeddingResp = await embeddingModel.embedContent(message);

    const queryEmbedding = queryEmbeddingResp.embedding.values;

    // Fetch top relevant chunks from Supabase using vector similarity
    // Ensure you have a Postgres function `match_chunks(query_embedding, match_count)`
    const { data: topChunks, error } = await supabase.rpc("match_chunks", {
      query_embedding: queryEmbedding,
      match_count: 5, // get top 5 relevant chunks
    });

    if (error) throw error;

    // Check if we have relevant university data
    const hasRelevantData =
      topChunks && topChunks.length > 0 && topChunks[0].similarity > 0.3;

    let context = "";
    let isUniversityQuestion = false;

    if (hasRelevantData) {
      context = topChunks.map((c) => c.content).join("\n\n");
      isUniversityQuestion = true;
    }

    //Build smart prompt based on whether we found relevant university data
    const prompt = isUniversityQuestion
      ? `
      You are "Igma", a friendly and helpful assistant for the University of the East. 
      Answer based on the official university information provided below.

      University Information:
      ${context}

      Conversation history:
      ${history}

      User question: ${message}

      Answer in a clear, polite, and conversational tone:`
      : `
      You are "Igma", a friendly and helpful assistant for the University of the East.

      The user asked: "${message}"

      I don't have specific information about this in the University of the East database, so I'll help with general information.


      Conversation history: ${history}

      Please provide a helpful response. If it's a general question (like time, date, weather, etc.), answer it directly. 
      If it's about university matters but not in my database, suggest they contact the university directly.
      Be friendly and conversational:`;

    // Send prompt to Gemini API
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (err) {
    console.error("Error generating content:", err);
    return "Sorry, I couldn’t find any information about that in the university data.";
  }
};

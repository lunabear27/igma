import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Vite env variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env
  .VITE_SUPABASE_SERVICE_ROLE_KEY;

// --- Init Supabase & Gemini ---
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- Debug version with detailed logging ---
export const generateContentWithDebug = async (message, history = "") => {
  try {
    console.log("🔍 DEBUG: Starting search for:", message);

    if (!GEMINI_API_KEY) throw new Error("No Gemini API key found");

    // 1️⃣ Get embedding for user question
    console.log("📊 DEBUG: Generating embedding...");
    const embeddingModel = ai.getGenerativeModel({
      model: "text-embedding-004",
    });
    const queryEmbeddingResp = await embeddingModel.embedContent(message);
    const queryEmbedding = queryEmbeddingResp.embedding.values;

    console.log(
      `✅ DEBUG: Embedding generated (${queryEmbedding.length} dimensions)`
    );

    // 2️⃣ Fetch top relevant chunks from Supabase using vector similarity
    console.log("🔎 DEBUG: Searching database...");
    const { data: topChunks, error } = await supabase.rpc("match_chunks", {
      query_embedding: queryEmbedding,
      match_count: 5,
    });

    if (error) {
      console.error("❌ DEBUG: Database search error:", error);
      throw error;
    }

    console.log(`📚 DEBUG: Found ${topChunks?.length || 0} chunks`);

    // Log search results
    if (topChunks && topChunks.length > 0) {
      console.log("🎯 DEBUG: Top search results:");
      topChunks.forEach((chunk, index) => {
        console.log(
          `   ${index + 1}. ${chunk.doc_name} (${(
            chunk.similarity * 100
          ).toFixed(2)}% match)`
        );
        console.log(`      Preview: ${chunk.content.substring(0, 100)}...`);
      });
    } else {
      console.log("⚠️ DEBUG: No matching chunks found");
    }

    const context =
      topChunks?.map((c) => c.content).join("\n\n") ||
      "No matching data found.";

    // 3️⃣ Build prompt with context + conversation history
    const prompt = `
You are "Igma", a friendly and helpful assistant for the University of the East. 
Answer in a clear, polite, and conversational tone, as if speaking directly to a student. 

Provide the most complete answer possible. 
If some details are missing (e.g., citizenship, program, or payment plan), give reasonable estimates or general information rather than asking for clarification.

Keep your answers concise but informative, and avoid unnecessary repetition. 
Use bullet points if listing multiple items, such as fees or program options.

Conversation history:
${history}

Knowledge base:
${context}

User question: ${message}
`;

    console.log("🤖 DEBUG: Sending to Gemini...");
    console.log(`📝 DEBUG: Context length: ${context.length} characters`);

    // 4️⃣ Send prompt to Gemini API
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    const finalResponse = response.text();
    console.log("✅ DEBUG: Response generated successfully");
    console.log(
      `📤 DEBUG: Response length: ${finalResponse.length} characters`
    );

    return finalResponse;
  } catch (err) {
    console.error("❌ DEBUG: Error generating content:", err);
    return "Sorry, I couldn't find any information about that in the university data.";
  }
};

// --- Quick test function you can call from browser console ---
window.testVectorSearch = async (query = "tuition fees") => {
  console.log("🧪 Testing vector search from browser...");
  try {
    const result = await generateContentWithDebug(query);
    console.log("🎉 Test result:", result);
    return result;
  } catch (error) {
    console.error("❌ Test failed:", error);
    return error;
  }
};

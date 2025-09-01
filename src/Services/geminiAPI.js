const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `${
  import.meta.env.VITE_GEMINI_API_URL
}?key=${GEMINI_API_KEY}`;
import universityData from "../../university-data.json";
import { searchKnowledgeBase } from "../../utils/chatUtils";

const KEYWORDS = [
  "admission",
  "tuition",
  "fee",
  "program",
  "board",
  "president",
  "faculty",
  "department",
];

export const generateContent = async (message, history = "") => {
  if (!GEMINI_API_KEY) {
    throw new Error("No API key found/API Key not defined");
  }

  try {
    // 1. Filter relevant chunks by keywords
    const relevantChunks = universityData.filter((chunk) =>
      KEYWORDS.some((keyword) => chunk.content.toLowerCase().includes(keyword))
    );

    // 2. Optionally rank them using your existing searchKnowledgeBase
    const topMatches = searchKnowledgeBase(
      message,
      relevantChunks.length,
      relevantChunks
    );

    // 3. Build context
    const context = topMatches.map((match) => match.content).join("\n\n");

    // 4. Create prompt with context
    const prompt = `
    You are "Igma", a friendly assistant for the University of the East.
    Use ONLY the university knowledge base to answer.
    You may use the conversation history for context.

    Conversation history:
    ${history}

    Knowledge base:
    ${context || "No matching data found."}

    User question: ${message}
    `;

    // 5. Send to Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response from Gemini API", errorText);
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (!data || !data.candidates || data.candidates.length === 0) {
      throw new Error("No candidates found in the response");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error occurred while generating content:", error);
    return "Sorry, I couldn’t find any information about that in the university data.";
  }
};

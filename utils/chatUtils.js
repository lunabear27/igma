export const getRandomResponse = () => {
  const botResponses = [
    "I understand your question. Let me think about that...",
    "That’s a good question! Give me a moment to process...",
    "Hmm, interesting point. Let me check for you...",
    "I see what you’re asking. Let me look into that...",
    "Great question! I’ll find the answer for you...",
    "I understand, let me gather the right information...",
    "Got it! I’ll give you an answer in just a second...",
    "That’s something I can help with. Hold on...",
    "Okay, let me figure this out for you...",
    "I hear you! Let me process that...",
  ];
  return botResponses[Math.floor(Math.random() * botResponses.length)];
};
export const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

import universityData from "../university-data.json";

// Utility: convert text to vector (TF counts)
function textToVector(text) {
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  const freqMap = {};
  words.forEach((w) => {
    freqMap[w] = (freqMap[w] || 0) + 1;
  });
  return freqMap;
}

// Cosine similarity for TF vectors
function cosineSimilarity(vecA, vecB) {
  const intersection = Object.keys(vecA).filter((k) => vecB[k]);
  let dotProduct = 0;
  intersection.forEach((k) => {
    dotProduct += vecA[k] * vecB[k];
  });

  const magnitudeA = Math.sqrt(
    Object.values(vecA).reduce((sum, val) => sum + val * val, 0)
  );
  const magnitudeB = Math.sqrt(
    Object.values(vecB).reduce((sum, val) => sum + val * val, 0)
  );

  if (!magnitudeA || !magnitudeB) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Extract keywords from query
function extractKeywords(query) {
  return (
    query
      .toLowerCase()
      .match(/\b(\w+)\b/g)
      ?.filter((w) => w.length > 2) || []
  ); // ignore very short words
}

// Hybrid search: keywords + cosine similarity
export function searchKnowledgeBase(query, topK = 3) {
  const keywords = extractKeywords(query);
  const queryVec = textToVector(query);

  const scored = universityData.map((chunk) => {
    const chunkVec = textToVector(chunk.content);
    let score = cosineSimilarity(queryVec, chunkVec);

    // Boost score if chunk contains any keywords
    let keywordBoost = 0;
    keywords.forEach((kw) => {
      if (chunk.content.toLowerCase().includes(kw)) keywordBoost += 0.3;
    });
    score += keywordBoost;

    return { ...chunk, score };
  });

  // Sort by score and return top K
  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}

import fs from "fs";
import path from "path";
import mammoth from "mammoth";

const docsFolder = path.resolve("docs");
const outputFile = path.resolve("university-data.json");

// Split text into chunks (around 400 words each)
function chunkText(text, chunkSize = 400) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}

async function processDocs() {
  const files = fs.readdirSync(docsFolder).filter(f => f.endsWith(".docx"));
  let knowledgeBase = [];

  for (const file of files) {
    const filePath = path.join(docsFolder, file);
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const text = result.value.trim();

      const chunks = chunkText(text, 400);
      chunks.forEach((chunk, index) => {
        knowledgeBase.push({
          filename: file,
          chunk: index,
          content: chunk
        });
      });

      console.log(`✅ Processed: ${file}`);
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(knowledgeBase, null, 2), "utf-8");
  console.log(`\n🎉 Done! Knowledge base saved to ${outputFile}`);
}

processDocs();

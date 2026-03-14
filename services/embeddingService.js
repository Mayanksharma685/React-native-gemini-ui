import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function createEmbedding(text) {
    const model = genAI.getGenerativeModel({
        model: "text-embedding-004"   // UPDATED MODEL
    });

    const result = await model.embedContent(text);
    return result.embedding.values;
}
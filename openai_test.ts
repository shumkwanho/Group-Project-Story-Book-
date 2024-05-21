import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: process.env.TECKY_OPENAI_API_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

//for testing chat model
async function chatModel() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say "Hello World" in English, Japanese, and Chinese' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices[0]);
}

chatModel();
import { adamOpenAI, teckyOpenAI } from "./openai";

// chatModel();
imageModel();


/****************/

//for testing chat model
async function chatModel() {
  const chatCompletion = await teckyOpenAI.chat.completions.create({
    messages: [{ role: 'user', content: 'Say "Hello World" in English, Japanese, and Chinese' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices[0]);
}

//for testing image model
async function imageModel() {
  const response = await adamOpenAI.images.generate({
    model: "dall-e-2",
    prompt: "a happy dog",
    n: 1,
    size: "1024x1024",
  });
  let image_url = response.data[0].url;

  console.log(image_url);
}
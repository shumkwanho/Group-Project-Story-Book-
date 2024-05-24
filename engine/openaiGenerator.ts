import { adamOpenAI, teckyOpenAI } from "./openai";

export async function textGeneratorModel(prompt: string, model: string) {
  const chatCompletion = await teckyOpenAI.chat.completions.create({
    messages: [{
      role: 'user',
      content: prompt
    }],
    model: model,
  });

  let result = chatCompletion.choices[0].message.content

  console.log(result);
  return result;
}

export async function imageGeneratorModel(prompt: string, model: string) {
  const response = await adamOpenAI.images.generate({
    model: model,
    prompt: 
    `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:
    '${prompt}'`,
    n: 1,
    size: "1024x1024",
  });
  let image_url = response.data[0].url;

  console.log(response)
  console.log(response.data)

  console.log(image_url);
  return image_url
}
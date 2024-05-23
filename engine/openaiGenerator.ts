import { adamOpenAI, teckyOpenAI } from "./openai";
import { storybookPrompt } from "./promptGenerator";

// hard code parameters for testing
let characterName = "Daisy the Duck";
let targetAge = 6;
let category = 'Adventure'
let totalPage = 8;
// hard code parameters for testing

let prompt = storybookPrompt(characterName, targetAge, category, totalPage);

const CHAT_MODEL = 'gpt-3.5-turbo';

//testing only
// storylineGeneratorModel(prompt, CHAT_MODEL);

async function storylineGeneratorModel(prompt: string, model: string) {
  const chatCompletion = await teckyOpenAI.chat.completions.create({
    messages: [{
      role: 'user',
      content: prompt
    }],
    model: model,
  });

  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content;
}

//for testing image model

async function imageModel() {
  const response = await adamOpenAI.images.generate({
    model: "dall-e-3",
    prompt: "Create a digital cartoon image of Luna, a playful and adventurous teenage tiger character for a children's 2D game. Luna is depicted as cheerful with a chubby body shape and average height. Her fur is primarily white and orange with black stripe patterns, featuring gradient shading for depth. She has distinctive green eyes and fluffy cheeks. Luna wears a vibrant yellow monk tunic and carries a brown backpack. The image should be rendered in clean linework with an intermediate level of detail, using a vibrant color palette to make her stand out as a dynamic game asset.",
    n: 1,
    size: "1024x1024",
  });
  let image_url = response.data[0].url;

  console.log(image_url);
}

// imageModel()
import { downloadImage } from "../utils/downloadImg";
import { genCharacterRequirementJSON } from "../utils/characterRequirement";
import { imageGeneratorModel, textGeneratorModel } from "./openaiGenerator";
import { genCharacterTextPrompt, genPageImagePrompt, genStorybookTextPrompt } from "./promptGenerator";

const TEXT_MODEL = 'gpt-3.5-turbo';
const IMAGE_MODEL = 'dall-e-2'

//hard code requirements for testing:
let name = 'Nana';
let speciesType = 'elephant';
let gender = 'female';
let age = 'child';
let bodyShape = 'chubby';
let heightSize = 'short';

let characterRequirementJSON = genCharacterRequirementJSON(
  name, speciesType, gender, age, bodyShape, heightSize,
);

// gen character prompt



async function genCharacterImage() {

  let characterTextPrompt = genCharacterTextPrompt(characterRequirementJSON);
  let characterTextPromptGPT = await textGeneratorModel(characterTextPrompt, TEXT_MODEL);

  let imageURL = await imageGeneratorModel(characterTextPromptGPT as string, IMAGE_MODEL);

  downloadImage(imageURL as string, 'character');
}

genCharacterImage()



// get storybook text
// hard code parameters for testing

async function genStoryContent() {

    let characterTextPrompt = genCharacterTextPrompt(characterRequirementJSON);
    // let characterTextPromptGPT = await textGeneratorModel(characterTextPrompt, TEXT_MODEL);

    // console.log(characterRequirementJSON)
    // console.log(characterTextPrompt)

    let characterName = 
    `${characterRequirementJSON.character_features.name} the ${characterRequirementJSON.character_features.species_type}`;
    
    //hard code for now
    let targetAge = 6;
    let category = 'Adventure'
    let totalPage = 8;

    let storybookTextPrompt = genStorybookTextPrompt(characterName, targetAge, category, totalPage);

    // generate storybook with JSON string
    // let storybookContentJSON = JSON.parse(
    //     await textGeneratorModel(storybookTextPrompt, TEXT_MODEL) as string
    // );

    let storybookContentJSON = {
        story_name: "Zeno's Wild Adventure",
        scenario: [
          {
            page: 1,
            setting: 'Deep in the dense jungle',
            activity: 'Zeno the tiger is stealthily hunting for his breakfast',
            emotion: 'excitement',
            camera_angle: 'close-up',
            description: 'Zeno crouches low, his eyes fixed on the unsuspecting deer grazing nearby. His heart pounds with excitement as he prepares to pounce.'
          },
          {
            page: 2,
            setting: 'At the edge of a sparkling river',
            activity: 'Zeno decides to take a refreshing swim',
            emotion: 'joy',
            camera_angle: 'full-shot',
            description: 'With a loud splash, Zeno dives into the cool water. He paddles his strong paws and feels a rush of joy as he glides through the river like a graceful fish.'
          },
          {
            page: 3,
            setting: 'On a towering mountaintop',
            activity: 'Zeno is climbing to reach the highest point',
            emotion: 'determination',
            camera_angle: 'medium-shot',
            description: 'Zeno gazes up at the tall mountain and takes a deep breath. With every step, he feels a surge of determination as he reaches for the skies above.'
          },
          {
            page: 4,
            setting: 'In a mysterious cave',
            activity: 'Zeno searches for hidden treasures',
            emotion: 'curiosity',
            camera_angle: 'wide-shot',
            description: 'Zeno cautiously steps into the dark cave, his eyes wide with curiosity. He explores every nook and cranny, hoping to discover a secret treasure hidden within.'
          },
          {
            page: 5,
            setting: 'In a bustling city',
            activity: 'Zeno is trying to find his way back home',
            emotion: 'anxiety',
            camera_angle: 'close-up',
            description: "Amidst the busy streets and towering buildings, Zeno's anxiety starts to rise. He looks left and right, desperately trying to find his way back to the familiar comforts of the jungle."
          },
          {
            page: 6,
            setting: 'In a lush meadow filled with flowers',
            activity: 'Zeno joins a group of playful animals',
            emotion: 'happiness',
            camera_angle: 'full-shot',
            description: 'Zeno nears the vibrant meadow and spots a group of playful animals. He eagerly joins in their fun, feeling pure happiness as they frolic among the colorful flowers.'
          },
          {
            page: 7,
            setting: 'Deep in a mysterious forest',
            activity: 'Zeno bravely confronts a feared creature',
            emotion: 'courage',
            camera_angle: 'medium-shot',
            description: 'As Zeno journeys through the unknown forest, he suddenly encounters a fearsome creature. With a deep breath, he musters all his courage and faces the mighty beast head-on.'
          },
          {
            page: 8,
            activity: 'Zeno triumphantly returns home',
            emotion: 'relief',
            camera_angle: 'wide-shot',
            description: 'After a long and adventurous journey, Zeno finally reaches his beloved jungle. His heart fills with relief and he roars proudly, triumphant in his wild adventure.'
          }
        ]
      }

    // console.log(storybookContentJSON);

    //generate an array with {total_page} of prompts
    let storybookImagePrompts: any = [];
    for (let i = 0; i < totalPage; i++) {
        let pageDetails = storybookContentJSON.scenario[i]
        let pageTextPrompt = genPageImagePrompt(characterRequirementJSON, pageDetails)
        let pageTextPromptGPT = await textGeneratorModel(pageTextPrompt, TEXT_MODEL);
        storybookImagePrompts.push(pageTextPromptGPT)

        console.log(`****prompt to gen image prompt for page ${i+1}****`)
        console.log("\n\n")
        console.log(pageTextPrompt)
        console.log("\n\n")

        console.log(`****image prompt from GPT for page ${i+1}****`)
        console.log("\n\n")
        console.log(pageTextPromptGPT)
        console.log("\n\n")
    }

    //run image prompt with image model

}

// genStoryContent();
import { imageGeneratorModel, textGeneratorModel } from "./aiEngine/openaiGenerator";

const TEXT_MODEL = 'gpt-3.5-turbo';
const IMAGE_MODEL = 'dall-e-3'

async function main() {
    // let result = await textGeneratorModel("Write a short poem", TEXT_MODEL)
    let result = await imageGeneratorModel("Generate an image of a dog", IMAGE_MODEL)
    console.log(result);
}

main();

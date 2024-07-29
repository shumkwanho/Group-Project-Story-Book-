import { imageModel, imageModelVII } from "./aiEngine/replicateGenerator";


async function main() {
    // let result = await imageModel("a dog")
    let result = await imageModelVII("image of a cute cartoon cat");
    console.log(result);
}

main();

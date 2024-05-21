import { replicate } from "./replicate";

let seed = 1234;

async function imageModel() {
    const output = await replicate.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
            input: {
                seed,
                width: 960,
                height: 512,
                prompt: "a cute doggie in pixar style",
                scheduler: "K_EULER",
                num_outputs: 4,
                guidance_scale: 7.5,
                num_inference_steps: 50
            }
        }
    );
    console.log(output);
}

imageModel();
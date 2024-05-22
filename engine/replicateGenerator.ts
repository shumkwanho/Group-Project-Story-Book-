import { replicate } from "./replicate";
import { downloadImage } from "../utils/downloadImg";


let seed = 123;

export async function imageModel(object: string): Promise<any> {
    const output:any = await replicate.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
            input: {
                seed,
                width: 960,
                height: 512,
                prompt: `a ${object} in pixar style`,
                scheduler: "K_EULER",
                num_outputs: 1,
                guidance_scale: 7.5,
                num_inference_steps: 50
            }
        }
    );
    const url = output[0]
    const newFileName = await downloadImage(url)
    console.log("hahahaha" + newFileName);
    
}
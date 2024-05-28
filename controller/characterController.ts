import { CharacterService } from "../service/characterService";
import { Request, Response } from "express";
import { imageGeneratorModel, textGeneratorModel } from "../aiEngine/openaiGenerator";
import { downloadImage } from "../utils/downloadImg";
import { genCharacterRequirementJSON } from "../utils/characterRequirement";
import { genCharacterTextPrompt } from "../utils/promptGenerator";

const TEXT_MODEL = 'gpt-3.5-turbo';
const IMAGE_MODEL = 'dall-e-3'

export class CharacterController {
    constructor(private service: CharacterService) { }


    loadCharacter = async (req: Request, res: Response) => {
        try {
            const allCharacter = await this.service.loadCharacter()
            res.status(200).json({ data: allCharacter })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }

    }

    /** createCharacter
     * @param req : userId, name, speciesType, gender, age, bodyShape, heightSize
     * @param res : character-name, image, character-requirement-JSON  
    */
    createCharacter = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId;
            const { name, speciesType, gender, age, bodyShape, heightSize } = req.body;
            
            let characterRequirementJSON = await genCharacterRequirementJSON(name, speciesType, gender, age, bodyShape, heightSize);
            let characterTextPrompt = genCharacterTextPrompt(characterRequirementJSON);
            let characterTextPromptGPT = await textGeneratorModel(characterTextPrompt, TEXT_MODEL);

            let imageURL = await imageGeneratorModel(characterTextPromptGPT as string, IMAGE_MODEL);
            let filename = await downloadImage(imageURL as string, 'character');

            await this.service.createCharacter(userId as string, name, filename as string, characterTextPromptGPT as string, JSON.stringify(characterRequirementJSON));

            res.status(200).json(
                {
                    message: 'character creation successful',
                    data: {
                        name: name,
                        image: filename,
                        requirement: characterRequirementJSON
                    }
                }
            )

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    deleteCharacter = async (req: Request, res: Response) => {
        try {
            const { characterId } = req.body
            await this.service.deleteCharacter(characterId)
            res.status(200).json({ message: "delete successfully" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

}
import { knex } from "../utils/knex";
import { CharacterService } from "../service/characterService";
import { PageService } from "../service/pageService";
import { Request, Response } from "express";
import { genPageImagePrompt } from "../utils/promptGenerator";
import { imageGeneratorModel, textGeneratorModel } from "../aiEngine/openaiGenerator";
import { downloadImage } from "../utils/downloadImg";

const TEXT_MODEL = 'gpt-3.5-turbo';
const IMAGE_MODEL = 'dall-e-3'

const characterService = new CharacterService(knex);

export class PageController {
    constructor (private pageService: PageService) {}

    getPageByStorybookId = async (req: Request, res: Response) => {
        try {
            const { storybookId, pageNumber } = req.query;

            const pageQueryResult = await this.pageService.getPageByStorybookId(storybookId as string, parseInt(pageNumber as string))

            res.json({
                message: "get page successful",
                data: pageQueryResult
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "internal sever error" });
        }
    }

    createPage = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId;
            const { characterId, storybookContentJSON, storybookId, pageNumber } = req.body;

            let characterInfo = await characterService.loadCharacterById(characterId);

            let characterRequirementJSON = JSON.parse(characterInfo[0].requirement);
            
            //use [pageNumber - 1] as storybookContentJSON.scerario is array
            let pageDetails = storybookContentJSON.scenario[pageNumber - 1];
            let pageTextPrompt = genPageImagePrompt(characterRequirementJSON, pageDetails);
            let pageTextPromptGPT = await textGeneratorModel(pageTextPrompt, TEXT_MODEL);

            let pageImageURL = await imageGeneratorModel(pageTextPromptGPT as string, IMAGE_MODEL);
            let pageImageFileName = await downloadImage(pageImageURL as string, 'page');

            await this.pageService.createPage(
                storybookId, 
                pageDetails.description, 
                pageImageFileName as string, 
                pageNumber, 
                pageTextPromptGPT as string)

            res.json({
                message: `create page ${pageNumber} of storybook successfully`,
                data: {
                    image: pageImageFileName
                }
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "internal sever error" });
        }
    }
    
}
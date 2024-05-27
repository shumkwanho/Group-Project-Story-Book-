import { knex } from "../utils/knex";
import { PageService } from "../service/pageService";
import { CharacterService } from "../service/characterService";
import { StorybookService } from "../service/storybookService"
import { Request, Response } from "express";
import { genPageImagePrompt, genStorybookTextPrompt } from "../engine/promptGenerator";
import { imageGeneratorModel, textGeneratorModel } from "../engine/openaiGenerator";
import { downloadImage } from "../utils/downloadImg";

const TEXT_MODEL = 'gpt-3.5-turbo';
const IMAGE_MODEL = 'dall-e-3'

const pageService = new PageService(knex);
const characterService = new CharacterService(knex);

export class StorybookController {
    constructor(private service: StorybookService) { }

    getAllStoryBook = async (req: Request, res: Response) => {
        try {
            const allStoryBook = await this.service.loadAllStorybook()
            res.status(200).json({ data: allStoryBook })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    getStoryBookById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;

            const storybookQueryResult = await this.service.getStoryBookInfoById(id as string);

            const totalPage = parseInt(storybookQueryResult[0].total_page);

            const pagesQueryResult: { [key: string]: any }[] = [];

            for (let pageNumber = 1; pageNumber <= totalPage; pageNumber++) {
                let pageQueryResult = await pageService.getPageByStorybookId(id as string, pageNumber)
                pagesQueryResult.push(pageQueryResult[0])
            }

            //return a json file with
            // 1) information of the book, and
            // 2) all pages in asc order
            res.json({
                message: "successful",
                data: {
                    cover: storybookQueryResult,
                    pages: pagesQueryResult,
                }
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    createStoryBook = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId;
            const { characterId, targetAge, category, totalPage } = req.body;

            //get character info from characterId
            let characterInfo = await characterService.loadCharacterById(characterId);

            let characterRequirementJSON = JSON.parse(characterInfo[0].requirement);
            let characterName = `${characterInfo[0].name} the ${characterRequirementJSON.character_features.species_type}`;

            let storybookTextPrompt = genStorybookTextPrompt(characterName, targetAge, category, totalPage);

            let storybookContent = await textGeneratorModel(storybookTextPrompt, TEXT_MODEL);

            console.log(storybookContent)

            let storybookContentJSON = JSON.parse(storybookContent as string);

            console.log(storybookContentJSON)

            let bookName = storybookContentJSON.story_name;
            let description = storybookContentJSON.description_summary;

            let createStorybookQuery = await this.service.createStorybook(
                parseInt(userId as string), 
                bookName as string, 
                description as string,
                parseInt(characterId), 
                parseInt(targetAge), 
                category as string, 
                parseInt(totalPage),
                JSON.stringify(storybookContentJSON)
            );

            let storybookId = createStorybookQuery[0].id;

            for (let i = 0; i < totalPage; i++) {
                let pageDetails = storybookContentJSON.scenario[i];
                let pageTextPrompt = genPageImagePrompt(characterRequirementJSON, pageDetails);
                let pageTextPromptGPT = await textGeneratorModel(pageTextPrompt, TEXT_MODEL);

                let pageImageURL = await imageGeneratorModel(pageTextPromptGPT as string, IMAGE_MODEL);
                let pageImageFileName = await downloadImage(pageImageURL as string, 'page');

                let createPageQuery = await pageService.createPage(
                    storybookId, 
                    pageDetails.description, 
                    pageImageFileName as string, 
                    i+1, 
                    pageTextPromptGPT as string)
            }

            res.json({
                message: 'create story book successfully',
                data: {
                    name: bookName
                }
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }

    }

    getStoryBookType = async (req: Request, res: Response) => {
        try {
            const data = await this.service.getStoryBookCategory()
            return res.json({data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    filterBook = async (req: Request, res: Response) => {
        try {
            const { obj } = req.body
            let result:any[] = []
            for (let condition of obj.condition){
                const data = await this.service.filterBook(obj.key,condition)
                result = result.concat(data)
            }
            return res.json({data:result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
        
    }

    bookSorting = async (req: Request, res: Response) => {
        try {
            const {category} = req.body
            if(category == "likes"){
                const data = await this.service.aggregateSorting()
                return res.json({data})
            }
            const data = await this.service.storybookSorting(category)
            return res.json({data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}
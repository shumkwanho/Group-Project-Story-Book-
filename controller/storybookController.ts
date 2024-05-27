import { knex } from "../utils/knex";
import { PageService } from "../service/pageService";
import { StorybookService } from "../service/storybookService"
import { Request, Response } from "express";

const pageService = new PageService(knex);

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
            
            const pagesQueryResult: {[key: string]: any}[] = [];

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
        
    }
}
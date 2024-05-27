import { knex } from "../utils/knex";
import { PageService } from "../service/pageService";
import { StorybookService } from "../service/storybookService"
import { Request, Response } from "express";

const pageService = new PageService(knex);

export class StorybookController {
    constructor(private service: StorybookService) { }

    getAllStoryBook = async (req: Request, res: Response) => {
        try {
            console.log("hi");

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

    getStoryBookType = async (req: Request, res: Response) => {
        try {
            const data = await this.service.getStoryBookCategory()
            res.status(200).json({ data })
            return
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    filterBook = async (req: Request, res: Response) => {

        try {
            const { obj } = req.body
            let result: any[] = []
            for (let condition of obj.condition) {
                const data = await this.service.filterBook(obj.key, condition)
                result = result.concat(data)
            }
            res.json({ data: result })
            return
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    bookSorting = async (req: Request, res: Response) =>{
        const {category} = req.body
        
        try {
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
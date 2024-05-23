import { StorybookService } from "../service/storybookService"
import { Request, Response } from "express";

export class StorybookController {
    constructor(private service: StorybookService) { }

    getAllStoryBook = async (req: Request, res: Response) => {
        try {
            console.log("hi");
            
            const allStoryBook = await this.service.loadStorybook()
            res.status(200).json({ data: allStoryBook })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    getStroyBookById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;

            const storybookQueryResult = await this.service.getStroyBookInfoById(id as string)

            console.log(storybookQueryResult)
            //return a json file with
            // 1) information of the book, and
            // 2) all pages in asc order
            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}
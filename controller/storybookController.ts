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
}
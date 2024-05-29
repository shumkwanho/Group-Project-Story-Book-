import { PageService } from "../service/pageService";
import { Request, Response } from "express";

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
}
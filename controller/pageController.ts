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

    //storybook (even empty) must already exist before calling this API
    createPage = async (req: Request, res: Response) => {
        try {

            const { storybookId } = req.query;

            //hard code for now
            const caption = generateCaption();
            const image = generateImage();
            const pageNumber = getPageNumber();

            const createPageQueryResult = await this.pageService.createPage(storybookId as string, caption, image, pageNumber);

            res.json({
                message: "create new page successful",
                data: createPageQueryResult
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "internal sever error" });
        }
    }
}

function generateCaption() {
    return "hard code generated caption"
}

function generateImage() {
    return 'hard_code_generated_filename2.jpg'
}

function getPageNumber() {
    return 1;
}
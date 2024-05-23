import { LikeService } from "../service/likeService"
import { Request, Response } from "express";

export class LikeController {
    constructor(private service: LikeService) { }

    getLikes = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            const result = await this.service.getLikes(userId as string)
            res.status(200).json({data:result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    likeBooks = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            const { bookId } = req.body
            await this.service.likeBook(userId as string , bookId)
            res.status(200)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    dislikeBooks = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            const {  bookId } = req.body
            await this.service.dislikeBook(userId as string , bookId)
            res.status(200)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

}
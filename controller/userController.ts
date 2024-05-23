import { Request, Response } from "express";

export class UserController {
    constructor() { }

    checkLogin = async (req: Request, res: Response) => {
        if (req.session.userId){
            return res.status(200).json({data:req.session.userId})
        }
        return res.status(400).json({messgae:"Did not login"})
    }

}
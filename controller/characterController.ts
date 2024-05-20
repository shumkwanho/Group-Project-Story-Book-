import { characterService } from "../service/characterService";
import { Request, Response } from "express";

export class controller {
    constructor(private service:characterService){}

    createCharacter = async (req:Request,res:Response)=>{
        try {
            const userId = req.session.userId
            const {characterName,image_name} = req.body
            await this.service.createCharacter(userId!,characterName,image_name)
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal Server Error"})
        }
    }

    deleteCharacter = async (req:Request,res:Response)=>{
        try {
            const {characterId} = req.body
            await this.service.deleteCharacter(characterId)
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal Server Error"})
        }
    }

}
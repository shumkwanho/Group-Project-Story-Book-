import { CharacterService } from "../service/characterService";
import { Request, Response } from "express";
import { form } from '../utils/formidable'

export class CharacterController {
    constructor(private service: CharacterService) { }

    createCharacter =  (req: Request, res: Response) => {
        try {
            form.parse(req, async(err, fields, files) => {
                let userId:string = ""
                let characterName:string = ""
                console.log(fields, files.photo![0].newFilename);
                if (fields.userId) {
                    userId = fields.userId[0]
                }
                if(fields.characterName){
                    characterName = fields.characterName[0]
                }
                const imageName = files.photo![0].newFilename
                // const userId = req.session.userId
                await this.service.createCharacter(userId!, characterName!, imageName)
                res.status(200).json({ message: "create succcessfully" })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    deleteCharacter = async (req: Request, res: Response) => {
        try {
            const { characterId } = req.body
            await this.service.deleteCharacter(characterId)
            res.status(200).json({ message: "delete succcessfully" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

}
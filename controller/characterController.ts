import { CharacterService } from "../service/characterService";
import { Request, Response } from "express";
import { form } from '../utils/formidable'
import { imageModel } from "../engine/replicateGenerator"

export class CharacterController {
    constructor(private service: CharacterService) { }


    loadCharacter = async (req: Request, res: Response) => {
        try {
            const allCharacter = await this.service.loadCharacter()
            res.status(200).json({ data: allCharacter })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }

    }

    createCharacter = async (req: Request, res: Response) => {
        try {
            let userId = "1"
            let { characterName, description } = req.body
            const imageName: string[] = await imageModel(description)

            // await this.service.createCharacter(userId, characterName!, imageName[0])
            // res.status(200).json({ message: "create succcessfully" })


            // form.parse(req, async (err, fields, files) => {
            //     // const userId = req.session.userId
            //     if (fields.userId) {
            //         userId = fields.userId[0]
            //     }
            //     if (fields.characterName) {
            //         characterName = fields.characterName[0]
            //     } 
            //     if (fields.objectDescription) {
            //         description = fields.objectDescription[0]
            //     }
            //     const imageName = files.photo![0].newFilename
            // })

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
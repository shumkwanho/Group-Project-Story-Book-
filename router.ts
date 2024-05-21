import { Router } from "express"
import { knex } from "./utils/knex"
import { CharacterService } from "./service/characterService";
import { CharacterController } from "./controller/characterController";
export const router = Router()
const characterService = new CharacterService(knex)
const characterController = new CharacterController (characterService)



router.post("/character", characterController.createCharacter)
router.delete("/character", characterController.deleteCharacter)


import { Router } from "express"
import { knex } from "./utils/knex"
import { CharacterService } from "./service/characterService";
import { CharacterController } from "./controller/characterController";
import { payment,webhook } from "./utils/payment";
import  express from "express";

export const router = Router()
const characterService = new CharacterService(knex)
const characterController = new CharacterController (characterService)




router.post('/webhook', express.raw({type: 'application/json'}), webhook);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post('/create-checkout-session', payment); 
router.post("/character", characterController.createCharacter)
router.delete("/character", characterController.deleteCharacter)


import { Router } from "express"
import { knex } from "./utils/knex"
import { CharacterService } from "./service/characterService";
import { CharacterController } from "./controller/characterController";
import { CommentService } from "./service/commentService";
import { CommentController } from "./controller/commentController";


export const router = Router()
const characterService = new CharacterService(knex)
const characterController = new CharacterController (characterService)

const commentService = new CommentService (knex)
const commentController = new CommentController (commentService)


router.get("/comment",commentController.getAllComment);
router.post("/comment",commentController.createComment);
router.put("/comment",commentController.updateComment);
router.delete("/comment",commentController.deleteComment);


router.post("/character", characterController.createCharacter)
router.delete("/character", characterController.deleteCharacter)
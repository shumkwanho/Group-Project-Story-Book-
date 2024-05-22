import { Router } from "express"
import { knex } from "./utils/knex"
import { payment,webhook } from "./utils/payment";
import  express from "express";

import { CharacterService } from "./service/characterService";
import { CharacterController } from "./controller/characterController";

import { CommentService } from "./service/commentService";
import { CommentController } from "./controller/commentController";

import { PageService } from "./service/pageService";
import { PageController } from "./controller/pageController";

import { StorybookService } from "./service/storybookService";
import { StorybookController } from "./controller/storybookController";

export const router = Router()

router.post('/webhook', express.raw({type: 'application/json'}), webhook);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/create-checkout-session', payment); 

const characterService = new CharacterService(knex)
const characterController = new CharacterController (characterService)
router.get("/character",characterController.loadCharacter)
router.post("/character", characterController.createCharacter)
router.delete("/character", characterController.deleteCharacter)


const commentService = new CommentService (knex)
const commentController = new CommentController (commentService)
router.get("/comment",commentController.getAllComment);
router.post("/comment",commentController.createComment);
router.put("/comment",commentController.updateComment);
router.delete("/comment",commentController.deleteComment);

const storybookService = new StorybookService(knex)
const storybookController = new StorybookController(storybookService)
router.get("/storybook",storybookController.getAllStoryBook)

const pageService = new PageService(knex);
const pageController = new PageController(pageService);
router.get('/page', pageController.getPageByStorybookId);
router.post('/page', pageController.createPage);
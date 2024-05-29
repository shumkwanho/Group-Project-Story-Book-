import { Router } from "express"
import { knex } from "./utils/knex"
import { PaymentController } from "./controller/paymentController";
import { PaymentService } from "./service/paymentService";
import  express from "express";

import { CharacterService } from "./service/characterService";
import { CharacterController } from "./controller/characterController";

import { CommentService } from "./service/commentService";
import { CommentController } from "./controller/commentController";

import { PageService } from "./service/pageService";
import { PageController } from "./controller/pageController";

import { StorybookService } from "./service/storybookService";
import { StorybookController } from "./controller/storybookController";

import { UserService } from "./service/userService";
import { UserController } from "./controller/userController";

import { LikeController } from "./controller/likeController";
import { LikeService } from "./service/likeService";


export const router = Router()
const paymentService = new PaymentService(knex)
const paymentController = new PaymentController(paymentService)
router.post('/webhook', express.raw({type: 'application/json'}), paymentController.webhook);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/create-checkout-session', paymentController.payment); 

const characterService = new CharacterService(knex)
const characterController = new CharacterController (characterService)
router.get("/characters", characterController.loadCharacter)
router.get("/character", characterController.loadCharacterById)
router.post("/character", characterController.createCharacter)
router.delete("/character", characterController.deleteCharacter)


const commentService = new CommentService (knex)
const commentController = new CommentController (commentService)
router.get("/comment", commentController.getAllComment);
router.post("/comment", commentController.createComment);
router.put("/comment", commentController.updateComment);
router.delete("/comment", commentController.deleteComment);
router.get("/comment-user", commentController.getCommentByUserId)


const storybookService = new StorybookService(knex)
const storybookController = new StorybookController(storybookService)
router.get("/storybooks", storybookController.getAllStoryBook)
router.get("/storybook", storybookController.getStoryBookById)
router.get("/storybookByid", storybookController.onclickStoryBookById)
router.post("/storybook", storybookController.createStoryBook)
router.get("/booktype", storybookController.getStoryBookType)
router.post("/filter", storybookController.filterBook)
router.post("/sort", storybookController.bookSorting)
router.post("/search",storybookController.searchStoryBook)


const pageService = new PageService(knex);
const pageController = new PageController(pageService);
router.get('/page', pageController.getPageByStorybookId);

const userService = new UserService(knex)
const userController = new UserController(userService)
router.get("/checkLogin", userController.checkLogin)
router.post("/login", userController.login)
router.post("/register", userController.register)
router.get("/logout", userController.logout)
router.get("/user",userController.getUserInfo)


const likeService = new LikeService(knex)
const likeController = new LikeController(likeService)
router.get("/like", likeController.getLikes)
router.post("/like", likeController.likeBooks)
router.delete("/dislike", likeController.dislikeBooks)
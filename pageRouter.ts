import { Router } from "express";
import { knex } from "./utils/knex";
import { PageService } from "./service/pageService";
import { PageController } from "./controller/pageController";

export const pageRouter = Router();

// export const pageService = new PageService(knex)
// export const pageController = new PageController(knex)

// pageRouter.get('/read', pageController.getAllPageByStorybookId);
// pageRouter.post('/create', pageController.createPage);
// pageRouter.delete('/delete', pageController.deletePage);
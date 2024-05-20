import { Router } from "express"
import { Request, Response } from "express";
export const router = Router()
router.get("/", somefunction)

function somefunction(req: Request, res: Response) { }
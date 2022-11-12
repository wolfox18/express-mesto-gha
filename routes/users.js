import { Router } from "express";
import { readAll, readById, create } from "../controllers/users.js";

export const router = Router();

router.get('/users', readAll);
router.get('/users/:userId', readById);
router.post('/users', create);
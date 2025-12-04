import { Request, Response, Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = Router();

router.post('/', userController.createUser)

router.get('/', logger, auth(), userController.getAllUsers)

router.get('/:id', userController.getUserById)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

export const userRoutes = router;
import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { todoController } from "./todo.controller";

const router = Router();

router.post('/', todoController.createTodo)

router.get('/', todoController.getAllTodos)

router.get('/:id', todoController.getTodoById)

router.put('/:id', todoController.updateTodo)

router.delete('/:id', todoController.deleteTodo)

export const todoRoutes = router;
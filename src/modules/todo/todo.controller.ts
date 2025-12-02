import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoService } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
    const { user_id, title, description, completed, due_date } = req.body;

    try {
        const result = await todoService.createTodo(user_id, title, description, completed, due_date);

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: result.rows[0]
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

const getAllTodos = async (req: Request, res: Response) => {
    try {
        const result = await todoService.getAllTodos();
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getTodoById = async (req: Request, res: Response) => {
    const todoId = req.params.id;

    try {
        const result = await todoService.getTodoById(todoId as string);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const updateTodo = async (req: Request, res: Response) => {
    const todoId = req.params.id;
    const { user_id, title, description, completed, due_date } = req.body;

    try {
        const result = await todoService.updateTodo(todoId as string, user_id, title, description, completed, due_date);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    const todoId = req.params.id;

    try {
        const result = await todoService.deleteTodo(todoId as string);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

export const todoController = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email, phone, age, address } = req.body;

    try {

        const result = await userService.createUser(name, email, phone, age, address);

        console.log('User inserted:', result.rows[0]);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result.rows[0]
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
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

const getUserById = async (req: Request, res: Response) => {

    try {
        const result = await userService.getUserById(req.params.id as string);  // Type assertion to string

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
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

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email, phone, age, address } = req.body;

    try {
        const result = await userService.updateUser(userId as string, name, email, phone, age, address);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const result = await userService.deleteUser(userId as string);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
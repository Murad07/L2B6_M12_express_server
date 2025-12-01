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

export const userController = {
    createUser,
};
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await AuthService.loginUser(email, password);

        if (result === null) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (result === false) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const AuthController = {
    loginUser
}
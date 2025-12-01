import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = Router();

router.post('/', userController.createUser)

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM users');
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
})

router.get('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

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
})

router.put('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email, phone, age, address } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users SET name = $1, email = $2, phone = $3, age = $4, address = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
            [name, email, phone, age, address, userId]
        );

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
})

router.delete('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);

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
})

export const userRoutes = router;
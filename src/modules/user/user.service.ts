import { pool } from "../../config/db";
import bcrypt from "bcryptjs";


const createUser = async (payload: Record<string, unknown>) => {
    const { name, role, email, password, phone, age, address } = payload;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const result = await pool.query(
        'INSERT INTO users (name, role, email, password, phone, age, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, role, email, hashedPassword, phone, age, address]
    );

    return result;
}

const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result;
}

const getUserById = async (userId: string) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result;
}

const updateUser = async (userId: string, name: string, role: string, email: string, phone: string, age: number, address: string) => {
    const result = await pool.query(
        `UPDATE users SET name = $1, role = $2, email = $3, phone = $4, age = $5, address = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
        [name, role, email, phone, age, address, userId]
    );

    return result;
}

const deleteUser = async (userId: string) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    return result;
}

export const userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
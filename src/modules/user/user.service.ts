import { pool } from "../../config/db";


const createUser = async (name: string, email: string, phone: string, age: number, address: string) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, phone, age, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, phone, age, address]
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

const updateUser = async (userId: string, name: string, email: string, phone: string, age: number, address: string) => {
    const result = await pool.query(
        `UPDATE users SET name = $1, email = $2, phone = $3, age = $4, address = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
        [name, email, phone, age, address, userId]
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